import { motion } from "framer-motion"

export function CinematicProjects() {
  const projects = [
    { title: "Sensory Light Form", target: "interactive design", desc: "An exploration into how people feel instead of just see, using spatial tracking and light mapping.", img: "a" },
    { title: "Arduino Nature Kit", target: "creative technology", desc: "Hardware hacking that connects living plant bio-rhythms directly into synthesized soundscapes.", img: "b" },
    { title: "Fluid Media Ecosystem", target: "media design", desc: "A generative UI dashboard that behaves like a living organism responding to its environment.", img: "c" },
    { title: "The Deep Dive", target: "sensory experiences", desc: "An immersive browser experiment testing how far we can push visual atmospheric rendering.", img: "d" }
  ]

  return (
    <section className="relative w-full bg-[#000d1c]">
      <div className="min-h-screen snap-start flex flex-col items-center justify-center px-6 pt-32 pb-16">
        <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }}
            className="text-white/50 font-body uppercase tracking-[0.2em] mb-6">Creative Work</motion.p>
        <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white text-center">Selected Projects</motion.h2>
      </div>

      {projects.map((proj, i) => (
        <div key={i} className="min-h-screen w-full snap-start flex flex-col lg:flex-row items-center justify-center px-6 md:px-16 lg:px-24 gap-12 lg:gap-24 overflow-hidden relative">
          
          <motion.div 
            className={`w-full lg:w-1/2 flex flex-col ${i % 2 !== 0 ? 'lg:order-2 lg:items-end lg:text-right' : 'items-start text-left'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="text-primary/70 font-body uppercase tracking-[0.1em] text-xs mb-4 block bio-glass rounded-full px-4 py-2">Focus: {proj.target}</span>
            <h3 className="text-5xl md:text-7xl font-heading italic text-white mb-6 leading-[0.9]">{proj.title}</h3>
            <p className="text-white/60 font-body font-light text-xl mb-10 max-w-md leading-relaxed">{proj.desc}</p>
            <button className="bio-glass-strong rounded-full px-8 py-4 text-sm font-medium hover:scale-105 transition-transform text-white">
              View Project
            </button>
          </motion.div>

          <motion.div 
            className={`w-full lg:w-1/2 relative aspect-[4/3] rounded-[40px] overflow-hidden bio-glass p-2 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            <div className="w-full h-full bg-[#001428] rounded-[32px] flex items-center justify-center text-primary/10 tracking-widest uppercase text-xs">Project Visual Preview</div>
          </motion.div>

        </div>
      ))}
    </section>
  )
}
