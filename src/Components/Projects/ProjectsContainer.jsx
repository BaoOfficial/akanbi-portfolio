import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaDatabase, FaChartBar, FaRobot, FaChartPie, FaShoppingCart, FaPizzaSlice, FaUtensils, FaTaxi, FaMoneyBillWave, FaFutbol, FaPlane, FaFileExcel, FaChartLine, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import projectsData from './ProjectsData.js';
import useAOS from '../hooks/useAOS.js';

// Function to render the appropriate icon
const renderIcon = (iconType) => {
  switch(iconType) {
    case 'chart-pie': return <FaChartPie />;
    case 'chart-bar': return <FaChartBar />;
    case 'shopping-cart': return <FaShoppingCart />;
    case 'chart-line': return <FaChartLine />;
    case 'pizza-slice': return <FaPizzaSlice />;
    case 'database': return <FaDatabase />;
    case 'utensils': return <FaUtensils />;
    case 'taxi': return <FaTaxi />;
    case 'money': return <FaMoneyBillWave />;
    case 'robot': return <FaRobot />;
    case 'excel': return <FaFileExcel />;
    case 'football': return <FaFutbol />;
    case 'plane': return <FaPlane />;
    default: return <FaChartBar />;
  }
};

const ProjectCard = ({ project, index }) => {
  useAOS();
  
  // Determine if the project has both "View Project" and "View Dashboard" links
  const hasDashboard = project.hasOwnProperty('viewDashboard');

  return (
    <div 
      className="bg-purple-100 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 h-full flex flex-col"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {project.iconTypes && project.iconTypes.map((iconType, i) => (
            <div key={i} className="bg-[#47034E] text-white p-2 rounded-full">
              {renderIcon(iconType)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#47034E] mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-4">{project.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 text-xs font-medium bg-[#E0B6E4] text-[#47034E] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Spacer that pushes buttons to bottom */}
        <div className="flex-grow"></div>
        
        {/* Links - Now will stay at bottom */}
        <div className="flex flex-wrap gap-4 mt-4">
          <a 
            href={project.viewProject} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white bg-[#47034E] hover:bg-[#7e3285] transition-colors px-4 py-2 rounded-md text-sm font-medium"
          >
            View Project
          </a>
          
          {hasDashboard && (
            <a 
              href={project.viewDashboard} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#47034E] bg-[#E0B6E4] hover:bg-[#9F5EA5] hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium"
            >
              View Dashboard
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-12 space-x-2">
      {/* Previous button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md ${
          currentPage === 1 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-[#47034E] text-white hover:bg-[#7e3285]'
        } transition-colors`}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>
      
      {/* Page numbers */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-10 h-10 rounded-full ${
            currentPage === number
              ? 'bg-[#E0B6E4] text-[#47034E] font-bold'
              : 'bg-[#47034E]/20 text-white hover:bg-[#47034E]/40'
          } transition-colors`}
          aria-label={`Page ${number}`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}
      
      {/* Next button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-[#47034E] text-white hover:bg-[#7e3285]'
        } transition-colors`}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

const ProjectsContainer = ({ 
  limit, 
  showViewMore = false, 
  onViewMoreClick, 
  isHomePage = false,
  usePagination = false
}) => {
  useAOS();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Calculate total pages
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  
  // Get displayed projects based on context (home page vs. projects page)
  let displayedProjects;
  
  if (isHomePage) {
    // For home page, just show limited projects (no pagination)
    displayedProjects = projectsData.slice(0, limit);
  } else if (usePagination) {
    // For projects page with pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    displayedProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);
  } else {
    // For other cases (fallback)
    displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;
  }
  
  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById('projects').offsetTop - 100, // Adjust for header
      behavior: 'smooth'
    });
  };
  
  // Reset to first page when component mounts or usePagination changes
  useEffect(() => {
    setCurrentPage(1);
  }, [usePagination]);

  return (
    <div className="bg-gradient-to-r from-[#47034E] to-[#7e3285]/90 w-full py-16" id='projects'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div 
          className="text-center mb-12"
          data-aos="fade-down"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Projects</h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-1 w-16 bg-[#E0B6E4]"></div>
            <span className="text-[#E0B6E4] font-medium">Data Science Portfolio</span>
            <div className="h-1 w-16 bg-[#E0B6E4]"></div>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative solutions in data science, machine learning, and analytics.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {/* View More Button (for home page) */}
        {isHomePage && showViewMore && limit && projectsData.length > limit && (
          <div 
            className="mt-12 text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <button 
              onClick={onViewMoreClick}
              className="inline-block px-8 py-3 bg-[#E0B6E4] text-[#47034E] font-bold rounded-lg cursor-pointer hover:bg-purple-100 transition-colors duration-300"
            >
              View More Projects
            </button>
          </div>
        )}
        
        {/* Pagination (for projects page) */}
        {usePagination && totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsContainer;