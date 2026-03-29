import { motion } from "framer-motion"

export function TransitionDive() {
  return (
    <section className="relative w-full h-screen min-h-screen snap-start flex flex-col items-center justify-center text-center overflow-hidden bg-[#010a18]">
      {/* Light rays dropping from above effect */}
       <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-[#00ffff]/5 to-transparent blur-3xl z-0 transform -skew-y-6 translate-y-[-20%]"></div>
       <div className="absolute inset-0 bg-[#001122]/60 mix-blend-multiply z-[1]"></div>

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
