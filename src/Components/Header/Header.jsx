import {React, useState, useEffect} from 'react'
import {NavBarData} from '../../assets/data.js'
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [toggleNav, setToggleNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Update active nav based on current path when component mounts or URL changes
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which nav item corresponds to the current path
    const currentNav = NavBarData.find(nav => nav.link === currentPath);
    
    if (currentNav) {
      setActiveNav(currentNav.title);
    } else if (currentPath === "/") {
      // If we're at root path, set Home as active
      setActiveNav("Home");
    }
  }, [location.pathname]);

  // Add scroll event listener for enhanced styling when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#380240] shadow-lg' : 'bg-[#47034E] shadow-md'
    }`}>
      <div className="w-full mx-auto px-4 md:px-8 lg:px-32 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="block md:hidden cursor-pointer" onClick={() => setToggleNav(!toggleNav)}>
            {toggleNav ? <FiX size={30} className="text-white" /> : <FiMenu size={30} className="text-white" />} 
          </div>
          <p className="font-['Vampiro_One'] text-xl md:text-3xl text-white ml-4 md:ml-0">Akanbi</p>
        </div>
        
        <div className="hidden md:flex items-center gap-16">
          <ul className="flex gap-8">
            {NavBarData.map((nav) => (
              <li
                key={nav.title}
                className={`${
                  activeNav === nav.title 
                    ? "text-[#9F5EA5] font-bold border-b border-[#7e3285]" 
                    : "text-white hover:text-[#9F5EA5]"
                } cursor-pointer transition-colors`}
              >
                <Link to={nav.link}>{nav.title}</Link>
              </li>
            ))}
          </ul>
          <button className="bg-[#7e3285] hover:bg-[#520380] text-white px-5 py-2 rounded-md transition-colors">
            Resume
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {toggleNav && (
        <div className="md:hidden w-full bg-white/5 backdrop-blur-sm shadow-lg">
          <ul className="flex flex-col p-4">
            {NavBarData.map((nav) => (
              <li
                key={nav.title}
                className={`${
                  activeNav === nav.title 
                    ? "text-[#9F5EA5] font-bold border-b border-[#7e3285]" 
                    : "text-white hover:text-[#9F5EA5]"
                } py-3 cursor-pointer transition-colors`}
                onClick={() => {
                  setToggleNav(false);
                }}
              >
                <Link to={nav.link}>{nav.title}</Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <button className="bg-[#7e3285] hover:bg-[#520380] text-white px-5 py-2 rounded-md w-full transition-colors">
                Resume
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header