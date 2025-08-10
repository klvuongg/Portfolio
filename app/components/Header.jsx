import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import SplitText from '@/effects/SplitText'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col
      items-center justify-center gap-4'>
      <div>
        <Image src={assets.hello} alt='' className='rounded-full w-32'/>
      </div>
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
      <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'>
        Computer Science student based in Toronto.
      </h1>
      <p className='max-w-2xl mx-auto font-Ovo'>
        I am a computer science student from Toronto, Canada with a passion in full-stack development.
      </p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a href="#contact"
        className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2'>
            Contact me <Image src={assets.right_arrow_white} alt='' className='w-4' />
        </a>
        <a href="/sample-resume.pdf" download
        className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2'>
            My resume <Image src={assets.download_icon} alt='' className='w-4' />
        </a>
      </div>
    </div>
  )
}

export default Header
