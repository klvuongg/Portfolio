import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import StickerPeel from '@/effects/StickerPeel'
import React from 'react'
import { motion } from 'motion/react'

const About = ({isDarkMode}) => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const handleCardClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };
  
  return (
    <motion.div id='about' className='w-full px-[12%] py-10 pb-32 scroll-mt-24 relative'
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      transition={{ duration: 1 }}
    >
      <motion.h4 className='text-center mb-2 text-lg font-Ovo'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        A Warm Welcome
      </motion.h4>
      <motion.h2 className='text-center text-5xl font-Ovo'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 1, delay: 0.5 }}>
        About me
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.8 }}
        className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1}}
          transition={{ duration: 0.6 }}
          className='relative w-64 sm:w-80 rounded-3xl max-w-none group sticker-parent'>
          <Image
            src={assets.user_image}
            alt='user'
            className='w-full h-auto rounded-3xl block'
          />

          <div className='absolute top-0 left-0 w-full h-full pointer-events-none z-40'>
            <div className='relative w-full h-full sticker-wrapper'>
              <div
                className='absolute pointer-events-auto'
                style={{
                  top: '-25%',
                  left: '-25%',
                  width: '140%',
                  height: '125%'
                }}
              >     
                <StickerPeel
                  imageSrc={assets.sticker.src}
                  width={600}
                  rotate={0}
                  peelBackHoverPct={40}
                  peelBackActivePct={90}
                  shadowIntensity={0.6}
                  lightingIntensity={0.1}
                  initialPosition="center"
                  className=""
                />
              </div>
            </div>
          </div>

          <div className='absolute top-0 left-0 w-full h-full pointer-events-none z-10'>
            <div className='absolute w-[5%] h-[20%] peel-arrow transition-opacity duration-300'>
              <div
                className='absolute'
                style={{
                  bottom: '115%',
                  left: isMobile ? '-60%' : '-120%',
                  transform: 'translateX(-50%)',
                  width: 'clamp(40px, 30vw, 200px)'
                }}
              >
              <Image
                src={isDarkMode ? assets.peel_dark : assets.peel}
                alt='peel arrow'
                className='w-full h-auto'
              />
            </div>
          </div>
        </div>
      </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='flex-1'>
          <p className='mb-10 max-w-6xl font-Ovo'>
            My journey began with an <strong>early exposure</strong> and a <strong>curious mind</strong> on how technology fundamentally shaped our world. This quickly evolved 
            into a fascination with the <strong>impact tech has on our daily lives</strong>, leaving me constantly amazed at how it eases and improves human experience. This drive 
            led me to pursue <strong>software development</strong>, as it perfectly combines my <strong>attention to details</strong> and my commitment to <strong>building 
            solutions that make a real impact</strong>. I’m a dedicated learner, constantly applying my knowledge in languages like C++, Java, and SQL to bring practical, meaningful full-stack applications to life.
          </p>
          <motion.ul 
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            transition={{ duration: 0.8, delay: 1 }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl'>
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <motion.li
                whileInView={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
                key={index}
                onClick={() => handleCardClick(index)}
                className={`info-card border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer duration-500 dark:border-white
                ${selectedIndex === index 
                  ? 'bg-lightHover -translate-y-1 shadow-black dark:shadow-white dark:bg-darkHover/50' 
                  : 'hover:bg-lightHover hover:-translate-y-1 hover:shadow-black dark:hover:shadow-white dark:hover:bg-darkHover/50'
                }`}
              >
                <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3' />
                <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                {Array.isArray(description) ? (
                  description.map((line, i) => (
                    <p key={i} className='text-gray-600 text-md dark:text-white/80'>{line}</p>
                  ))
                ) : (
                  <p className='text-gray-600 text-md'>{description}</p>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Wow image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{ duration: 1, delay: 0.9 }}
        className='absolute right-15 bottom-0 translate-y-4 sm:translate-y-1 lg:-translate-y-20 z-10'>
        <Image src={assets.wow} alt='' className='w-41' />
      </motion.div>
    </motion.div>
  )
}

export default About
