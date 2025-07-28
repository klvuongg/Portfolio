import { assets } from '@/assets/assets'
import TiltedCard from '@/effects/TiltedCard'
import Image from 'next/image'
import React from 'react'

const Experience = () => {
  return (
    <div id='experience' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>
        My past experience
      </h4>
      <h2 className='text-center text-5xl font-Ovo'>
        My Experience
      </h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        These are some of the positions I have had worked as during my co-op terms, where I gained valuable experience in software development and real-world applications.
    </p>
    
    <div className='grid grid-cols-auto gap-6 my-10'>
      <TiltedCard
        altText="OPS Experience"
        containerWidth="100%"
        containerHeight="100%"
        scaleOnHover={1.03}
        rotateAmplitude={3}
        displayOverlayContent={true}
        overlayContent={
          <div className='flex flex-col bg-white border border-gray-400 rounded-lg overflow-hidden hover:-translate-y-2 duration-500 hover:shadow-black p-10'>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-2">
                <h4 className="text-3xl font-Outfit font-medium mb-2">Tester Co-op
                    <span className="mt-2 block lg:hidden text-base italic font-Outfit">May 2025 - Present</span>
                </h4>
                <h3 className="hidden lg:inline italic font-Outfit text-base lg:ml-auto">
                    May 2025 - Present
                </h3>
            </div>
            <div className="flex space-x-3">
                <a href="https://www.linkedin.com/company/ontario-public-service-leadership/">
                    <Image src={assets.ontario_public_service_leadership_logo} alt="" className="w-8" />
                </a>
                <a href="http://www.ontario.ca/">
                    <h3 className="font-Outfit text-xl mt-1 font-medium hover:text-gray-600">Ontario Public Service | Government of Ontario</h3>
                </a>
            </div>
                <ul className="list-disc list-inside space-y-2 text-left text-sm sm:text-base font-Outfit mt-5">
                    <li>Understanding the Software Development Life Cycle (SDLC) from a testing perspective, recognizing where manual testing fits into each phase.</li>
                    <li>Operating within an Agile methodology, participating in sprint planning, daily stand-ups, and sprint reviews to align testing efforts with development cycles.</li>
                    <li>Translating user stories into detailed, executable test cases, ensuring comprehensive coverage for new features and changes.</li>
                    <li>Identifying, documenting, and tracking bugs and related issues in Jira, including steps to reproduce, actual vs. expected results, and severity/priority.</li>
                    <li>Writing clear, concise, and reproducible test steps for manual execution, outlining expected results and identifying edge cases.</li>
                    <li>Manually executing test cases meticulously to verify functionality, usability, and adherence to defined requirements.</li>
                    <li>Collaborating closely with product owners, developers, and other team members within the Agile framework to clarify requirements, discuss system behavior, and ensure quality deliverables.</li>
                    <li>Performing thorough regression testing to confirm that new features or bug fixes do not introduce defects into existing functionalities.</li>
                </ul>
          </div>
        }
      />
    </div>
  </div>
  )
}

export default Experience
