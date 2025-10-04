import { assets, projectData } from '@/assets/assets'
import React from 'react'
import ProjectsCarousel from '@/effects/Carousel'

const Projects = () => {
  return (
    <div id='projects' className='w-full px-[12%] py-10 scroll-mt-24'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>
        My small archive of projects
      </h4>
      <h2 className='text-center text-5xl font-Ovo'>
        My Projects
      </h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        These are some of the projects I have worked on, showcasing my skills in full-stack development 
        and my passion for creating practical applications.
      </p>
      
      <div className="my-10">
        <ProjectsCarousel 
          items={projectData}
          baseWidth={1100}
          baseHeight={550}
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          loop={true}
          enableDrag={true}
          containerBackgroundImage={assets.container_bg} 
          activeIndicatorImage={assets.active_indicator}           
          inactiveIndicatorImage={assets.inactive_indicator}
        />
      </div>
    </div>
  );
};

export default Projects;