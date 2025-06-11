import React from 'react';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaMedium,
  FaHeart,
  FaArrowUp,
  FaDownload
} from 'react-icons/fa';
import useAOS from '../hooks/useAOS';

const Footer = () => {
  useAOS();
  
  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#47034E] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-[#E0B6E4]" />
                <a 
                  href="mailto:taofik.akanbi@gmail.com" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  taofik.akanbi@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-[#E0B6E4]" />
                <a 
                  href="tel:+2348117747455" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  +234 811 774 7455
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 text-[#E0B6E4] mt-1" />
                <p>Lagos, Nigeria</p>
              </li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="/resume.pdf" 
                download 
                className="inline-flex items-center bg-[#E0B6E4] hover:bg-white text-[#47034E] px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <FaDownload className="mr-2" /> Download Resume
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#profile" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#qualifications" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  Qualifications
                </a>
              </li>
              <li>
                <a 
                  href="#awards" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  Awards
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="hover:text-[#E0B6E4] transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.linkedin.com/in/taofik-akanbi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E0B6E4] hover:bg-white text-[#47034E] p-3 rounded-full transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://github.com/Taofik06/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E0B6E4] hover:bg-white text-[#47034E] p-3 rounded-full transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://x.com/teekay_akanbi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E0B6E4] hover:bg-white text-[#47034E] p-3 rounded-full transition-colors"
                aria-label="Twitter Profile"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://medium.com/@taofikakanbi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E0B6E4] hover:bg-white text-[#47034E] p-3 rounded-full transition-colors"
                aria-label="Medium Blog"
              >
                <FaMedium size={20} />
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#7e3285]/40 px-3 py-1 rounded-full text-sm">
                  Data Analysis
                </span>
                <span className="bg-[#7e3285]/40 px-3 py-1 rounded-full text-sm">
                  Machine Learning
                </span>
                <span className="bg-[#7e3285]/40 px-3 py-1 rounded-full text-sm">
                  Visualization
                </span>
                <span className="bg-[#7e3285]/40 px-3 py-1 rounded-full text-sm">
                  Python
                </span>
                <span className="bg-[#7e3285]/40 px-3 py-1 rounded-full text-sm">
                  SQL
                </span>
                <span className="bg-[#7e3285]/40 px-3 py-1 rounded-full text-sm">
                  Power BI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-[#7e3285] bg-[#380240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-sm mb-4 md:mb-0">
            &copy; {currentYear} Taofik Akanbi. All rights reserved.
          </p>
          
          <div className="flex items-center">
            <p className="text-sm flex items-center">
              Made with <FaHeart className="text-red-500 mx-1" /> in Nigeria
            </p>
            
            <button 
              onClick={scrollToTop}
              className="ml-6 bg-[#E0B6E4] hover:bg-white text-[#47034E] p-2 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;