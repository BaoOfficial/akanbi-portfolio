import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../assets/profileImage.png';
import AOS from 'aos';
import taofik from '../../assets/taofik_2.jpg'

const DataScientistProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
        AOS.init({
          once: true,
          mirror: false,
        });
      }, []);
      
  return (
    <div className="bg-purple-100 w-full py-6 md:py-12" id='profile'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16"
          data-aos="zoom-in"
          data-aos-duration="1000"
          >
          {/* Profile Image - Fixed width and height */}
          <div className="w-full xs:w-3/3 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto lg:mx-0">
            <div className="relative" style={{ maxWidth: "350px", margin: "0 auto" }}>
              <div className="absolute -top-3 -left-3 w-full h-full bg-[#7e3285] rounded-lg"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#47034E] rounded-lg"></div>
              <img 
                src={taofik}
                alt="Data Scientist" 
                className="w-full h-auto rounded-lg relative z-10 border-2 border-white"
                style={{ maxWidth: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          
          {/* Profile Content - Takes remaining space */}
          <div className="w-full lg:w-2/3 xl:w-3/4 mt-8 lg:mt-0">
            <div className="mb-4">
              <h1 className="text-black text-3xl md:text-4xl font-bold mb-2">Akanbi Taofik</h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-16 bg-[#7e3285]"></div>
                <h2 className="text-[#11001C] text-xl font-medium">Senior Data Scientist</h2>
              </div>
            </div>
            
            <div className="bg-purple-100 border-l-4 border-[#7e3285] pl-4 mb-6">
              <h3 className="text-black font-semibold text-lg mb-2">Career Summary</h3>
              <p className="text-black mb-3">
                Experienced Data Scientist with over 5 years of expertise in transforming complex datasets into actionable insights. Specializing in machine learning algorithms, predictive modeling, and data visualization to drive business strategy and innovation.
              </p>
              <p className="text-black">
                Proven track record of leading cross-functional projects that resulted in significant cost savings and revenue growth across finance, healthcare, and e-commerce sectors.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-black bg-[#E0B6E4] px-4 py-1 rounded-full text-sm">Data Analysis</span>
              <span className="text-white bg-[#7e3285] px-4 py-1 rounded-full text-sm">Machine Learning</span>
              <span className="text-black bg-[#E0B6E4] px-4 py-1 rounded-full text-sm">Python</span>
              <span className="text-white bg-[#7e3285] px-4 py-1 rounded-full text-sm">Big Data</span>
              <span className="text-black bg-[#E0B6E4] px-4 py-1 rounded-full text-sm">Statistical Analysis</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#47034E] hover:bg-[#7e3285] text-white px-5 py-2 rounded transition-colors duration-300 w-full cursor-pointer sm:w-auto" onClick={() => navigate('/contact')}>
                Contact Me
              </button>
              <button className="border-2 border-[#7e3285] text-[#7e3285] hover:bg-[#7e3285] hover:text-white px-5 py-2 rounded transition-colors duration-300 w-full cursor-pointer sm:w-auto">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataScientistProfile;