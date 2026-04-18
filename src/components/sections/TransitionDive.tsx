import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useRef, useEffect } from "react"

export function TransitionDive() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const isVideoInView = useInView(videoRef, { margin: "200px" })

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoInView) {
        videoRef.current.play().catch(e => console.warn("Video play prevented:", e))
      } else {
        videoRef.current.pause()
      }
    }
  }, [isVideoInView])

  // Reduce translation (+15%) to allow zooming out the video without showing edges
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"])

  // Indicator peaks at 0.5 (when perfectly centered) and fades abruptly when scrolled out
  const indicatorOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 1, 0])

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-screen snap-start flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#000000] via-[#04030d] to-[#09071a]">
      {/* Background Video & Overlay Masked Wrapper for Seamless Crossfade */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{ WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
      >
        <motion.div style={{ y: yParallax, scale: 1.15 }} className="absolute inset-0 origin-center">
          <video 
            ref={videoRef}
            src="/videos/DepthTransitionVideo.webm"
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Inject a subdued indigo hue so it doesn't turn grayscale, while avoiding overpowering saturation */}
        <div className="absolute inset-0 bg-[#1d1652] pointer-events-none mix-blend-color opacity-90"></div>
        {/* Anchor the overall exposure to the exact #09071a background gradient so it blends perfectly */}
        <div className="absolute inset-0 bg-[#09071a]/60 pointer-events-none"></div>
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

      {/* Centered Scroll Indicator at bottom of the section */}
      <motion.div 
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-body opacity-80">Dive Deeper</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-primary/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}
