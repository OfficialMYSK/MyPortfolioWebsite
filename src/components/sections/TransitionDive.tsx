import { motion, useScroll, useTransform } from "framer-motion"
import { HLSVideo } from "@/components/ui/hls-video"
import { useRef } from "react"

export function TransitionDive() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // By translating positively (+50%), the video slides down as you scroll, strongly counteracting native scroll.
  // This heavily detaches the video speed from the text speed, perfectly simulating cinematic depth.
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-screen snap-start flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#000000] via-[#030c0e] to-[#082229]">
      {/* Background Video & Overlay Masked Wrapper for Seamless Crossfade */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{ WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
      >
        <motion.div style={{ y: yParallax, scale: 2 }} className="absolute inset-0 origin-center">
          <HLSVideo 
            src="https://stream.mux.com/8GqupEcC56GKowG4BPQYvmc5p5R2AQ1WKOO9zpuhoBM.m3u8"
            autoPlay 
            loop 
            muted 
            playsInline
            playbackRate={0.6}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Lighter pure black overlay to make this the brightest section */}
        <div className="absolute inset-0 bg-[#000000]/40 pointer-events-none"></div>
      </div>
      
      {/* Top Gradient Transition to smoothly blend with the previous section */}
      <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-black to-transparent z-[2] pointer-events-none" />



      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10 px-6 max-w-4xl"
      >
        <span className="text-primary/70 font-body uppercase tracking-[0.4em] text-xs mb-8 block">Depth Transition</span>
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white tracking-[-3px] leading-[0.85] drop-shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          Designing Experiences<br/>You Can Feel.
        </h2>
      </motion.div>
    </section>
  )
}
