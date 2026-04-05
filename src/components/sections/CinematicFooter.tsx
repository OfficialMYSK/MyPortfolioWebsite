import { motion, useInView } from "framer-motion"
import { HLSVideo } from "@/components/ui/hls-video"
import { useRef, useEffect } from "react"

export function CinematicFooter() {
  const footerRef = useRef<HTMLElement>(null)
  
  // Trigger when the footer is 10% into view from the bottom
  const isInView = useInView(footerRef, { margin: "-10% 0px 0px 0px", once: false })

  useEffect(() => {
    if (isInView && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [isInView])

  return (
    <footer ref={footerRef} className="relative w-full h-screen min-h-screen bg-[#000000] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HLSVideo 
          src="https://stream.mux.com/2i1rBMfsSET9NaccgZvawPnkfXMw0102JpSDrwVgtLgEY.m3u8"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
        />
        {/* Deep gradient overlay to blend into the darkness */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-black/40 to-[#000000]/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10 max-w-4xl w-full"
      >
        <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-white tracking-[-2px] leading-[0.9] mb-12">
          Let’s create something meaningful
        </h2>
        <p className="text-white/50 font-body font-light text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
          I enjoy learning new things, experimenting with creative technology, and creating work that leaves a lasting impression.
        </p>

        <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}
            className="text-white/20 uppercase tracking-[0.4em] mt-40 text-xs font-body">
            © 2026 Portfolio. Dive Deep.
        </motion.p>
      </motion.div>
    </footer>
  )
}
