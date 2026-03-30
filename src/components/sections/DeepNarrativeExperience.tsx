import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"

// ==========================
// AMBIENT PARTICLES
// Pre-generating static parameters so they don't jump around on React re-renders.
// ==========================
const AMBIENT_PARTICLES = Array.from({ length: 45 }).map(() => ({
  id: Math.random().toString(36).substring(7),
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1, // 1px to 4px
  duration: Math.random() * 30 + 15, // 15s to 45s float time
  delay: Math.random() * -45, // Spread them out so they are already flowing
  opacity: Math.random() * 0.3 + 0.05,
  wobbleOffset: Math.random() * 60 - 30, // Random drift left/right
}))

// A purely visual component that renders ambient water particles drifting upwards continuously 
function AmbientParticleLayer() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-screen">
      {AMBIENT_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-200 shadow-[0_0_8px_1px_rgba(0,255,255,0.3)]"
          style={{ left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{
            y: ["100vh", "-10vh"],
            x: [0, p.wobbleOffset, 0, -p.wobbleOffset, 0],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }
          }}
        />
      ))}
    </div>
  )
}

export function DeepNarrativeExperience() {
  const containerRef = useRef<HTMLElement>(null)
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Track the scroll over an extremely tall container to stretch out transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Global mouse tracking for interactivity
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  // Fluid displacement mapped based on screen size approximations
  const displaceX1 = useTransform(smoothMouseX, [0, windowSize.width], [30, -30])
  const displaceY1 = useTransform(smoothMouseY, [0, windowSize.height], [30, -30])
  
  const displaceX2 = useTransform(smoothMouseX, [0, windowSize.width], [-40, 40])
  const displaceY2 = useTransform(smoothMouseY, [0, windowSize.height], [-40, 40])
  
  const displaceX3 = useTransform(smoothMouseX, [0, windowSize.width], [25, -25])
  const displaceY3 = useTransform(smoothMouseY, [0, windowSize.height], [-25, 25])
  
  const displaceX4 = useTransform(smoothMouseX, [0, windowSize.width], [-35, 35])
  const displaceY4 = useTransform(smoothMouseY, [0, windowSize.height], [35, -35])

  // NEW: 3D perspective rotation mapped to mouse!
  const rotateX = useTransform(smoothMouseY, [0, windowSize.height], [15, -15])
  const rotateY = useTransform(smoothMouseX, [0, windowSize.width], [-15, 15])

  // ==========================
  // LAYER 1: Entering the Water
  // ==========================
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0])
  const layer1Y = useTransform(scrollYProgress, [0, 0.28], ["5%", "-5%"])

  // ==========================
  // LAYER 2: Ideas form
  // ==========================
  const layer2Opacity = useTransform(scrollYProgress, [0.32, 0.36, 0.54, 0.58], [0, 1, 1, 0])
  const depthOverlayOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.9], [0, 0.4, 0.6, 0.95])

  // Macro floating tracking (scroll-based)
  const word1Y = useTransform(scrollYProgress, [0.3, 0.6], ["20%", "-20%"])
  const word2Y = useTransform(scrollYProgress, [0.3, 0.6], ["-5%", "-15%"])
  const word3Y = useTransform(scrollYProgress, [0.3, 0.6], ["15%", "-10%"])
  const word4Y = useTransform(scrollYProgress, [0.3, 0.6], ["5%", "-25%"])
  const word5Y = useTransform(scrollYProgress, [0.3, 0.6], ["-10%", "5%"])

  // ==========================
  // LAYER 3: Design Process
  // ==========================
  const layer3Opacity = useTransform(scrollYProgress, [0.60, 0.64, 0.82, 0.86], [0, 1, 1, 0])
  
  const wordEmotionOp = useTransform(scrollYProgress, [0.62, 0.64, 0.66, 0.68], [0, 1, 1, 0])
  const wordEmotionY = useTransform(scrollYProgress, [0.62, 0.64, 0.66, 0.68], ["60px", "0px", "0px", "-60px"])
  
  const wordCalmOp = useTransform(scrollYProgress, [0.67, 0.69, 0.71, 0.73], [0, 1, 1, 0])
  const wordCalmY = useTransform(scrollYProgress, [0.67, 0.69, 0.71, 0.73], ["60px", "0px", "0px", "-60px"])

  const wordImmersionOp = useTransform(scrollYProgress, [0.72, 0.74, 0.76, 0.78], [0, 1, 1, 0])
  const wordImmersionY = useTransform(scrollYProgress, [0.72, 0.74, 0.76, 0.78], ["60px", "0px", "0px", "-60px"])
  
  const wordExperiencesOp = useTransform(scrollYProgress, [0.78, 0.80, 0.84, 0.86], [0, 1, 1, 1])
  const wordExperiencesY = useTransform(scrollYProgress, [0.78, 0.80, 0.84, 0.86], ["60px", "0px", "0px", "0px"])

  // ==========================
  // LAYER 4: The Deepest Part
  // ==========================
  const layer4Opacity = useTransform(scrollYProgress, [0.86, 0.89, 1, 1], [0, 1, 1, 1])
  const layer4Scale = useTransform(scrollYProgress, [0.86, 1], [0.95, 1])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[650vh]"
    >
      {/* Sticky Container - Catches mouse movements globally to displace the bubbles */}
      <div 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
        onMouseMove={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        }}
      >

        {/* Dynamic Dark Depth Mask */}
        <motion.div 
          style={{ opacity: depthOverlayOpacity }} 
          className="absolute inset-0 bg-[#000000] pointer-events-none z-[-2]"
        />

        {/* Ambient continuous upward floating particle ocean */}
        <AmbientParticleLayer />

        {/* LAYER 1: Entering the Water */}
        <motion.div 
          style={{ opacity: layer1Opacity, y: layer1Y }}
          className="absolute inset-0 flex items-center justify-center z-[2]"
        >
          {/* A faint central light ray effect */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent h-[40vh] opacity-50 blur-[2px]" />
          
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading text-white tracking-wide mix-blend-screen text-center px-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.2)] leading-tight">
            My work always starts<br/>
            <span className="italic text-primary/90 font-light drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">with a feeling</span>
          </h2>
        </motion.div>

        {/* LAYER 2: Ideas form & Interactive Bubbles */}
        <motion.div 
          style={{ opacity: layer2Opacity, perspective: 1200 }}
          className="absolute inset-0 flex items-center justify-center z-[3]"
        >
          {/* This wrapper provides 3D rotation depending on the mouse, making the whole group of elements seem to tilt in 3D space natively! */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-5xl h-full flex items-center justify-center"
          >
            {/* Center Anchor matched to the preferred big heading font */}
            <h3 
              className="text-4xl md:text-6xl lg:text-[5.5rem] font-heading italic text-white text-center z-10 px-4 leading-[1.1] tracking-tight drop-shadow-[0_0_20px_rgba(0,255,255,0.25)]"
              style={{ transform: "translateZ(80px)" }} // Pushes text forward in 3D
            >
              I explore before I decide
            </h3>

            {/* Orbiting / Floating Bubbles (Parallax + Liquid Bubble Glass + Deep Offset) */}
            <motion.div style={{ y: word1Y, x: displaceX1, transform: "translateZ(120px)" }} className="absolute left-[15%] top-[25%] pointer-events-auto cursor-default">
              <motion.span 
                animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} 
                style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
                className="liquid-bubble flex items-center justify-center px-8 py-5 text-primary font-bubble text-xl md:text-3xl"
              >
                curiosity
              </motion.span>
            </motion.div>
            
            <motion.div style={{ y: word2Y, x: displaceX2, transform: "translateZ(-40px)" }} className="absolute right-[20%] top-[20%] pointer-events-auto cursor-default">
              <motion.span 
                animate={{ y: [-10, 10, -10], rotate: [2, -2, 2] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} 
                style={{ borderRadius: "50% 50% 30% 70% / 60% 40% 70% 40%" }}
                className="liquid-bubble flex items-center justify-center px-7 py-4 text-white/90 font-bubble text-lg md:text-2xl"
              >
                play
              </motion.span>
            </motion.div>
            
            <motion.div style={{ y: word3Y, x: displaceX3, transform: "translateZ(150px)" }} className="absolute left-[20%] bottom-[25%] pointer-events-auto cursor-default">
              <motion.span 
                animate={{ y: [-20, 20, -20], rotate: [-3, 3, -3] }} 
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }} 
                style={{ borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%" }}
                className="liquid-bubble flex items-center justify-center px-10 py-6 text-primary font-bubble text-2xl md:text-4xl"
              >
                experimentation
              </motion.span>
            </motion.div>
            
            <motion.div style={{ y: word4Y, x: displaceX4, transform: "translateZ(40px)" }} className="absolute right-[15%] bottom-[30%] pointer-events-auto cursor-default">
              <motion.span 
                animate={{ y: [-12, 12, -12], rotate: [1, -3, 1] }} 
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }} 
                style={{ borderRadius: "30% 70% 50% 50% / 50% 50% 70% 40%" }}
                className="liquid-bubble flex items-center justify-center px-8 py-4 text-white/90 font-bubble text-xl md:text-2xl"
              >
                intuition
              </motion.span>
            </motion.div>
            
            <motion.div style={{ y: word5Y, x: displaceX1, transform: "translateZ(-80px)" }} className="absolute left-[45%] top-[10%] pointer-events-auto cursor-default">
              <motion.span 
                animate={{ y: [-8, 8, -8], rotate: [-1, 2, -1] }} 
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }} 
                style={{ borderRadius: "50% 50% 60% 40% / 30% 70% 50% 60%" }}
                className="liquid-bubble flex items-center justify-center px-6 py-3 text-primary/80 font-bubble text-sm md:text-base tracking-widest uppercase"
              >
                trying things
              </motion.span>
            </motion.div>
            
            {/* Additional interactive Layer 2 particles tied to rotation for ultra depth */}
            <div className="absolute inset-0 pointer-events-none transform-gpu" style={{ transform: "translateZ(60px)" }}>
              <motion.div style={{ x: displaceX2, y: displaceY1 }} className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_15px_5px_rgba(0,255,255,0.4)] opacity-50 mix-blend-screen" />
              <motion.div style={{ x: displaceX3, y: displaceY2 }} className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_10px_3px_rgba(0,255,255,0.5)] opacity-40 mix-blend-screen" />
              <motion.div style={{ x: displaceX4, y: displaceY3 }} className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_12px_4px_rgba(0,200,255,0.4)] opacity-60 mix-blend-screen" />
            </div>
          </motion.div>
        </motion.div>

        {/* LAYER 3: Design Process */}
        <motion.div 
          style={{ opacity: layer3Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-[4] w-full"
        >
          {/* Using a single flex-row container. The font size drives the height. 
              The relative container has zero width so the text flows out to the right naturally. */}
          <div className="flex flex-row items-center justify-center w-full text-3xl md:text-5xl lg:text-[4.5rem] font-heading text-white px-4 leading-[1.1] tracking-tight">
            <span className="opacity-70 font-light mr-4 md:mr-6 whitespace-nowrap">I design for</span>
            {/* Using a flexible wrapper that ensures the layout stays centered! */}
            <div className="relative h-[1.2em] w-[150px] md:w-[250px] lg:w-[350px] flex items-center justify-start">
              
              <motion.span style={{ opacity: wordEmotionOp, y: wordEmotionY }} className="absolute left-0 italic text-primary drop-shadow-[0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">emotion</motion.span>
              
              <motion.span style={{ opacity: wordCalmOp, y: wordCalmY }} className="absolute left-0 italic text-primary drop-shadow-[0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">calm</motion.span>
              
              <motion.span style={{ opacity: wordImmersionOp, y: wordImmersionY }} className="absolute left-0 italic text-primary drop-shadow-[0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">immersion</motion.span>
              
              <motion.span style={{ opacity: wordExperiencesOp, y: wordExperiencesY }} className="absolute left-0 italic text-primary drop-shadow-[0_0_20px_rgba(0,255,255,0.3)] whitespace-nowrap">
                experiences
              </motion.span>

            </div>
          </div>
        </motion.div>

        {/* LAYER 4: The Deepest Part */}
        <motion.div 
          style={{ opacity: layer4Opacity, scale: layer4Scale }}
          className="absolute inset-0 flex flex-col items-center justify-center z-[5] text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[6rem] font-heading text-white leading-tight tracking-[0.02em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            <span className="block opacity-60 font-light mb-6">I don't just design things people see</span>
            <span className="block italic text-primary drop-shadow-[0_0_30px_rgba(0,255,255,0.15)] leading-[0.9]">I design things people feel</span>
          </h1>
        </motion.div>

      </div>
    </section>
  )
}
