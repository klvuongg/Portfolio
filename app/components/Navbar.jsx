import Dock from '@/effects/Dock.jsx'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

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

const Navbar = ({isDarkMode, setIsDarkMode}) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenuRef = useRef();
  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)';
  }
  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)';
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Background header image */}
      <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
        <Image src={assets.header_bg_color} alt='' className='w-full' />
      </div>

      {/* Main navbar */}
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-2 flex items-center justify-between z-50 ${isScroll ? "bg-white-50/50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : "bg-white shadow-sm"}`}>
        <a href="#top">
          <Image src={isDarkMode ? assets.name_dark : assets.name} alt="" className='w-38 cursor-pointer mr-14' />
        </a>

        {/* Desktop Dock Navigation */}
        <div className={`hidden lg:flex items-center gap-6 lg:gap-8 px-12 py-2 ${isScroll ? "" : "bg-white bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"}`}>
          <Dock
            items={dockItems.map(item => ({
              ...item,
              children: <span className="font-Ovo">{item.label}</span>
            }))}
          />
        </div>

        <div className='flex items-center gap-6'>
          {/* Dark mode button - shows before social icons on mobile, after on desktop */}
          <button onClick={() => setIsDarkMode(prev => !prev)} className='lg:hidden'>
            <Image src={isDarkMode ? assets.bunny_awake : assets.bunny_sleeping} alt='dark mode' className='w-8 cursor-pointer' />
          </button>

          <div className='relative group'>
            <a target='_blank' href="https://github.com/klvuongg">
              <Image src={isDarkMode ? assets.github_dark : assets.github} alt='github icon' width={isDarkMode ? 32 : 30} height={35} />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">
              GitHub
            </span>
          </div>

          <div className='relative group'>
            <a target='_blank' href="https://www.linkedin.com/in/kaitlyn-vuong-7901222a6?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BaYwCzJnGQpacpsropzkdsQ%3D%3D">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" width={30} height={35} />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">
              LinkedIn
            </span>
          </div>

          <div className='relative group'>
            <a href="#contact">
              <img src="https://www.gstatic.com/marketing-cms/assets/images/66/ac/14b165e647fd85c824bfbe5d6bc5/gmail.webp=s96-fcrop64=1,00000000ffffffff-rw" width={30} height={35} />
            </a>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">
              khanhlinhvuongklv@gmail.com
            </span>
          </div>

          {/* Dark mode button - shows after social icons on desktop only */}
          <button onClick={() => setIsDarkMode(prev => !prev)} className='hidden lg:block lg:ml-8'>
            <Image src={isDarkMode ? assets.bunny_awake : assets.bunny_sleeping} alt='dark mode' className='w-8 cursor-pointer' />
          </button>

          {/* Hamburger menu for mobile */}
          <button className='block lg:hidden ml-3' onClick={openMenu}>
            <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='menu' className='w-6 cursor-pointer' />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul ref={sideMenuRef}
          className={`
            fixed top-0 right-0 bottom-0 w-64 h-screen bg-rose-50 z-999 flex flex-col gap-4 py-20 px-10 transition-transform duration-500 dark:bg-darkHover dark:text-white
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='close' className='w-5 cursor-pointer' />
          </div>

          <li><a className='font-Ovo' onClick={closeMenu} href="#top">Home</a></li>
          <li><a className='font-Ovo' onClick={closeMenu} href="#about">About me</a></li>
          <li><a className='font-Ovo' onClick={closeMenu} href="#tools">Tools</a></li>
          <li><a className='font-Ovo' onClick={closeMenu} href="#experience">Experience</a></li>
          <li><a className='font-Ovo' onClick={closeMenu} href="#projects">Projects</a></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;