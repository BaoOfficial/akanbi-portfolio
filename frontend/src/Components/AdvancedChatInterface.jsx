import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaPaperPlane, FaTimes, FaMinus, FaCheck, FaCheckDouble, FaExpandAlt, FaRobot, FaUser } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';

const AdvancedChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! Thanks for visiting my portfolio. I'm powered by AI and have knowledge about Taofik's experience, projects, and skills. How can I help you today?", 
      sender: 'bot', 
      timestamp: new Date(),
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [backendStatus, setBackendStatus] = useState('connecting');
  
  const chatInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // Backend configuration
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  
  // Check backend health on component mount ONLY
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (response.ok) {
        const data = await response.json();
        setBackendStatus('connected');
        console.log('Backend health check:', data);
      } else {
        throw new Error('Backend not healthy');
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      setBackendStatus('error');
    }
  };

  // Send message to RAG backend
  const sendMessageToBackend = async (message) => {
    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.response
        // Removed sources completely
      };
    } catch (error) {
      console.error('Error calling backend:', error);
      return {
        text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment. If this persists, you can always reach out to Taofik directly via email at taofik.akanbi@example.com or through LinkedIn!"
      };
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768 && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen]);

  const isMobile = windowWidth < 640;

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle unread messages
  useEffect(() => {
    if (!isOpen) {
      const botMessages = messages.filter(msg => msg.sender === 'bot' && !msg.read);
      setUnreadCount(botMessages.length);
    } else {
      setMessages(prev => 
        prev.map(msg => ({...msg, read: true}))
      );
      setUnreadCount(0);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const minimizeChat = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
  };
  
  const restoreChat = () => {
    setIsMinimized(false);
  };
  
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    
    setIsTyping(true);
    
    // Call the backend
    const response = await sendMessageToBackend(currentMessage);
    
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        read: isOpen
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getChatWindowClasses = () => {
    if (isFullscreen) {
      return "fixed inset-0 z-50 bg-white flex flex-col overflow-hidden";
    }
    
    let positionClasses = "fixed z-50 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden";
    let sizeClasses = "";
    
    if (isMobile) {
      positionClasses += " bottom-20 left-4 right-4";
      sizeClasses = "h-[70vh]";
    } else {
      positionClasses += " bottom-24 right-6";
      sizeClasses = "w-80 sm:w-96 h-[500px]";
    }
    
    return `${positionClasses} ${sizeClasses}`;
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className={`fixed z-50 bg-[#47034E] text-white rounded-full p-4 shadow-lg hover:bg-[#7e3285] transition-all duration-300 flex items-center justify-center cursor-pointer
          ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'}`}
        aria-label="Chat with me"
      >
        <FaComments size={isMobile ? 20 : 24} />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
            {unreadCount}
          </div>
        )}
      </button>
      
      {/* Minimized chat header */}
      {isOpen && isMinimized && (
        <div 
          onClick={restoreChat}
          className={`fixed z-50 bg-[#47034E] text-white rounded-t-lg shadow-xl p-3 cursor-pointer hover:bg-[#7e3285] transition-colors
            ${isMobile ? 'bottom-20 left-4 right-4' : 'bottom-24 right-6 w-64'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-2">
                <BsCircleFill 
                  size={10} 
                  className={backendStatus === 'connected' ? "text-green-500" : "text-red-500"} 
                />
              </div>
              <h3 className="font-medium">AI Chat</h3>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Full chat window */}
      {isOpen && !isMinimized && (
        <div className={getChatWindowClasses()}>
          {/* Header */}
          <div className="bg-[#47034E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3">
                <FaRobot size={20} className="text-white" />
                <BsCircleFill 
                  size={8} 
                  className={`absolute -bottom-1 -right-1 ${backendStatus === 'connected' ? 'text-green-500' : 'text-red-500'}`} 
                />
              </div>
              <div>
                <h3 className="font-bold">AI Assistant</h3>
                <p className="text-xs opacity-80">
                  {backendStatus === 'connected' ? 'AI-powered portfolio assistant' : 'Connecting...'}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {!isMobile && (
                <button 
                  onClick={toggleFullscreen}
                  className="text-white rounded-full hover:bg-[#7e3285] p-2 transition-colors mr-1"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen chat"}
                >
                  <FaExpandAlt size={16} />
                </button>
              )}
              <button 
                onClick={minimizeChat}
                className="text-white rounded-full hover:bg-[#7e3285] p-2 transition-colors mr-1"
                aria-label="Minimize chat"
              >
                <FaMinus />
              </button>
              <button 
                onClick={toggleChat}
                className="text-white rounded-full hover:bg-[#7e3285] p-2 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          {/* Messages container - NO AUTO-SCROLL */}
          <div 
            ref={messagesContainerRef}
            className="flex-grow p-4 overflow-y-auto bg-gray-50"
          >
            <div className="h-2"></div>
            
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 max-w-[85%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                <div className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <FaRobot size={16} className="text-[#47034E]" />
                    </div>
                  )}
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-[#E0B6E4] text-[#47034E]' 
                          : 'bg-[#47034E] text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                    
                    <div 
                      className={`text-xs text-gray-500 mt-1 flex items-center ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      
                      {message.sender === 'user' && (
                        <span className="ml-1">
                          {message.read ? 
                            <FaCheckDouble className="text-blue-500" /> : 
                            <FaCheck className="text-gray-400" />
                          }
                        </span>
                      )}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-2 mt-1">
                      <FaUser size={16} className="text-[#47034E]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-4 max-w-[85%] mr-auto">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-2 mt-1">
                    <FaRobot size={16} className="text-[#47034E]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="p-3 rounded-lg bg-gray-200 text-gray-800 flex space-x-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-75">•</span>
                      <span className="animate-bounce delay-150">•</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">AI is thinking...</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Backend status indicator */}
          {backendStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 text-xs">
              ⚠️ AI features temporarily unavailable. Basic chat responses active.
            </div>
          )}
          
          {/* Input form */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex items-center h-[60px]">
            <input
              ref={chatInputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={backendStatus === 'connected' ? "Ask me about Taofik's work..." : "Type a message..."}
              className="flex-grow p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E0B6E4]"
              aria-label="Type a message"
              disabled={isTyping}
            />
            <button
              type="submit"
              className={`ml-2 rounded-lg p-2 transition-colors ${
                newMessage.trim() === '' || isTyping
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#47034E] text-white hover:bg-[#7e3285]'
              }`}
              aria-label="Send message"
              disabled={newMessage.trim() === '' || isTyping}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AdvancedChatInterface;