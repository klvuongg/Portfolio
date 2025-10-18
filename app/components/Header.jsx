import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import SplitText from '@/effects/SplitText'
import {motion} from 'motion/react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col
      items-center justify-center gap-4'>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <Image src={assets.hello} alt='' className='rounded-full w-32'/>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3}}
      >
      <SplitText
        texts={[
          "Hi! I'm Kaitlyn Vuong 👋🏻",
          "Welcome to my paw-folio website! 🐇",
          "Let's hop into my world of coding! 🐰"
        ]}
        className="text-xl font-Ovo"
        delay={3000}
        duration={0.6}
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        splitType="chars"
      />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, delay: 0.5}}
        className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'>
        Computer Science student based in Toronto.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.6, delay: 0.7}}
        className='max-w-2xl mx-auto font-Ovo'>
        I am a computer science student from Toronto, Canada with a passion in full-stack development.
      </motion.p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <motion.a 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1}}
          href="#contact"
          className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'>
            Contact me <Image src={assets.right_arrow_white} alt='' className='w-4' />
        </motion.a>
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2}} 
          href="/sample-resume.pdf" download
          className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'>
            My resume <Image src={assets.download_icon} alt='' className='w-4' />
        </motion.a>
      </div>
    </div>
  )
}

export default Header
