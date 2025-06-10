import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaLinkedin } from 'react-icons/fa';
import testimonialsData from './TestimonialsData.js';

// Memoize the TestimonialCard to prevent unnecessary re-renders
const TestimonialCard = memo(({ testimonial }) => {
  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-purple-100 rounded-lg p-6 shadow-lg h-full flex flex-col relative animate-fadeIn">
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
                loading="lazy" // Lazy load images
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
});

// Add display name for debugging
TestimonialCard.displayName = 'TestimonialCard';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalTestimonials = testimonialsData.length;
  const visibleTestimonials = 3; // Number of testimonials visible on desktop
  
  // Calculate the total number of "slides" in the carousel
  const totalSlides = Math.ceil(totalTestimonials / visibleTestimonials);
  
  // Memoize the navigation functions to prevent recreation on each render
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex + 1 >= totalTestimonials ? 0 : prevIndex + 1
    );
  }, [totalTestimonials]);
  
  const prevTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
  }, [totalTestimonials]);
  
  // Optimize the pagination click handler
  const goToSlide = useCallback((index) => {
    setActiveIndex(index * visibleTestimonials);
  }, [visibleTestimonials]);
  
  // Handle pause/resume of auto rotation on hover
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);
  
  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);
  
  // Auto-rotate testimonials, with an optimized dependency array
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]); // Only recreate interval when autoplay status changes
  
  // Prepare visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    // For mobile (single item)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return [testimonialsData[activeIndex % totalTestimonials]];
    }
    
    // For desktop (3 items)
    let visible = [];
    for (let i = 0; i < visibleTestimonials; i++) {
      const index = (activeIndex + i) % totalTestimonials;
      visible.push(testimonialsData[index]);
    }
    return visible;
  };
  
  // Memoize the visible testimonials
  const visibleItems = getVisibleTestimonials();
  
  return (
    <div className="bg-[#47034E] w-full py-16" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
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
        
        {/* Testimonials Carousel - with mouse event handlers to pause/resume autoplay */}
        <div 
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Testimonials */}
          <div className="flex flex-wrap -mx-4 transition-all duration-500">
            {visibleItems.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#E0B6E4] text-[#47034E] p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#E0B6E4] text-[#47034E] p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
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
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;