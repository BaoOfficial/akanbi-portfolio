import React, { useEffect } from 'react';
import { FaTrophy, FaAward, FaMedal, FaUniversity } from 'react-icons/fa';
import award from '../../assets/award2.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AwardCard = ({ icon, title, issuer, date, association, description, index }) => {
  const colors = [
    { bg: "bg-[#7e3285]", light: "bg-[#9A4AA0]", text: "text-white" },
    { bg: "bg-[#47034E]", light: "bg-[#5F0D66]", text: "text-white" }
  ];
  
  const colorSet = colors[index % 2];
  
  return (
    <div 
      className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-8 hover:translate-x-2 transition-transform duration-300 text-center md:text-left"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
    >
      {/* Award Icon */}
      <div className={`${colorSet.bg} text-white p-6 rounded-full flex-shrink-0 shadow-lg`}>
        {icon}
      </div>
      
      {/* Award Content */}
      <div className="flex-grow w-full">
        <div className={`${colorSet.light} ${colorSet.text} p-5 rounded-lg relative shadow-lg`}>
          {/* Award Arrow (only visible on desktop) */}
          <div className={`hidden md:block absolute -left-4 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent ${index % 2 === 0 ? 'border-r-[#9A4AA0]' : 'border-r-[#5F0D66]'}`}></div>
          
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm font-medium mb-2">Issued by {issuer} · {date}</p>
          
          <div className="flex flex-row items-center mb-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden mr-2 shadow-md">
              <FaUniversity size={20} className="text-[#47034E]" />
            </div>
            <p className="text-sm">Associated with {association}</p>
          </div>
          
          {description && (
            <p className="text-sm mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Awards = () => {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
    });
  }, []);

  const awardsData = [
    {
      icon: <FaTrophy size={24} />,
      title: "Academic Excellence Scholarship Award",
      issuer: "Bournemouth University",
      date: "Sep 2022",
      association: "Bournemouth University",
      description: ""
    },
    {
      icon: <FaAward size={24} />,
      title: "O.O.U Indigent Scholarship Award",
      issuer: "Olabisi Onabanjo University",
      date: "Apr 2015",
      association: "Olabisi Onabanjo University(O.O.U)",
      description: "Award for Academically sound students"
    },
    {
      icon: <FaMedal size={24} />,
      title: "Gani Fawehinmi Scholarship",
      issuer: "Gani Fawehinmi Annual Scholarship Board",
      date: "Aug 2014",
      association: "Olabisi Onabanjo University(O.O.U)",
      description: "An award for indigent but Academically promising students. Awarded to the Top 40/600 Applicant throughout the federal. I was rated 3rd among the top 40."
    }
  ];

  return (
    <div className="bg-purple-100 w-full py-12" id='awards'>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-[#47034E] mb-3">Honors & Awards</h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-1 w-16 bg-[#7e3285]"></div>
            <span className="text-[#7e3285] font-medium">Academic Achievements</span>
            <div className="h-1 w-16 bg-[#7e3285]"></div>
          </div>
        </div>
        
        {/* Award Banner with Image */}
        <div 
          className="relative mb-12 rounded-xl overflow-hidden shadow-xl bg-gradient-to-r from-[#47034E]/90 to-[#7e3285]/70"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <div className="flex flex-col md:flex-row items-center p-8">
            {/* Text Content */}
            <div className="md:w-2/3 text-white mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Academic Excellence</h2>
              <p className="text-lg">Recognized achievements in education and professional growth</p>
            </div>
            
            {/* Trophy Image */}
            <div className="md:w-1/3 flex justify-center">
              <img 
                src={award} 
                alt="Golden Star Trophy" 
                className="h-48 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Awards List */}
        <div>
          {awardsData.map((award, index) => (
            <AwardCard 
              key={index}
              icon={award.icon}
              title={award.title}
              issuer={award.issuer}
              date={award.date}
              association={award.association}
              description={award.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;