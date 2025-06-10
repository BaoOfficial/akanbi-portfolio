import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Hero from './Hero'
import Profile from './Profile'
import QualificationsHome from './QualificationsHome'
import Awards from './Awards'
import Skills from './Skills'
import Testimonials from './Testimonials'
import ProjectsContainer from '../Projects/ProjectsContainer'

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className='home_cont' id='home'>
        <Hero />
        <Profile />
        <ProjectsContainer 
          isHomePage={true}
          limit={3}
          showViewMore={true}
          onViewMoreClick={() => navigate('/projects')}
        />
        <QualificationsHome />
        <Awards />
        <Skills />
        <Testimonials />
    </div>
  )
}

export default Home