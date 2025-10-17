'use client'
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Tools from "./components/Tools";
import {useEffect, useState } from 'react';

export default function Home() {

  const [isDarkMode, setIsDarkMode] = useState(null);
  useEffect(() => {
    const isDark = (
      localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    
    setIsDarkMode(isDark);
  }, []); 

  useEffect(() => {
    if (isDarkMode === null) return; 

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); 
    }
  }, [isDarkMode]);

  if (isDarkMode === null) {
    return null; 
  }

  return (
    <>
    <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    <Header isDarkMode={isDarkMode} />
    <About isDarkMode={isDarkMode} />
    <Tools isDarkMode={isDarkMode} />
    <Experience isDarkMode={isDarkMode} />
    <Projects isDarkMode={isDarkMode} />
    <Contact isDarkMode={isDarkMode} />
    <Footer isDarkMode={isDarkMode} />
    </>
  );
}
