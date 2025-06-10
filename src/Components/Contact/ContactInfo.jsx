import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { contactInfo, socialInfo, contactConfig } from './ContactInfoData';
import useAOS from '../hooks/useAOS';
import contact_hero from '../../assets/contact_hero.jpg'; // Update the path as needed

const ContactInfo = () => {
  useAOS();

  // Map to associate icon components with keys
  const iconComponents = {
    email: <FaEnvelope />,
    phone: <FaPhoneAlt />,
    location: <FaMapMarkerAlt />,
    workingHours: <FaClock />
  };

  // Map to associate social icon components with keys
  const socialIconComponents = {
    linkedin: <FaLinkedin size={20} />,
    github: <FaGithub size={20} />,
    twitter: <FaTwitter size={20} />,
    calendly: <FaCalendarAlt size={20} />
  };

  return (
    <div className="relative w-full shadow-xl p-8 md:p-10 text-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={contact_hero}
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#47034E]/90"></div> {/* Purple overlay with 85% opacity */}
      </div>
      
      {/* Content Container */}
      <div className="relative z-10">
        <div className="mb-8 max-w-4xl mx-auto" data-aos="fade-up">
          <h3 className="text-2xl md:text-5xl font-bold text-white mb-2">{contactConfig.title}</h3>
          <div className="h-1 w-20 bg-[#E0B6E4] mb-4 mx-auto"></div>
          <p className="text-gray-200">
            {contactConfig.description}
          </p>
        </div>
        
        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
          {Object.entries(contactInfo).map(([key, detail]) => (
            <div 
              key={key} 
              className="flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={detail.delay}
            >
              <div className="bg-[#E0B6E4]/30 backdrop-blur-sm p-4 rounded-full text-[#E0B6E4] mb-3 w-16 h-16 flex items-center justify-center">
                <span className="text-xl">{iconComponents[key]}</span>
              </div>
              <div className="text-center">
                <h4 className="text-[#E0B6E4] font-semibold mb-1">{detail.title}</h4>
                {detail.link ? (
                  <a 
                    href={detail.link} 
                    target={key === "location" ? "_blank" : undefined} 
                    rel={key === "location" ? "noopener noreferrer" : undefined}
                    className="text-white hover:text-[#E0B6E4] transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-white">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Response Time */}
        <div 
          className="bg-[#E0B6E4]/10 backdrop-blur-sm border border-[#E0B6E4]/20 rounded-lg p-5 mb-12 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          <div className="flex items-center justify-center text-[#E0B6E4] mb-2">
            <FaClock className="mr-2" />
            <h4 className="font-semibold">Response Time</h4>
          </div>
          <p className="text-gray-200 text-sm">
            {contactConfig.responseTime}
          </p>
        </div>
        
        {/* Social Links */}
        <div className="mb-10 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="500">
          <h4 className="text-xl text-white font-semibold mb-5">Connect With Me</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(socialInfo).map(([key, social]) => (
              <a 
                key={key}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${social.color} hover:opacity-90 transition-opacity text-white px-5 py-2.5 rounded-full`}
                data-aos="zoom-in"
                data-aos-delay={social.delay}
              >
                <span className="mr-2">{socialIconComponents[key]}</span>
                {social.name}
              </a>
            ))}
          </div>
        </div>
        
        {/* Availability Status */}
        {contactConfig.availabilityStatus.available && (
          <div 
            className="flex items-center justify-center max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <p className="text-gray-200 text-sm">
              {contactConfig.availabilityStatus.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;