import { motion, useInView } from "framer-motion"
import { HLSVideo } from "@/components/ui/hls-video"
import { useRef, useEffect } from "react"
import { ArrowRight, Linkedin, Mail, Instagram, Youtube } from "lucide-react"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3" />
  </svg>
)

interface CinematicFooterProps {
  onNavigateToProjects?: () => void;
}

export function CinematicFooter({ onNavigateToProjects }: CinematicFooterProps) {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 mb-16"
        >
          <button
            onClick={onNavigateToProjects}
            className="px-8 py-4 rounded-full bg-white text-black font-body font-medium hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
          >
            View My Projects
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Contact Icons Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="flex items-center justify-center gap-6 md:gap-10 mb-20"
        >
          {/* Active Links */}
          <a href="mailto:mcdeveld@gmail.com?subject=Design%20Inquiry%20for%20MYSK.&body=Hi%20MYSK.,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20love%20to%20chat%20about%20a%20potential%20project.%0D%0A%0D%0AProject%20Type:%20[e.g.%20Branding,%20Web%20Design]%0D%0ATimeline:%20[e.g.%20Next%20month]%0D%0A%0D%0ALooking%20forward%20to%20hearing%20from%20you!%0D%0A%0D%0ABest,%0D%0A[Your%20Name]" className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform" aria-label="Email">
            <Mail className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href="https://www.linkedin.com/in/marco-de-veld" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300 hover:scale-110 transform" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
          </a>

          {/* Spacer or gentle separator */}
          <div className="w-[1px] h-8 bg-white/20 mx-2" />

          {/* Physically Disabled & Visually Dimmed Links */}
          <button disabled className="text-white/20 cursor-not-allowed transform" aria-label="Instagram">
            <Instagram className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button disabled className="text-white/20 cursor-not-allowed transform" aria-label="YouTube">
            <Youtube className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button disabled className="text-white/20 cursor-not-allowed transform" aria-label="TikTok">
            <TikTokIcon className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}
          className="text-white/20 uppercase tracking-[0.4em] text-xs font-body">
          © 2026 MYSK PORTFOLIO
        </motion.p>
      </motion.div>
    </footer>
  )
}
