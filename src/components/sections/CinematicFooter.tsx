import { motion } from "framer-motion"

export function CinematicFooter() {
  return (
    <footer className="relative w-full h-screen min-h-screen snap-start bg-[#000205] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,100,255,0.05)_0%,transparent_60%)]"></div>

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
