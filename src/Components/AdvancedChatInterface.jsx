import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaPaperPlane, FaTimes, FaMinus, FaCheck, FaCheckDouble, FaArrowDown, FaExpandAlt } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';

const AdvancedChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! Thanks for visiting my portfolio. How can I help you today?", 
      sender: 'bot', 
      timestamp: new Date(),
      read: true 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // Auto-responses based on keywords
  const autoResponses = {
    'project': "I've worked on various data science projects! You can check them out in the Projects section. Is there a specific area you're interested in?",
    'contact': "You can reach me via email at your@email.com or connect with me on LinkedIn!",
    'resume': "You can download my resume from the About section. Would you like me to send you a direct link?",
    'hi': "Hello! How can I assist you with my portfolio today?",
    'hello': "Hi there! Feel free to ask me anything about my work or experience!",
    'experience': "I have experience in data science, machine learning, and analytics. My portfolio showcases projects in these areas. What would you like to know more about?",
    'skills': "My core skills include Python, R, SQL, machine learning, data visualization, and statistical analysis. Do you want more details on any specific skill?",
    'education': "I have a degree in [Your Degree] from [Your University]. Would you like to know more about my educational background?",
    'thanks': "You're welcome! Feel free to reach out if you have any other questions!",
    'thank': "No problem at all! Let me know if there's anything else you'd like to know.",
    'bye': "Thanks for chatting! Feel free to reach out again if you have more questions. Have a great day!",
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // If window gets too small while in fullscreen, exit fullscreen
      if (window.innerWidth < 768 && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen]);

  // Determine if we're on mobile
  const isMobile = windowWidth < 640;

  // Manual scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsAtBottom(true);
    setUserHasScrolled(false);
  };

  // Check if user is at the bottom of the chat
  const checkIfAtBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isBottomVisible = scrollHeight - scrollTop - clientHeight < 10;
      setIsAtBottom(isBottomVisible);
    }
  };

  // Handle scroll events in the messages container
  const handleScroll = () => {
    setUserHasScrolled(true);
    checkIfAtBottom();
  };

  // Scroll to bottom only in specific cases:
  // 1. When chat is first opened
  // 2. When user sends a message 
  // 3. When user was already at bottom when a new message comes in
  useEffect(() => {
    if (isOpen && !isMinimized && (!userHasScrolled || isAtBottom)) {
      scrollToBottom();
    }
  }, [isOpen, isMinimized]);
  
  // When new messages arrive, only auto-scroll if user was already at the bottom
  useEffect(() => {
    if (isAtBottom && !userHasScrolled) {
      scrollToBottom();
    }
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatInputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Simulate online/offline status changes
  useEffect(() => {
    const onlineInterval = setInterval(() => {
      // 95% chance to stay online, 5% to go offline
      const shouldBeOnline = Math.random() < 0.95;
      setIsOnline(shouldBeOnline);
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(onlineInterval);
  }, []);

  // Calculate unread count
  useEffect(() => {
    if (!isOpen) {
      const count = messages.filter(msg => msg.sender === 'bot' && !msg.read).length;
      setUnreadCount(count);
    } else {
      // Mark all as read when chat is open
      setMessages(prev => 
        prev.map(msg => ({...msg, read: true}))
      );
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  // Toggle chat open/closed
  const toggleChat = () => {
    if (!isOpen) {
      // When opening the chat, reset scroll states
      setUserHasScrolled(false);
      setIsAtBottom(true);
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  // Minimize chat
  const minimizeChat = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
  };
  
  // Restore minimized chat
  const restoreChat = () => {
    setIsMinimized(false);
  };
  
  // Toggle fullscreen mode
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
    // Ensure we're scrolled to bottom after resize
    setTimeout(scrollToBottom, 100);
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Force scroll to bottom when user sends a message
    setIsAtBottom(true);
    setUserHasScrolled(false);
    scrollToBottom();
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate response based on keywords or default
    setTimeout(() => {
      let responseText = "Thanks for your message! I'll get back to you soon.";
      
      // Check for keyword matches
      const lowercaseMsg = newMessage.toLowerCase();
      for (const [keyword, response] of Object.entries(autoResponses)) {
        if (lowercaseMsg.includes(keyword)) {
          responseText = response;
          break;
        }
      }
      
      // Add bot response
      const botResponse = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        read: isOpen // Mark as read only if chat is open
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500); // Simulate typing delay
  };

  // Format the timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate chat window position and size classes based on state and screen size
  const getChatWindowClasses = () => {
    if (isFullscreen) {
      return "fixed inset-0 z-50 bg-white flex flex-col overflow-hidden";
    }
    
    // Default positioning for regular view
    let positionClasses = "fixed z-50 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden";
    
    // Size classes based on screen size
    let sizeClasses = "";
    
    if (isMobile) {
      // On mobile, make it take up most of the screen
      positionClasses += " bottom-20 left-4 right-4";
      sizeClasses = "h-[70vh]";
    } else {
      // On larger screens, use fixed dimensions
      positionClasses += " bottom-24 right-6";
      sizeClasses = "w-80 sm:w-96 h-[500px]";
    }
    
    return `${positionClasses} ${sizeClasses}`;
  };

  return (
    <>
      {/* Chat button - adjusted for mobile */}
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
      
      {/* Minimized chat header - adjusted for mobile */}
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
                  className={isOnline ? "text-green-500" : "text-gray-400"} 
                />
              </div>
              <h3 className="font-medium">Chat with Me</h3>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Full chat window - with responsive positioning and sizing */}
      {isOpen && !isMinimized && (
        <div className={getChatWindowClasses()}>
          {/* Header */}
          <div className="bg-[#47034E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-2">
                <BsCircleFill 
                  size={10} 
                  className={isOnline ? "text-green-500" : "text-gray-400"} 
                />
                <span className="ml-1 text-xs">{isOnline ? "Online" : "Offline"}</span>
              </div>
              <div>
                <h3 className="font-bold">Chat with Me</h3>
                <p className="text-xs opacity-80">Ask me about my projects or experience</p>
              </div>
            </div>
            <div className="flex items-center">
              {/* Only show fullscreen toggle on non-mobile devices */}
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
          
          {/* Messages container */}
          <div 
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-grow p-4 overflow-y-auto bg-gray-50"
          >
            {/* Add some padding at top for better scrolling */}
            <div className="h-2"></div>
            
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
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
                  className={`text-xs text-gray-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  } flex items-center ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <span>{formatTime(message.timestamp)}</span>
                  
                  {/* Read receipts for user messages */}
                  {message.sender === 'user' && (
                    <span className="ml-1 text-xs">
                      {message.read ? 
                        <FaCheckDouble className="text-blue-500" /> : 
                        <FaCheck className="text-gray-400" />
                      }
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-gray-200 text-gray-800 flex space-x-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-75">•</span>
                  <span className="animate-bounce delay-150">•</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">typing...</div>
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} className="h-4"></div>
          </div>
          
          {/* Scroll to bottom button - visible when not at bottom */}
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className={`absolute bg-[#47034E] text-white rounded-full p-2 shadow-md hover:bg-[#7e3285] transition-colors
                ${isFullscreen ? 'bottom-20 right-8' : 'bottom-20 right-5'}`}
              aria-label="Scroll to bottom"
            >
              <FaArrowDown size={16} />
            </button>
          )}
          
          {/* Input form with fixed height */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex items-center h-[60px]">
            <input
              ref={chatInputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E0B6E4]"
              aria-label="Type a message"
            />
            <button
              type="submit"
              className={`ml-2 rounded-lg p-2 transition-colors ${
                newMessage.trim() === '' 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#47034E] text-white hover:bg-[#7e3285]'
              }`}
              aria-label="Send message"
              disabled={newMessage.trim() === ''}
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