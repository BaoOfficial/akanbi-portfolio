import React, { useEffect } from 'react';
import { FaGraduationCap, FaBriefcase, FaUniversity, FaBuilding, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import useAOS from '../hooks/useAOS';

const EducationCard = ({ icon, degree, institution, period, description, index }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3">
      <div
        className="h-full bg-purple-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 overflow-hidden border-t-4 border-[#7e3285] shadow-sm"
        data-aos="fade-up"
        data-aos-delay={index * 150} // 150ms delay increment for each card
        data-aos-duration="800"
      >
        <div className="p-5">
          <div className="flex items-center mb-3">
            <div className="text-white p-3 mr-3 rounded-full bg-[#7e3285]">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">{degree}</h3>
              <p className="text-gray-700 text-sm">{institution}</p>
            </div>
          </div>
          
          <div className="mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#E0B6E4] text-[#47034E]">
              {period}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({ icon, position, company, period, description, index }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3">
      <div 
        className="h-full bg-purple-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 overflow-hidden border-t-4 border-[#47034E]"
        data-aos="fade-up"
        data-aos-delay={index * 150} // 150ms delay increment for each card
        data-aos-duration="800"
      >
        <div className="p-5">
          <div className="flex items-center mb-3">
            <div className="text-white p-3 mr-3 rounded-full bg-[#47034E]">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">{position}</h3>
              <p className="text-gray-700 text-sm">{company}</p>
            </div>
          </div>
          
          <div className="mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-200 text-[#7e3285]">
              {period}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Qualifications = () => {
  // Initialize AOS
  useAOS();

  const educationData = [
    {
      icon: <FaGraduationCap size={20} />,
      degree: "Master's degree, Data Science and Artificial Intelligence",
      institution: "Bournemouth University",
      period: "Sep 2022 - Sep 2023",
      description: "Data Processing and Analytics (SQL, Python, Entity Relationship Modelling), Search and Optimization, Artificial Intelligence, Smart System, Blockchain, Statistical analysis."
    },
    {
      icon: <FaUniversity size={20} />,
      degree: "Bachelor's degree, Chemistry",
      institution: "Olabisi Onabanjo University (O.O.U)",
      period: "Nov 2011 - Oct 2015",
      description: "Grade: Second Class (Hons.) Upper division. Member of Students Chemical Society of Nigeria (SCSN). Focus on Analytical, Physical, Organic, Environmental and Inorganic Chemistry."
    },
    {
      icon: <FaLaptopCode size={20} />,
      degree: "Professional Skills",
      institution: "Self-development",
      period: "2015 - Present",
      description: "Data Modeling, Data Analytics, Mathematics, and various programming languages and analytical tools."
    }
  ];

  const experienceData = [
    {
      icon: <FaBriefcase size={20} />,
      position: "Data Analyst",
      company: "RUN",
      period: "Dec 2022 - Dec 2023 · 1 yr 1 mo",
      description: "Extract data from various sources and perform analysis with SQL and Python to optimize logistic processes resulting in 15% increased operational efficiency. Specialize in Predictive Analytics and Python programming."
    },
    {
      icon: <FaBuilding size={20} />,
      position: "Profit Center Manager",
      company: "UBA Group",
      period: "Jan 2021 - Sep 2022 · 1 yr 9 mos",
      description: "Led a team of 5 members, increased card sales and E-channels by 40% through targeted marketing campaigns and cross-selling techniques, resulting in a revenue increase of 25%. Skills in Performance Management and Credit Analysis."
    },
    {
      icon: <FaChartLine size={20} />,
      position: "Sales Data Analyst",
      company: "UBA Group",
      period: "Nov 2018 - Jan 2021 · 2 yrs 3 mos",
      description: "Developed and implemented a visually-engaging dashboard to track the performance of the sales team resulting in 30% increase in productivity. Expertise in Customer Relationship Management (CRM) and communication."
    }
  ];

  return (
    <div className="bg-[#47034E] w-full py-8 md:py-16" id='qualifications'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        {/* Education Section */}
        <div className="mb-12">
          <div 
            className="text-center mb-8"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Education</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-1 w-16 bg-[#7e3285]"></div>
              <span className="text-[#E0B6E4] font-medium">Academic Background</span>
              <div className="h-1 w-16 bg-[#7e3285]"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap -m-3">
            {educationData.map((edu, index) => (
              <EducationCard 
                key={index}
                icon={edu.icon}
                degree={edu.degree}
                institution={edu.institution}
                period={edu.period}
                description={edu.description}
                index={index}  // Pass the index to the component
              />
            ))}
          </div>
        </div>
        
        {/* Experience Section */}
        <div>
          <div 
            className="text-center mb-8"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Experience</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-1 w-16 bg-[#7e3285]"></div>
              <span className="text-[#E0B6E4] font-medium">Professional Journey</span>
              <div className="h-1 w-16 bg-[#7e3285]"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap -m-3">
            {experienceData.map((exp, index) => (
              <ExperienceCard 
                key={index}
                icon={exp.icon}
                position={exp.position}
                company={exp.company}
                period={exp.period}
                description={exp.description}
                index={index}  // Pass the index to the component
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qualifications;