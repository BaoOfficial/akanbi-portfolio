import React from 'react';
import { FaLaptopCode, FaChartBar, FaDatabase, FaRobot, FaChartPie, FaBrain } from 'react-icons/fa';
import project_hero_image from '../../assets/project_hero_image_2.jpg'

const ProjectsHero = ({ totalProjects = 10 }) => {
  const categories = [
    { name: 'Data Analysis', icon: <FaChartBar />, color: 'bg-[#E0B6E4]' },
    { name: 'Data Science', icon: <FaDatabase />, color: 'bg-[#E0B6E4]' },
    { name: 'Machine Learning', icon: <FaRobot />, color: 'bg-[#E0B6E4]' },
    { name: 'Data Visualization', icon: <FaChartPie />, color: 'bg-[#E0B6E4]' },
    { name: 'AI', icon: <FaBrain />, color: 'bg-[#E0B6E4]' }
  ];
  
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project_hero_image}
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#47034E]/85"></div> {/* Purple overlay with 85% opacity */}
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mx-auto max-w-3xl mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Explore my <span className="text-[#E0B6E4]">Projects</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-12">
            Explore my portfolio of data science projects showcasing expertise in analysis, 
            visualization, and machine learning solutions for real-world problems.
          </p>
          
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 mb-16">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-[#E0B6E4]/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 shadow-lg">
                <FaLaptopCode className="text-[#E0B6E4] text-2xl" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{totalProjects}+</p>
                <p className="text-sm text-gray-300">Completed Projects</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-14 h-14 bg-[#E0B6E4]/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#E0B6E4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">5+</p>
                <p className="text-sm text-gray-300">Years Experience</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-14 h-14 bg-[#E0B6E4]/30 backdrop-blur-sm rounded-full flex items-center justify-center mr-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#E0B6E4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">20+</p>
                <p className="text-sm text-gray-300">Satisfied Clients</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Categories Highlights */}
        <div className="w-full max-w-4xl">
          <div className="text-center mb-6">
            <h3 className="text-white text-xl font-semibold mb-2">Areas of Expertise</h3>
            <div className="h-1 w-20 bg-[#E0B6E4] mx-auto"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center px-5 py-3 rounded-full bg-[#E0B6E4]/20 text-white backdrop-blur-sm"
              >
                <span className="mr-2 text-[#E0B6E4]">{category.icon}</span>
                {category.name}
              </div>
            ))}
          </div>
          
          <div className="text-center text-white/60 text-sm mt-6 animate-pulse">
            Scroll down to explore projects
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHero;