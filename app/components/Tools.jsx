import Folder from '@/effects/Folder'
import Image from 'next/image'
import { toolsData } from '@/assets/assets'
import React, { useState } from 'react'

const Tools = () => {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleToggle = () => {
    setOpen(prev => !prev);
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
    <section id="tools" className="w-full max-w-8xl mx-auto px-[8%] py-10 scroll-mt-24">
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Programming Languages and Tools I Use
      </h4>
      <h2 className="text-center text-5xl font-Ovo">My Tools</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Click the folder to explore the tools I use, displayed interactively.
      </p>

      <div className="flex flex-col items-center">
        {open && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 w-full max-w-8xl px-6 z-10 relative">
            {toolsData.map(({ icon, title, description }, i) => (
              <div 
                key={i} 
                className={`bg-white shadow-xl rounded-xl p-8 min-h-[360px] flex flex-col transform transition-all duration-300 border-2 border-gray-200 ${
                  hoveredIndex === i 
                    ? 'scale-105 shadow-2xl border-gray-300' 
                    : 'hover:scale-105 hover:shadow-2xl hover:border-gray-300'
                }`}
                onMouseEnter={() => handleCardHover(i)}
                onMouseLeave={handleCardLeave}
              >
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Image src={icon} alt={title} width={32} height={32} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg leading-tight">{title}</h4>
                </div>
                <div className='text-gray-600 text-md' style={{
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
        <div className="py-60 relative z-0">
          <Folder 
            size={4} 
            items={[]} 
            isOpen={open} 
            onToggle={handleToggle}
            color="#5227FF"
            onPaperHover={handlePaperHover}
            onPaperLeave={handlePaperLeave}
            hoveredIndex={hoveredIndex}
          />
        </div>
      </div>
    </section>
  );
};

export default Tools;