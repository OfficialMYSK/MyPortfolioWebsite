import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useParticles } from "@/context/ParticleContext"

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const trailContainerRef = useRef<HTMLDivElement>(null)
  const { particlesEnabled } = useParticles()

  useEffect(() => {
    if (!particlesEnabled) return; // Instantly disable mouse trail DOM injection

    const section = sectionRef.current
    const container = trailContainerRef.current
    if (!section || !container) return

    const asciiSnippets = ["1010", "0101", "0x01", "{...}", "/>", "init()", "10110.0", "null", "void", "0110", "1", "0", "int()"]
    
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const distance = Math.sqrt((x - lastX)**2 + (y - lastY)**2)
      if (distance < 8) return // Spawns a particle roughly every 8px for smoother trails
      
      lastX = x
      lastY = y

      const el = document.createElement('span')
      el.className = "pointer-events-none absolute text-[#a0ffcc]/80 font-mono text-[10px] md:text-[12px] leading-none mix-blend-screen z-[50]"
      el.innerText = asciiSnippets[Math.floor(Math.random() * asciiSnippets.length)]
      
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.transform = `translate(-50%, -50%) scale(1)`
      el.style.opacity = "1"
      el.style.willChange = "transform, opacity, filter"
      el.style.transition = "all 3000ms cubic-bezier(0.25, 1, 0.5, 1)"
      
      container.appendChild(el)
      
      // Force layout calculation (reflow) so the browser knows the initial state
      // This absolutely prevents the browser from skipping the 3-second CSS transition!
      void el.offsetWidth;
      
      // Apply the final state to trigger the exact 3-second transition
      const randomX = (Math.random() - 0.5) * 30
      el.style.transform = `translate(calc(-50% + ${randomX}px), -40px) scale(0.8)`
      el.style.opacity = "0"
      el.style.filter = "blur(6px)"

      setTimeout(() => {
        if (container.contains(el)) {
          container.removeChild(el)
        }
      }, 3000)
    }

    section.addEventListener("mousemove", handleMouseMove)
    return () => section.removeEventListener("mousemove", handleMouseMove)
  }, [particlesEnabled])

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-screen snap-start overflow-hidden flex flex-col justify-center items-center text-center px-6 bg-[#010a05]">
      
      {/* Container for the mouse trails */}
      <div ref={trailContainerRef} className="absolute inset-0 pointer-events-none z-[4] overflow-hidden" />
      
      {/* Background Video Layer */}
      <video
        src="https://videos.pexels.com/video-files/856955/856955-hd_1920_1080_24fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.25] mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#010a05]/90 via-[#01140a]/30 to-[#010a05] z-[1]"></div>

      {/* Bio-Tech HUD / Line Art Overlay mimicking the reference image */}
      <div className="absolute inset-0 z-[2] opacity-70 pointer-events-none">
        <svg className="w-full h-full" overflow="visible">
          {/* Tech Data Nodes & Lines */}
          <motion.g 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ duration: 3, ease: "easeOut" }}
          >
             {/* Left side node map */}
             <circle cx="20%" cy="45%" r="4" fill="transparent" stroke="white" strokeWidth="1" />
             <circle cx="20%" cy="45%" r="8" fill="transparent" stroke="white" strokeWidth="0.5" />
             <line x1="0" y1="35%" x2="20%" y2="45%" stroke="white" strokeWidth="0.5" className="opacity-60" />
             <line x1="15%" y1="60%" x2="20%" y2="45%" stroke="white" strokeWidth="0.5" className="opacity-60" />
             <line x1="20%" y1="45%" x2="35%" y2="55%" stroke="white" strokeWidth="0.5" className="opacity-60" />
             <line x1="20%" y1="45%" x2="20%" y2="65%" stroke="white" strokeWidth="0.5" className="opacity-60" />
             <line x1="20%" y1="65%" x2="40%" y2="85%" stroke="white" strokeWidth="0.5" className="opacity-40" />
             <circle cx="20%" cy="65%" r="3" fill="transparent" stroke="white" strokeWidth="1" />
             
             {/* Flowing bezier curves wrapping around the center */}
             <path d="M 20% 45% Q 40% 30% 60% 50% T 85% 70%" fill="transparent" stroke="white" strokeWidth="0.5" className="opacity-80" />
             <path d="M 35% 55% Q 55% 65% 75% 55% T 95% 80%" fill="transparent" stroke="white" strokeWidth="0.5" className="opacity-80" />
             <path d="M 15% 60% Q 30% 80% 50% 85% T 90% 70%" fill="transparent" stroke="white" strokeWidth="0.5" className="opacity-50" />
             
             {/* Right side data clusters */}
             <circle cx="60%" cy="50%" r="5" fill="transparent" stroke="white" strokeWidth="0.5" />
             <circle cx="62%" cy="48%" r="2" fill="white" />
             <circle cx="75%" cy="55%" r="4" fill="transparent" stroke="white" strokeWidth="1" />
             <circle cx="85%" cy="70%" r="6" fill="transparent" stroke="white" strokeWidth="0.5" />
          </motion.g>
        </svg>

        {/* Scattered HUD Text mimicking the dataset strings and code snippets */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 1 }} className="absolute inset-0 font-mono text-[9px] md:text-[10px] text-white/80 overflow-hidden">
           <div className="absolute top-[34%] left-[5%] flex flex-col gap-1 tracking-widest">
             <span>101375.0</span><span>101323.0</span><span>101290.0</span>
           </div>
           
           <div className="absolute top-[43%] left-[17%] tracking-wider">1334164.0</div>
           
           <div className="absolute top-[66%] left-[18%] border border-white/40 px-1 py-[1px] tracking-wide">1013840.0</div>
           
           <div className="absolute top-[52%] left-[40%] flex flex-col gap-0 opacity-90 leading-[1.2]">
             <span>int main()&#123;for(;;)&#125;</span>
             <span className="ml-4">int main()&#123;for(;;)&#125;</span>
             <span>int main()&#123;for(;;)&#125;</span>
           </div>
           
           <div className="absolute top-[82%] left-[35%] border border-white/40 px-1 py-[1px]">9414596.0</div>
           <div className="absolute top-[78%] left-[65%] border border-white/40 px-1 py-[1px]">1255317.0</div>
           <div className="absolute top-[88%] left-[78%] border border-white/40 px-1 py-[1px]">1013478.0</div>
           
           <div className="absolute top-[20%] left-[45%] w-[80px] h-[80px] opacity-70">
             {/* Dot matrix constellation roughly mapped */}
             {[...Array(25)].map((_, i) => (
                <div key={i} className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_2px_#fff]" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
             ))}
           </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 max-w-4xl"
      >
        <p className="text-[#a0ffcc]/90 font-mono font-light text-xs uppercase tracking-[0.4em] mb-4 md:mb-6">
          System // The story of
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading italic text-white tracking-tight leading-[0.9] mb-8 drop-shadow-[0_0_40px_rgba(0,255,100,0.15)]">
          A Creative Technology Designer
        </h1>
        <motion.p 
          className="text-white/70 font-body font-light text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          I am a design student focused on creative technology, media design, and sensory experiences. I enjoy building interactive projects, experimenting with technology, and creating work that people can actually feel instead of just see.
        </motion.p>
      </motion.div>
    </section>
  )
}
