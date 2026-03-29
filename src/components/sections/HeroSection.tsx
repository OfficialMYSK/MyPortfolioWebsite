import { motion } from "framer-motion"
import { ArrowDown, User } from "lucide-react"
import { BlurText } from "../ui/blur-text"

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-[1000px] overflow-visible">
      <video
        src="https://videos.pexels.com/video-files/856955/856955-hd_1920_1080_24fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-[20%] w-full h-auto object-contain z-0 mt-10 md:mt-0 opacity-40 mix-blend-screen"
      />
      
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] bg-gradient-to-b from-transparent to-[#020b12]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-[150px] px-6 text-center">
        <span className="bio-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]"></span>
          Creative Technology Designer
        </span>

        <BlurText 
          text="Designing Experiences You Can Feel" 
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.8] tracking-[-4px] max-w-4xl" 
        />

        <motion.p 
          className="text-white/60 font-body font-light text-sm md:text-base max-w-xl mt-8 mb-10 leading-relaxed"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          I create interactive, sensory, and atmospheric experiences that combine nature, technology, and emotion.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <button className="bio-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-sm font-medium hover:scale-105 transition-transform">
            Dive Into My Work <ArrowDown className="w-4 h-4 text-primary" />
          </button>
          
          <button className="rounded-full px-8 py-4 flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white transition-colors">
            <User className="w-4 h-4" /> About Me
          </button>
        </motion.div>
      </div>
    </section>
  )
}
