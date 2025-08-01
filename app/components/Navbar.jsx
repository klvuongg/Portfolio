import Dock from '@/effects/Dock.jsx'
import { assets } from '@/assets/assets'
import { bunnyAssets } from '@/assets/bunnyAssets'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'

const dockItems = [
  {
    label: 'Home',
    onClick: () => window.location.hash = '#top',
  },
  {
    label: 'About me',
    onClick: () => window.location.hash = '#about',
  },
  {
    label: 'Tools',
    onClick: () => window.location.hash = '#tools',
  },
  {
    label: 'Experience',
    onClick: () => window.location.hash = '#experience',
  },
  {
    label: 'Projects',
    onClick: () => window.location.hash = '#projects',
  },
];


const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bunnyState, setBunnyState] = useState(bunnyAssets.sittingRight);
  const bunnyRef = useRef(null);

  const handleNavClick = (index, hash) => {
    if (index === activeIndex) return;

    const isForward = index > activeIndex;
    const hopGif = isForward ? bunnyAssets.hopForward : bunnyAssets.hopBackward;
    setBunnyState(hopGif);

    setTimeout(() => {
      const atStart = index === 0;
      const atEnd = index === dockItems.length - 1;
      const newSit = atEnd ? bunnyAssets.sittingLeft
                  : atStart ? bunnyAssets.sittingRight
                  : isForward ? bunnyAssets.sittingRight : bunnyAssets.sittingLeft;

      setBunnyState(newSit);
      setActiveIndex(index);
      window.location.hash = hash;
    }, 1505); // match hop animation
  };

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Background behind nav */}
      <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
        <Image src={assets.header_bg_color} alt='' className='w-full' />
      </div>

      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-2 flex items-center justify-between z-50 ${isScroll ? "bg-white-50/50 backdrop-blur-lg shadow-sm" : "bg-white shadow-sm"}`}>
        <a href="#top">
          <Image src={assets.name} alt="" className='w-38 cursor-pointer mr-14' />
        </a>

        {/* Bunny & Dock Menu */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8 px-12 py-2 relative">
          {/* Bunny */}
          <div
            ref={bunnyRef}
            className="absolute -top-20 transition-all duration-500 ease-in-out"
            style={{
              left: `calc(${(100 / dockItems.length) * activeIndex}% + ${(100 / dockItems.length / 2)}%)`,
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          >
            <img src={bunnyState} alt="bunny" className="w-20 h-20" />
          </div>

          {/* Dock Items */}
          <Dock
            items={dockItems.map(item => ({
              ...item,
              children: <span className="font-Ovo">{item.label}</span>
            }))} />
        </div>

        {/* Icons + Menu */}
        <div className='flex items-center gap-6'>
          {/* GitHub */}
          <div className='relative group'>
            <a target='_blank' href="https://github.com/klvuongg">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width={30} height={35} />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">
              GitHub
            </span>
          </div>

          {/* LinkedIn */}
          <div className='relative group'>
            <a target='_blank' href="https://www.linkedin.com/in/kaitlyn-vuong-7901222a6">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" width={30} height={35} />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">
              LinkedIn
            </span>
          </div>

          {/* Email */}
          <div className='relative group'>
            <a href="#contact">
              <img src="https://www.gstatic.com/marketing-cms/assets/images/66/ac/14b165e647fd85c824bfbe5d6bc5/gmail.webp=s96" width={30} height={35} />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">
              khanhlinhvuongklv@gmail.com
            </span>
          </div>

          {/* Mobile Toggle */}
          <button className='block lg:hidden ml-3' onClick={() => setIsMenuOpen(true)}>
            <Image src={assets.menu_black} alt='menu' className='w-6' />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`
            fixed top-0 right-0 bottom-0 w-64 h-screen bg-rose-50 z-[999] flex flex-col gap-4 py-20 px-10 transition-transform duration-500
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className='absolute right-6 top-6' onClick={() => setIsMenuOpen(false)}>
            <Image src={assets.close_black} alt='close' className='w-5 cursor-pointer' />
          </div>

          <li><a className='font-Ovo' onClick={() => setIsMenuOpen(false)} href="#top">Home</a></li>
          <li><a className='font-Ovo' onClick={() => setIsMenuOpen(false)} href="#about">About me</a></li>
          <li><a className='font-Ovo' onClick={() => setIsMenuOpen(false)} href="#tools">Tools</a></li>
          <li><a className='font-Ovo' onClick={() => setIsMenuOpen(false)} href="#experience">Experience</a></li>
          <li><a className='font-Ovo' onClick={() => setIsMenuOpen(false)} href="#projects">Projects</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
