import React, { useEffect } from 'react';
import ProjectsHero from './ProjectsHero.jsx';
import ProjectsContainer from './ProjectsContainer.jsx';

const Projects = () => {

  return (
    <>
      <ProjectsHero />
      <ProjectsContainer 
        isHomePage={false}
        usePagination={true}
      />
    </>
  );
};

export default Projects;