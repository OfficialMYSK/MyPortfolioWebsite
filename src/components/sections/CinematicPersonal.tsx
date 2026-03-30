import { motion } from "framer-motion"

export function CinematicPersonal() {
  const sides = [
    { label: "Nature", sub: "Where I recharge" },
    { label: "Gaming", sub: "Where I get inspired" },
    { label: "Sports", sub: "Where I get energy" },
    { label: "Learning", sub: "What excites me" }
  ]

  return (
    <section className="relative w-full min-h-screen snap-start flex flex-col justify-center bg-transparent py-32 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
           initial={{ opacity: 0, filter: "blur(10px)" }}
           whileInView={{ opacity: 1, filter: "blur(0px)" }}
           viewport={{ once: false }}
           transition={{ duration: 2 }}
           className="text-center mb-32"
        >
          <span className="text-white/40 font-body uppercase tracking-[0.3em] text-xs block mb-4">Outside Design</span>
          <h2 className="text-6xl md:text-7xl lg:text-[8rem] font-heading italic text-white tracking-tight opacity-50">Who I Am</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 text-center">
          {sides.map((s, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, amount: 0.5 }}
               transition={{ duration: 1.5, delay: i * 0.2 }}
               className="flex flex-col items-center"
            >
              <h4 className="text-5xl md:text-6xl font-heading italic text-white mb-4">{s.label}</h4>
              <p className="text-white/50 font-body font-light text-xs uppercase tracking-[0.2em]">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
