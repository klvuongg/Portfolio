import { assets, projectData } from '@/assets/assets'
import React from 'react'
import ProjectsCarousel from '@/effects/Carousel'
import { motion } from 'motion/react'

const Projects = ({isDarkMode}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 1 }}
      id='projects' className='w-full px-[3%] sm:px-[8%] md:px-[12%] py-10 scroll-mt-24'>
      <motion.h4 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='text-center mb-2 text-lg font-Ovo'>
        My small archive of projects
      </motion.h4>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center text-4xl sm:text-5xl font-Ovo'>
        My Projects
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-8 sm:mb-12 font-Ovo px-4 sm:px-0'>
        These are some of the projects I have worked on, showcasing my skills in full-stack development 
        and my passion for creating practical applications.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="my-6 sm:my-10">
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
          isDarkMode={isDarkMode}
        />
      </motion.div>
    </motion.div>
  );
};

export default Projects;