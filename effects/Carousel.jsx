import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { assets, projectData } from "@/assets/assets";
import Image from 'next/image';
import "@/css/Carousel.css";

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 20;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };
const INSTANT_TRANSITION = { type: "tween", duration: 0 };

// Project Card Component with video demo overlay
const ProjectCard = ({ project, style, isActive, onShowDemo }) => {
  const hoverTimerRef = useRef(null);

  const handleMouseEnter = () => {
    if (isActive && project.video) {
      // Start a 3-second timer before showing demo
      hoverTimerRef.current = setTimeout(() => {
        onShowDemo();
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    // Clear timer if mouse leaves before 3 seconds
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return (
    <motion.div
      className='bg-no-repeat bg-cover bg-center rounded-lg 
      relative cursor-pointer group'
      style={{
        backgroundImage: `url(${project.bgImage})`,
        width: '100%',
        height: '100%',
        aspectRatio: 'auto',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Original project info card */}
      <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2
      py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
        <div>
          <h2 className='font-semibold'>{project.title}</h2>
            {Array.isArray(project.description)
                  ? project.description.map((line, i) => (
                      <p key={i} className='text-sm text-gray-700 mb-1'>{line}</p>
                    ))
                  : <p>{project.description}</p>
                }
        </div>

        <div className='flex gap-3'>
          <div className='border rounded-full border-black w-11
          aspect-square flex items-center justify-center shadow[2px_2px_0_#000] hover:bg-gray-300 transition'>
            <a href={project.link} target="_blank"><Image src={assets.github} alt='github icon' className='w-8'></Image></a>
          </div>

          {project.id === 1 && project.deployLink && (
            <div className="border rounded-full border-black w-11
              aspect-square flex items-center justify-center shadow[2px_2px_0_#000] hover:bg-gray-300 transition">
              <a href={project.deployLink} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" alt="Vercel icon" className="w-8" />
              </a>
            </div>
          )}

          {project.id === 2 && project.deployLink && (
            <div className="border rounded-full border-black w-11
              aspect-square flex items-center justify-center shadow[2px_2px_0_#000] hover:bg-gray-300 transition">
              <a href={project.deployLink} target="_blank" rel="noopener noreferrer">
                <Image src={assets.pythonAnywhere} alt="Vercel icon" className="w-9" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsCarousel({
  items = projectData,
  baseWidth = 450,
  baseHeight = 450,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  enableDrag = true,
  containerBackgroundImage = null,
  activeIndicatorImage = null,
  inactiveIndicatorImage = null,
}) {
  const containerPadding = 24;
  const itemWidth = baseWidth - containerPadding * 2;
  const itemHeight = baseHeight - containerPadding * 2 - 60;
  const trackItemOffset = itemWidth + GAP;

  const extendedItems = loop ? [...items, ...items, ...items, ...items, ...items] : items;
  const startIndex = loop ? items.length * 2 : 0;
  
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [demoProject, setDemoProject] = useState(null);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Handle showing demo
const handleShowDemo = (project) => {
  setDemoProject(project);
  setShowDemo(true);
};

// Handle hiding demo
const handleHideDemo = () => {
  setShowDemo(false);
  if (videoRef.current) {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }
};

// Play video when demo is shown
useEffect(() => {
  if (showDemo && videoRef.current && demoProject?.video) {
    videoRef.current.play().catch(err => console.log("Video play failed:", err));
  }
}, [showDemo, demoProject]);

  useEffect(() => {
    if (loop) {
      setDisplayIndex(currentIndex % items.length);
    } else {
      setDisplayIndex(currentIndex);
    }
  }, [currentIndex, items.length, loop]);

  useEffect(() => {
    if (loop) {
      setDisplayIndex(currentIndex % items.length);
    } else {
      setDisplayIndex(currentIndex);
    }
  }, [currentIndex, items.length, loop]);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered) && !isTransitioning) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (loop) {
            return prev + 1;
          } else {
            return prev >= items.length - 1 ? prev : prev + 1;
          }
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, pauseOnHover, isTransitioning]);

  const handleAnimationComplete = () => {
    if (loop && !isTransitioning) {
      const shouldResetToMiddle = 
        currentIndex >= extendedItems.length - items.length * 2 || 
        currentIndex < items.length;
      
      if (shouldResetToMiddle) {
        const normalizedIndex = currentIndex % items.length;
        const newMiddleIndex = items.length * 2 + normalizedIndex;
        
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(newMiddleIndex);
          setTimeout(() => setIsTransitioning(false), 16);
        }, 0);
      }
    }
  };

  const effectiveTransition = isTransitioning ? INSTANT_TRANSITION : SPRING_OPTIONS;

  const handleDragEnd = (_, info) => {
    if (!enableDrag || isTransitioning) return;
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => {
        if (loop) {
          return prev + 1;
        } else {
          return Math.min(prev + 1, items.length - 1);
        }
      });
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => {
        if (loop) {
          return prev - 1;
        } else {
          return Math.max(prev - 1, 0);
        }
      });
    }
  };

  const dragProps = enableDrag
    ? {
        drag: "x",
        dragConstraints: loop
          ? { left: -Infinity, right: Infinity }
          : {
              left: -trackItemOffset * (items.length - 1),
              right: 0,
            },
      }
    : {};

  const handleIndicatorClick = (index) => {
    if (isTransitioning) return;
    
    if (loop) {
      const currentDisplayIndex = currentIndex % items.length;
      let targetIndex;
      
      if (index === currentDisplayIndex) return;
      
      const forwardDistance = (index - currentDisplayIndex + items.length) % items.length;
      const backwardDistance = (currentDisplayIndex - index + items.length) % items.length;
      
      if (forwardDistance <= backwardDistance) {
        targetIndex = currentIndex + forwardDistance;
      } else {
        targetIndex = currentIndex - backwardDistance;
      }
      
      setCurrentIndex(targetIndex);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="projects-carousel-wrapper w-full">
      <div
        ref={containerRef}
        className="carousel-container"
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          margin: '0 auto',
          padding: `${containerPadding}px`,
          borderRadius: '24px',
          border: '1px solid #555',
          background: containerBackgroundImage 
            ? `url(${containerBackgroundImage}) center/cover, linear-gradient(135deg, rgba(13, 7, 22, 0.95) 0%, rgba(13, 7, 22, 0.8) 100%)`
            : 'linear-gradient(135deg, rgba(13, 7, 22, 0.95) 0%, rgba(13, 7, 22, 0.8) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          className="carousel-track"
          {...dragProps}
          style={{
            display: 'flex',
            width: itemWidth,
            height: itemHeight,
            gap: `${GAP}px`,
            x,
            position: 'relative',
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationComplete={handleAnimationComplete}
        >
          {extendedItems.map((project, index) => {
            const range = [
              -(index + 1) * trackItemOffset,
              -index * trackItemOffset,
              -(index - 1) * trackItemOffset,
            ];
            const outputRange = [15, 0, -15];
            const rotateY = useTransform(x, range, outputRange, { clamp: false });
            const isActiveCard = index === currentIndex;
            
            return (
              <motion.div
                key={`${index}-${project.title}`}
                className="carousel-item"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  flexShrink: 0,
                  rotateY: enableDrag ? rotateY : 0,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: enableDrag ? 'grab' : 'pointer',
                  border: 'none',
                  background: 'transparent',
                }}
                transition={effectiveTransition}
              >
                <ProjectCard 
                  project={project} 
                  isActive={isActiveCard} 
                  onShowDemo={() => handleShowDemo(project)}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Indicators */}
        <div className="carousel-indicators-container">
          <div className="carousel-indicators">
            {items.map((_, index) => (
              <motion.div
                key={index}
                className={`carousel-indicator-custom ${displayIndex === index ? 'active' : 'inactive'}`}
                animate={{
                  scale: displayIndex === index ? 1.3 : 1,
                }}
                onClick={() => handleIndicatorClick(index)}
                transition={{ duration: 0.15 }}
                style={{
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {(activeIndicatorImage && inactiveIndicatorImage) ? (
                  <Image
                    src={displayIndex === index ? activeIndicatorImage : inactiveIndicatorImage}
                    alt={`Indicator ${index + 1}`}
                    className="w-full h-full object-contain"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      displayIndex === index 
                        ? 'bg-white' 
                        : 'bg-gray-500'
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Demo Overlay - Full Section Overlay with Backdrop */}
      <AnimatePresence>
        {showDemo && demoProject?.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={(e) => {
              // Only close if clicking directly on the backdrop, not the modal
              if (e.target === e.currentTarget) {
                handleHideDemo();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-[100%] max-h-[100vh] flex flex-col overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={handleHideDemo}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              >
                <Image src={assets.close_black} alt='close' className='w-4 cursor-pointer' />
              </button>

              {/* Project title */}
              <div className="px-6 pt-6 pb-3 border-b border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800">{demoProject.title}</h3>
              </div>
              
              {/* Video container - takes most of the space */}
              <div className="p-6 flex-1 flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  className="rounded-lg w-full h-full object-contain bg-black"
                  loop
                  muted
                  playsInline
                >
                  <source src={demoProject.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Demo description */}
              {demoProject.demoDescription && (
                <div className="px-6 pb-6 flex-shrink-0">
                  <div className="rounded-lg p-5 border border-black-200">
                    {Array.isArray(demoProject.demoDescription) ? (
                      demoProject.demoDescription.map((line, i) => (
                        <p key={i} className="text-lg font-Ovo mb-3 leading-relaxed last:mb-0">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="text-lg font-Ovo leading-relaxed">{demoProject.demoDescription}</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}