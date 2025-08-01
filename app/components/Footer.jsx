import {assets} from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-24'>
      <div className='text-center'>
        <h3 className='w-36 mx-auto mb-2 text-4xl font-medium font-outfit'>Kaitlyn.</h3>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={assets.mail_icon} alt='' className='w-6' />
            khanhlinhvuongklv@gmail.com
        </div>
      </div>

      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        
      </div>
    </div>
  )
}

export default Footer
