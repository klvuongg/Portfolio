'use client'
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Tools from "./components/Tools";

export default function Home() {
  return (
    <>
    <Navbar />
    <Header />
    <About />
    <Tools />
    <Experience />
    <Projects />
    <Contact />
    <Footer />
    </>
  );
}
