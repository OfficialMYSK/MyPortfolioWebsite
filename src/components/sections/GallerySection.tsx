import { motion } from "framer-motion"

export function GallerySection() {
  return (
    <section className="relative w-full min-h-screen snap-start py-32 px-6 md:px-12 bg-transparent flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          Work & Experiments
        </h2>
        <button className="bio-glass rounded-full px-8 py-4 text-white text-sm hover:bg-white/5 transition-colors tracking-widest font-body">
          View All Projects
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
        {[1,2,3,4,5,6,7,8].map((item, i) => (
          <motion.div
             key={i}
             initial={{ opacity: 0, filter: "blur(5px)" }}
             whileInView={{ opacity: 1, filter: "blur(0px)" }}
             viewport={{ once: false }}
             transition={{ duration: 1.5, delay: i * 0.1 }}
             className={`w-full bg-[#00101e] rounded-xl overflow-hidden aspect-[4/5] flex items-center justify-center group relative cursor-pointer ${i === 3 || i === 4 ? 'col-span-2 aspect-[8/5]' : ''}`}
          >
             <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"></div>
             <span className="text-primary/10 tracking-[0.3em] uppercase text-xs z-10 group-hover:text-primary transition-colors duration-1000">Exp {item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
