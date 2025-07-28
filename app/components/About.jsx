import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 pb-32
    scroll-mt-20 relative'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>
        Introduction
      </h4>
      <h2 className='text-center text-5xl font-Ovo'>
        About me
      </h2>
      <div className='flex w-full flex-col lg:flex-row items-center
      gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.user_image} alt='user' className='w-full rounded-3xl' />
        </div>
        <div className='flex-1'>
            <p className='mb-10 max-w-6xl font-Ovo'>
                I am a passionate, self-driven computer science student with an interest in building practical and meaningful full-stack applications
            </p>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-8 w-full
            max-w-6xl'>
                {infoList.map(({icon, title, description}, 
                index) => (
                    <li className='border-[0.5px] border-gray-400
                    rounded-xl p-6 cursor-pointer hover:bg-lightHover
                    hover:-translate-y-1 hover:shadow-black duration-500' 
                    key={index}>
                        <Image src={icon} alt={title} className='w-7
                        mt-3' />
                        <h3 className='my-4 font-semibold
                        text-gray-700'>
                            {title}
                        </h3>
                        {Array.isArray(description)
                          ? description.map((line, i) => (
                              <p key={i} className='text-gray-600 text-md'>{line}</p>
                            ))
                          : <p className='text-gray-600 text-md'>{description}</p>
                        }
                    </li>
                ))}
            </ul>
        </div>
      </div>
      <div className='absolute right-15 bottom-0 -translate-y-20 z-10'>
        <Image src={assets.wow} alt='' className='w-41' />
    </div>
    </div>
  )
}

export default About
