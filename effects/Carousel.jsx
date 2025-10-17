import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { assets, projectData } from "@/assets/assets";
import Image from 'next/image';
import "@/css/Carousel.css";

const DRAG_BUFFER = 0; 
const VELOCITY_THRESHOLD = 500;
const GAP_PERCENTAGE = 2;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };
const INSTANT_TRANSITION = { type: "tween", duration: 0 };
const OVERLAY_DURATION = 5000; 

// Instruction Overlay Component
const InstructionOverlay = ({ isMobile, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-10 flex items-center justify-center"
      style={{
        background: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        borderRadius: '12px'
      }}
    >
      <div className="text-center text-white px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          {isMobile ? (
            // Tap/Click animation for mobile
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            >
              <Image src={assets.click_cursor} alt="click cursor" className="w-50 h-25"/>
            </motion.div>
          ) : (
            // Cursor hover animation for desktop
            <motion.div
              className="relative w-20 h-20 mx-auto mb-4"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image src={assets.hover_cursor} alt="hover cursor" className="w-24 h-20"/>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg sm:text-xl font-semibold"
        >
          {isMobile ? "Tap to view demo" : "Hover to view demo"}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm sm:text-base mt-2 opacity-80"
        >
          {isMobile ? "Click on the active card" : "Hold your mouse over the card"}
        </motion.p>
      </div>
    </motion.div>
  );
};

// Project Card Component with video demo overlay
const ProjectCard = ({ project, style, isActive, onShowDemo, isMobile, isDragging }) => {
  const hoverTimerRef = useRef(null);
  const draggedRef = useRef(false); // Track if user dragged
  const mouseDownRef = useRef(false); // Track if mouse button is held down
  // Track if user was hovering when they pressed mouse down
  const wasHoveringOnMouseDownRef = useRef(false);

  const handleMouseEnter = () => {
    // Reset dragged flag on new hover
    draggedRef.current = false;
    
    // Don't start timer if mobile or not active or no video
    if (isMobile || !isActive || !project.video) return;
    
    // Clear any existing timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    // Only start timer if mouse is not currently held down
    if (!mouseDownRef.current) {
      // Start timer - will fire after 3 seconds of hovering
      hoverTimerRef.current = setTimeout(() => {
        // Only show if not dragging AND user didn't drag during this hover AND mouse button is not held down
        if (!isDragging && !draggedRef.current && !mouseDownRef.current) {
          onShowDemo();
        }
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    // Clear timer when mouse leaves
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    // Reset dragged flag
    draggedRef.current = false;
    // Reset mouse down flag
    mouseDownRef.current = false;
    wasHoveringOnMouseDownRef.current = false;
  };

  const handleMouseDown = () => {
    wasHoveringOnMouseDownRef.current = true;
    
    // Mark that mouse button is being held
    mouseDownRef.current = true;
    // Cancel the hover timer immediately when mouse is pressed
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleMouseUp = () => {
    // Reset mouse down flag when button is released
    mouseDownRef.current = false;
    
    // If user was hovering when they pressed down and still hovering, restart timer
    if (wasHoveringOnMouseDownRef.current && !isMobile && isActive && project.video) {
      // Clear any existing timer
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      
      // Restart the hover timer after mouse is released
      hoverTimerRef.current = setTimeout(() => {
        if (!isDragging && !draggedRef.current && !mouseDownRef.current) {
          onShowDemo();
        }
      }, 3000);
    }
    
    // Reset the flag
    wasHoveringOnMouseDownRef.current = false;
  };

  const handleMouseMove = () => {
    // If isDragging is true, mark that user dragged
    if (isDragging) {
      draggedRef.current = true;
      // Cancel the hover timer
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    }
  };

  const handleClick = (e) => {
    // Prevent demo from showing if user just dragged
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    
    // For mobile only, trigger demo on click
    if (isMobile && isActive && project.video) {
      onShowDemo();
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const getBackgroundPosition = () => {
    if (!isMobile) return 'center';
    
    // Define which project IDs should use left positioning on mobile
    const leftPositionIds = [2, 4, 5, 6]; 
    
    return leftPositionIds.includes(project.id) ? 'left center' : 'center';
  };

  return (
    <motion.div
      className='bg-no-repeat bg-cover rounded-lg 
      relative cursor-pointer group'
      style={{
        backgroundImage: `url(${project.bgImage})`,
        backgroundPosition: getBackgroundPosition(),
        width: '100%',
        height: '100%',
        aspectRatio: 'auto',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {/* Project info card */}
      <div className='bg-white w-10/12 rounded-md absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2
        py-4 px-3 sm:py-3 sm:px-5 flex items-center justify-between duration-500 group-hover:bottom-5 sm:group-hover:bottom-7
        border border-gray-400 shadow-md'>
        <div className="flex-1 min-w-0 mr-2">
          <h2 className='font-semibold text-sm sm:text-base truncate dark:text-black'>{project.title}</h2>
              {Array.isArray(project.description)
                    ? project.description.map((line, i) => {
                      if (line.startsWith("Technologies used:")) {
                        const [label, techList] = line.split(": ");
                        return (
                          <p key={i} className='text-sm sm:text-sm text-gray-700 mb-1 sm:mb-1'>
                            {label}: <span className='font-semibold'>{techList}</span>
                          </p>
                        );
                    } else {
                      return (
                        <p key={i} className='text-sm sm:text-sm text-gray-700 mb-1 sm:mb-1'>
                          {line}
                        </p>
                      );
                    }
                  })
                : <p className='text-sm sm:text-sm truncate'>{project.description}</p>
              }
        </div>

        <div className='flex gap-2 shrink-0'>
          <div className='border rounded-full border-black w-8 h-8 sm:w-11 sm:h-11
          aspect-square flex items-center justify-center shadow[2px_2px_0_#000] hover:bg-gray-300 transition'>
            <a href={project.link} target="_blank"><Image src={assets.github} alt='github icon' className='w-5 sm:w-8'></Image></a>
          </div>

          {project.id === 1 && project.deployLink && (
            <div className="border rounded-full border-black w-8 h-8 sm:w-11 sm:h-11
              aspect-square flex items-center justify-center shadow[2px_2px_0_#000] hover:bg-gray-300 transition">
              <a href={project.deployLink} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" alt="Vercel icon" className="w-5 sm:w-8" />
              </a>
            </div>
          )}

          {project.id === 2 && project.deployLink && (
            <div className="border rounded-full border-black w-8 h-8 sm:w-11 sm:h-11
              aspect-square flex items-center justify-center shadow[2px_2px_0_#000] hover:bg-gray-300 transition">
              <a href={project.deployLink} target="_blank" rel="noopener noreferrer">
                <Image src={assets.pythonAnywhere} alt="PythonAnywhere icon" className="w-6 sm:w-9" />
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
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  enableDrag = true,
  containerBackgroundImage = null,
  activeIndicatorImage = null,
  inactiveIndicatorImage = null,
  isDarkMode = false,
}) {
  const extendedItems = loop ? [...items, ...items, ...items, ...items, ...items] : items;
  const startIndex = loop ? items.length * 2 : 0;
  
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [demoProject, setDemoProject] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showInstructionOverlay, setShowInstructionOverlay] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [overlayShown, setOverlayShown] = useState(false);
  const [pauseForOverlay, setPauseForOverlay] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer to detect when carousel is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !overlayShown) {
          setIsInView(true);
          setShowInstructionOverlay(true);
          setPauseForOverlay(true);
          setOverlayShown(true); // Mark that overlay has been shown
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of carousel is visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [overlayShown]);

  // Hide instruction overlay after 5 seconds when in view
  useEffect(() => {
    if (!isInView || !showInstructionOverlay) return;

    const timer = setTimeout(() => {
      setShowInstructionOverlay(false);
      setPauseForOverlay(false); // Resume autoplay after overlay
    }, OVERLAY_DURATION);

    return () => clearTimeout(timer);
  }, [isInView, showInstructionOverlay]);

  // Measure container width for responsive calculations
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const computedStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const innerWidth = container.offsetWidth - paddingLeft - paddingRight;
        setContainerWidth(innerWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    setTimeout(updateWidth, 100);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate responsive dimensions
  const gap = containerWidth * (GAP_PERCENTAGE / 100);
  const trackItemOffset = containerWidth + gap;

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
    if (autoplay && (!pauseOnHover || !isHovered) && !isTransitioning && !pauseForOverlay && !isUserInteracting) {
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
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, pauseOnHover, isTransitioning, pauseForOverlay, isUserInteracting]);

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

  // Track when user starts interacting
  const handleDragStart = () => {
    setIsDragging(true);
    setIsUserInteracting(true); // Stop autoplay when user starts dragging
  };

  const handleDragEnd = (_, info) => {
    const wasDragging = isDragging;
    setIsDragging(false);
    setIsUserInteracting(false); // Resume autoplay when drag ends
    
    if (!enableDrag || isTransitioning) {
      return;
    }
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Only change slides if there was significant drag movement
    const hasMoved = Math.abs(offset) > DRAG_BUFFER || Math.abs(velocity) > VELOCITY_THRESHOLD;
    
    // Only navigate if actually moved
    if (hasMoved) {
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
        dragElastic: 0,
        dragMomentum: false,
        dragTransition: { bounceStiffness: 1000, bounceDamping: 100 }, 
        onDragStart: handleDragStart,
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
    <div className="projects-carousel-wrapper w-full px-4 sm:px-6 md:px-0">
      <div
        ref={containerRef}
        className="carousel-container"
        style={{
          maxWidth: '1100px',
          width: '100%',
          aspectRatio: isMobile ? '9 / 16' : '2 / 1',
          margin: '0 auto',
          padding: 'clamp(16px, 3vw, 24px)',
          paddingBottom: 'clamp(48px, 8vw, 80px)',
          borderRadius: 'clamp(16px, 3vw, 24px)',
          border: '1px solid #555',
          background: containerBackgroundImage 
            ? `url(${containerBackgroundImage}) center/cover, linear-gradient(135deg, rgba(13, 7, 22, 0.95) 0%, rgba(13, 7, 22, 0.8) 100%)`
            : 'linear-gradient(135deg, rgba(13, 7, 22, 0.95) 0%, rgba(13, 7, 22, 0.8) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 'clamp(16px, 3vw, 24px)',
          left: 'clamp(16px, 3vw, 24px)',
          right: 'clamp(16px, 3vw, 24px)',
          bottom: 'clamp(48px, 8vw, 80px)',
          overflow: 'hidden',
          borderRadius: '12px',
        }}>
          <motion.div
            className="carousel-track"
            {...dragProps}
            style={{
              display: 'flex',
              width: containerWidth,
              height: '100%',
              gap: `${gap}px`,
              x,
              position: 'relative',
            }}
            onDragEnd={handleDragEnd}
            onDrag={(event, info) => {
              const currentX = x.get();
              const targetX = -(currentIndex * trackItemOffset);

              const maxDragDistance = 800; 
              const dragOffset = currentX - targetX;
              
              if (Math.abs(dragOffset) > maxDragDistance) {
                x.set(targetX + Math.sign(dragOffset) * maxDragDistance);
              }
            }}
            animate={{ x: containerWidth > 0 ? -(currentIndex * trackItemOffset) : 0 }}
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
                    width: containerWidth,
                    height: '100%',
                    flexShrink: 0,
                    rotateY: enableDrag ? rotateY : 0,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: enableDrag ? 'grab' : 'pointer',
                    border: 'none',
                    background: 'transparent',
                    // ✅ ADDED: Add position relative for overlay
                    position: 'relative',
                  }}
                  transition={effectiveTransition}
                >
                  <ProjectCard 
                    project={project} 
                    isActive={isActiveCard} 
                    onShowDemo={() => handleShowDemo(project)}
                    isMobile={isMobile}
                    isDragging={isDragging}
                  />
                  
                  {/* Show instruction overlay only on the first/center card */}
                  {isActiveCard && showInstructionOverlay && (
                    <InstructionOverlay isMobile={isMobile} isDarkMode={isDarkMode} />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators-container">
          <div className="carousel-indicators" style={{ gap: 'clamp(8px, 2vw, 16px)' }}>
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
                  width: 'clamp(24px, 4vw, 32px)',
                  height: 'clamp(24px, 4vw, 32px)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...(isDarkMode && {
                    backgroundColor: displayIndex === index ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.01)',
                    borderRadius: '50%',
                    border: displayIndex === index ? '1px solid rgba(255, 255, 255, 0.5)' : '0.5px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: displayIndex === index ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none',
                  })
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
                    className={`rounded-full transition-all duration-200`}
                    style={{
                      width: 'clamp(8px, 1.5vw, 12px)',
                      height: 'clamp(8px, 1.5vw, 12px)',
                      backgroundColor: displayIndex === index ? '#fff' : '#555'
                    }}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
              className='relative rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden border'
              style={{
                backgroundColor: isDarkMode ? '#1d0033' : '#f0edf2', 
                borderColor: isDarkMode ? 'border-white/40' : 'border-gray-200',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleHideDemo}
                className={`absolute top-4 right-4 z-10 rounded-full p-2 shadow-lg hover:bg-gray-100 transition ${isDarkMode ? 'bg-black-100 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} cursor-pointer`}
              >
                <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='close' className='w-4' />
              </button>

              {/* Project title */}
            <div className={`px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b ${isDarkMode ? 'border-white/45' : 'border-gray-200'}`}>
                <h3 className={`text-xl sm:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{demoProject.title}</h3>
              </div>
              
              {/* Video container - takes most of the space */}
              <div className="p-4 sm:p-6 flex-1 flex items-center justify-center overflow-hidden">
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
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 shrink-0">
                  <div className="rounded-lg p-3 sm:p-5">
                    {Array.isArray(demoProject.demoDescription) ? (
                      demoProject.demoDescription.map((line, i) => (
                        <p key={i} className="text-sm sm:text-lg font-Ovo mb-2 sm:mb-3 leading-relaxed last:mb-0">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm sm:text-lg font-Ovo leading-relaxed">{demoProject.demoDescription}</p>
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