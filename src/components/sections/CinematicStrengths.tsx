import { motion } from "framer-motion"

export function CinematicStrengths() {
  const strengths = [
    { title: "Creative Technology", desc: "Pushing the boundaries of what browsers and hardware can do." },
    { title: "Strong Visual Design", desc: "Typography-driven, highly composed atmospheric interfaces." },
    { title: "Problem Solving", desc: "Mapping complex logic and state architectures behind the scenes." },
    { title: "Nature Inspired Design", desc: "Translating organic shapes and calmness into digital formats." },
    { title: "Interactive Experiences", desc: "Focusing on micro-interactions that respond to human touch." },
    { title: "Curiosity & Experimentation", desc: "Constantly testing new APIs, libraries, and generative ideas." }
  ]

  return (
    <section className="relative w-full min-h-screen snap-start py-32 px-6 md:px-16 lg:px-24 bg-transparent flex flex-col justify-center text-center md:text-left">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: 1.5 }}
           className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-4">
            What Defines Me
          </h2>
          <p className="text-white/50 font-body font-light text-sm tracking-[0.2em] uppercase">My Core Strengths</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strengths.map((str, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              className="p-8 border-t border-primary/20 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-3xl font-heading italic text-white mb-4">{str.title}</h3>
              <p className="text-white/60 font-body font-light text-base leading-relaxed">{str.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
