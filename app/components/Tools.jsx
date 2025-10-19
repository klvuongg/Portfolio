import Folder from '@/effects/Folder'
import Image from 'next/image'
import { toolsData } from '@/assets/assets'
import React, { useState } from 'react'
import { motion } from 'motion/react'

const Tools = ({isDarkMode}) => {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const toolsSectionRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prev => {
      const newState = !prev;
      
      // If closing the folder, scroll to keep it in view
      if (prev === true && toolsSectionRef.current) {
        setTimeout(() => {
          const section = toolsSectionRef.current;
          const sectionTop = section.offsetTop;
          const scrollOffset = 100; // Offset for navbar
          
          window.scrollTo({
            top: sectionTop - scrollOffset,
            behavior: 'smooth'
          });
        }, 100);
      }
      
      return newState;
    });
  };

  const handlePaperHover = (index) => {
    setHoveredIndex(index);
  };

  const handlePaperLeave = () => {
    setHoveredIndex(null);
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <motion.div
      ref={toolsSectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 1 }}
      id="tools" className="w-full max-w-8xl mx-auto px-[8%] py-10 scroll-mt-24">
      <motion.h4 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo">
        What's in the Toolbox?
      </motion.h4>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo">My Tools</motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-3xl mx-auto mt-5 mb-12 font-Ovo">
        Ready to hop down the <strong>rabbit hole of my skillset</strong>? This folder holds the <strong>essential languages, frameworks, and databases</strong> I leverage every day. <strong>Click to open</strong> and explore the tools behind the magic!
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="flex flex-col items-center">
        {open && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 w-full max-w-8xl px-6 z-10 relative">
            {toolsData.map(({ icon, iconDark, title, description }, i) => (
              <div 
                key={i} 
                className={`bg-white shadow-xl rounded-xl p-8 min-h-[360px] flex flex-col transform transition-all duration-300 border-2 border-gray-200 dark:bg-darkTheme dark:hover:bg-darkHover/50 ${
                  hoveredIndex === i 
                    ? 'scale-105 shadow-2xl border-gray-300 dark:border-white/50 dark:shadow-white' 
                    : 'hover:scale-105 hover:shadow-2xl hover:border-gray-300'
                }`}
                onMouseEnter={() => handleCardHover(i)}
                onMouseLeave={handleCardLeave}
              >
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg dark:bg-transparent">
                    <Image src={isDarkMode ? iconDark : icon} alt={title} width={32} height={32} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg leading-tight dark:text-white">{title}</h4>
                </div>
                <div className='text-gray-600 text-md dark:text-white/80' style={{
                columnCount: Array.isArray(description) && description.length > 12 ? 2 : 1,
                columnGap: '12px',
                columnFill: 'balance'
              }}>
                {Array.isArray(description)
                  ? description.map((line, i) => (
                      <p key={i} className='mb-1'>{line}</p>
                    ))
                  : <p>{description}</p>
                }
              </div>
              </div>
            ))}
          </div>
        )}

        {/* Folder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className={`relative z-0 transition-all duration-500 mx-4 sm:mx-0 ${
            open ? 'pt-60 pb-0' : 'py-40 sm:py-60'} `}>
          <Folder 
            size={4} 
            items={[]} 
            isOpen={open} 
            onToggle={handleToggle}
            onPaperHover={handlePaperHover}
            onPaperLeave={handlePaperLeave}
            hoveredIndex={hoveredIndex}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Tools;