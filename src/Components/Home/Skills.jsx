import React from 'react';
import useAOS from '../hooks/useAOS';
import { 
  FaPython, 
  FaDatabase, 
  FaChartBar, 
  FaRobot, 
  FaCloudDownloadAlt, 
  FaCogs,
  FaCode,
  FaChartPie, // Using FaChartPie instead of SiPowerbi
} from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiScikitlearn, SiTableau, SiR } from 'react-icons/si';

const SkillCard = ({ icon, title, skills, index }) => {
  return (
    <div 
      className="w-full sm:w-1/2 lg:w-1/3 p-4"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
    >
      <div className="bg-purple-100 h-full rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 border-b-4 border-[#7e3285]">
        <div className="text-[#7e3285] mb-4 flex justify-center">
          <div className="text-4xl">{icon}</div>
        </div>
        <h3 className="text-[#47034E] text-xl font-bold mb-3 text-center">{title}</h3>
        <ul className="space-y-2">
          {skills.map((skill, i) => (
            <li 
              key={i}
              className="text-gray-800 flex items-center"
              data-aos="fade-up"
              data-aos-delay={index * 100 + i * 50}
              data-aos-duration="400"
            >
              <span className="w-2 h-2 bg-[#7e3285] rounded-full mr-2"></span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProgressBar = ({ name, percentage, icon, index }) => {
  return (
    <div 
      className="mb-6" 
      data-aos="fade-up"
      data-aos-delay={index * 150}
      data-aos-duration="800"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-[#7e3285] mr-2 text-xl">{icon}</span>
          <span className="text-[#47034E] font-medium">{name}</span>
        </div>
        <span className="text-[#47034E] font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-[#E0B6E4] rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-[#47034E] to-[#7e3285] h-2.5 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%` }}
          data-aos="slide-right"
          data-aos-delay={index * 150 + 300}
          data-aos-duration="1000"
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  useAOS();

  const skillCategories = [
    {
      icon: <FaPython />,
      title: "Programming Languages",
      skills: ["Python", "R", "SQL", "JavaScript"]
    },
    {
      icon: <FaRobot />,
      title: "Machine Learning",
      skills: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Natural Language Processing"]
    },
    {
      icon: <FaDatabase />,
      title: "Data Management",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Data Warehousing"]
    },
    {
      icon: <FaChartBar />,
      title: "Data Visualization",
      skills: ["Tableau", "Power BI", "Matplotlib", "Seaborn"]
    },
    {
      icon: <FaCloudDownloadAlt />,
      title: "Cloud Technologies",
      skills: ["AWS", "Google Cloud Platform", "Azure", "Docker"]
    },
    {
      icon: <FaCogs />,
      title: "Tools & Frameworks",
      skills: ["Jupyter", "Git"]
    }
  ];

  const technicalSkills = [
    { name: "Python", percentage: 95, icon: <FaPython /> },
    { name: "Machine Learning", percentage: 90, icon: <FaRobot /> },
    { name: "SQL", percentage: 85, icon: <FaDatabase /> },
    { name: "Data Visualization", percentage: 90, icon: <FaChartBar /> },
    { name: "TensorFlow", percentage: 80, icon: <SiTensorflow /> },
    { name: "PyTorch", percentage: 75, icon: <SiPytorch /> },
    { name: "Scikit-Learn", percentage: 92, icon: <SiScikitlearn /> },
    { name: "Tableau", percentage: 85, icon: <SiTableau /> },
    { name: "Power BI", percentage: 80, icon: <FaChartPie /> }, // Changed from SiPowerbi to FaChartPie
    { name: "R Programming", percentage: 75, icon: <SiR /> }
  ];

  return (
    <div>
      {/* First Section - Dark Background */}
      <div className="bg-gradient-to-r from-[#47034E] to-[#7e3285]/90 w-full py-16" id='skills'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          {/* Section Header */}
          <div 
            className="text-center mb-12"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Skills & Technologies</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-1 w-16 bg-[#7e3285]"></div>
              <span className="text-[#E0B6E4] font-medium">Technical Expertise</span>
              <div className="h-1 w-16 bg-[#7e3285]"></div>
            </div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit honed over years of experience in data science, 
              machine learning, and analytics projects.
            </p>
          </div>

          {/* Skill Categories */}
          <div className="mb-16">
            <div 
              className="text-center mb-10"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Expertise Areas</h3>
              <div className="w-20 h-1 bg-[#7e3285] mx-auto"></div>
            </div>

            <div className="flex flex-wrap -m-4">
              {skillCategories.map((category, index) => (
                <SkillCard 
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  skills={category.skills}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Light Background */}
      <div className="bg-purple-100 w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          {/* Progress Bars for Technical Skills */}
          <div>
            <div 
              className="text-center mb-10"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-[#47034E] mb-2">Technical Proficiency</h3>
              <div className="w-20 h-1 bg-[#7e3285] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {technicalSkills.map((skill, index) => (
                <ProgressBar 
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  icon={skill.icon}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Technologies Grid */}
          <div 
            className="mt-20 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-bold text-[#47034E] mb-2">Technologies I Work With</h3>
            <div className="w-20 h-1 bg-[#7e3285] mx-auto mb-10"></div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: <FaPython />, name: "Python" },
                { icon: <SiR />, name: "R" },
                { icon: <SiTensorflow />, name: "TensorFlow" },
                { icon: <SiPytorch />, name: "PyTorch" },
                { icon: <SiScikitlearn />, name: "Scikit-Learn" },
                { icon: <FaDatabase />, name: "SQL" },
                { icon: <SiTableau />, name: "Tableau" },
                { icon: <FaChartPie />, name: "Power BI" },
                { icon: <FaCode />, name: "Git" }
              ].map((tech, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <div className="w-16 h-16 rounded-full bg-[#47034E] flex items-center justify-center text-[#E0B6E4] text-3xl mb-2 shadow-lg">
                    {tech.icon}
                  </div>
                  <span className="text-[#47034E] font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;