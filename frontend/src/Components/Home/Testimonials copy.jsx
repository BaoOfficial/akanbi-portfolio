import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight, FaLinkedin } from 'react-icons/fa';
import useAOS from '../hooks/useAOS';
import testimonialsData from './TestimonialsData.js'

const TestimonialCard = ({ testimonial, isActive }) => {
  useAOS();
  
  return (
    <div 
      className={`${isActive ? 'block' : 'hidden md:block'} w-full md:w-1/3 p-4`}
      data-aos="fade-up"
    >
      <div className="bg-purple-100 rounded-lg p-6 shadow-lg h-full flex flex-col relative">
        <div className="absolute -top-4 -left-4">
          <div className="bg-[#47034E] text-[#E0B6E4] p-2 rounded-full">
            <FaQuoteLeft />
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="flex mb-4 mt-2">
          {[...Array(testimonial.rating)].map((_, index) => (
            <FaStar key={index} className="text-yellow-400" />
          ))}
        </div>
        
        {/* Testimonial Text */}
        <p className="text-gray-700 italic flex-grow mb-6">"{testimonial.text}"</p>
        
        {/* Author Info */}
        <div className="flex flex-col mt-auto">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-[#47034E]">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.position}</p>
              <p className="text-xs text-gray-500">{testimonial.company}</p>
            </div>
            {testimonial.linkedin && (
              <a 
                href={testimonial.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#47034E] hover:text-[#7e3285] transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            )}
          </div>
          
          {/* Relationship context */}
          <div className="mt-2 text-xs text-gray-500 italic">
            {testimonial.relationship} • {testimonial.date}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  useAOS();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const totalTestimonials = testimonialsData.length;
  const visibleTestimonials = 3; // Number of testimonials visible on desktop
  
  // Calculate the total number of "slides" in the carousel
  const totalSlides = Math.ceil(totalTestimonials / visibleTestimonials);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex + visibleTestimonials >= totalTestimonials ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? totalTestimonials - visibleTestimonials : prevIndex - 1
    );
  };
  
  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return (
    <div className="bg-[#47034E] w-full py-16" id='testimonials'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div 
          className="text-center mb-12"
          data-aos="fade-down"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Testimonials</h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-1 w-16 bg-[#E0B6E4]"></div>
            <span className="text-[#E0B6E4] font-medium">What People Say</span>
            <div className="h-1 w-16 bg-[#E0B6E4]"></div>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Feedback from clients and colleagues who I've had the pleasure to work with.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop Testimonials (3 in a row) */}
          <div className="hidden md:flex flex-wrap -mx-4">
            {testimonialsData.slice(activeIndex, activeIndex + visibleTestimonials)
              .map((testimonial) => (
                <TestimonialCard 
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={true}
                />
              ))}
          </div>
          
          {/* Mobile Testimonial (Single) */}
          <div className="block md:hidden">
            <TestimonialCard 
              testimonial={testimonialsData[activeIndex]}
              isActive={true}
            />
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#E0B6E4] text-[#47034E] p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            data-aos="fade-right"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#E0B6E4] text-[#47034E] p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            data-aos="fade-left"
          >
            <FaChevronRight />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 mx-1 rounded-full ${
                Math.floor(activeIndex / visibleTestimonials) === index 
                  ? 'bg-[#E0B6E4]' 
                  : 'bg-gray-500'
              }`}
              onClick={() => setActiveIndex(index * visibleTestimonials)}
              aria-label={`Go to testimonial set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;