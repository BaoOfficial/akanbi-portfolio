import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, AboutMe, Services, Projects, Contact } from './Components/index.js';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import AdvancedChatInterface from './Components/AdvancedChatInterface.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* This div adds padding at the top to prevent content from hiding behind the fixed header */}
      <div className="pt-15 md:pt-18"> {/* Adjust these values to match your header height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <AdvancedChatInterface />
      </div>
      <Footer />
    </div>
  );
}

export default App;