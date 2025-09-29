import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { assets, projectData } from "@/assets/assets";
import Image from 'next/image';
import "@/css/Carousel.css";

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 20;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };
const INSTANT_TRANSITION = { type: "tween", duration: 0 };

// Project Card Component with original styling
const ProjectCard = ({ project, style }) => {
  return (
    <motion.div
      className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg 
      relative cursor-pointer group'
      style={{
        backgroundImage: `url(${project.bgImage})`,
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2
      py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
        <div>
          <h2 className='font-semibold'>{project.title}</h2>
          <p className='text-sm text-gray-700'>
            {project.description}
          </p>
        </div>
        <div className='border rounded-full border-black w-9
        aspect-square flex items-center justify-center shadow[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
          <Image src={assets.send_icon} alt='send icon' className='w-5' />
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

  // Create extended items array for seamless loop (5 copies for better buffer)
  const extendedItems = loop ? [...items, ...items, ...items, ...items, ...items] : items;
  const startIndex = loop ? items.length * 2 : 0; // Start from middle section for loop
  
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [displayIndex, setDisplayIndex] = useState(0); // For indicators
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);

  // Update display index based on current index
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
      // Check if we need to reset position for seamless loop
      const shouldResetToMiddle = 
        currentIndex >= extendedItems.length - items.length * 2 || 
        currentIndex < items.length;
      
      if (shouldResetToMiddle) {
        // Calculate equivalent position in middle section
        const normalizedIndex = currentIndex % items.length;
        const newMiddleIndex = items.length * 2 + normalizedIndex;
        
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(newMiddleIndex);
          setTimeout(() => setIsTransitioning(false), 16); // One frame delay
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
      // Moving to next item
      setCurrentIndex((prev) => {
        if (loop) {
          return prev + 1;
        } else {
          return Math.min(prev + 1, items.length - 1);
        }
      });
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Moving to previous item
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
      // Calculate the closest instance of the target index
      const currentDisplayIndex = currentIndex % items.length;
      let targetIndex;
      
      if (index === currentDisplayIndex) return; // Already at this item
      
      // Find the shortest path to the target
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const rotateY = useTransform(x, range, outputRange, { clamp: false });
            
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
                <ProjectCard project={project} />
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
    </div>
  );
}

// Updated Projects component using the carousel
export const ProjectsWithCarousel = () => {
  return (
    <div id='projects' className='w-full px-[12%] py-10 scroll-mt-32'> {/* Increased scroll-mt from 24 to 32 */}
      <h4 className='text-center mb-2 text-lg font-Ovo'>
        My small archive of projects
      </h4>
      <h2 className='text-center text-5xl font-Ovo'>
        My Projects
      </h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        These are some of the projects I have worked on, showcasing my skills in full-stack development 
        and my passion for creating practical applications.
      </p>
      
      {/* Carousel Implementation */}
      <div className="my-6">
        <ProjectsCarousel 
          items={projectData}
          baseWidth={500}
          baseHeight={500}
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          loop={true}
          enableDrag={true}
          containerBackgroundImage={assets.header_bg_color}
          activeIndicatorImage={assets.sun_icon}
          inactiveIndicatorImage={assets.moon_icon}
        />
      </div>

      <a href="" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full
      py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500'>
        Show more <Image src={assets.right_arrow_bold} alt='Right arrow' className='w-4'/>
      </a>
    </div>
  );
};