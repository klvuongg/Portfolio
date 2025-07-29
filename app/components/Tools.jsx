import { assets, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Tools = () => {
  return (
    <div>
      <div id='tools' className='w-full max-w-8xl mx-auto px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-Ovo'>
          Programming Languages and Tools I Use
        </h4>
        <h2 className='text-center text-5xl font-Ovo'>
          My Tools
        </h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
          These are some of the programming languages that I have learned in school and through self-study, and also the tools I use to build my projects.
        </p>
        
        <div className='grid gap-6 my-10 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]'>
          {toolsData.map(({icon, title, description, link}, index) => (
            <div key={index}
              className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:bg-lightHover hover:-translate-y-1 duration-500'>
              <Image src={icon} alt='' className='w-10'/>
              <h3 className='text-lg my-4 text-gray-700'>{title}</h3>
              
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
      </div>
    </div>
  )
}

export default Tools