import { motion } from "framer-motion"

export function ScrollingWhoIAm() {
  const blocks = [
    { title: "Nature", text: "Finding calm in nature helps me recharge and clear my mind. It inspires the fluid, organic structures in my digital work." },
    { title: "Creativity", text: "I find joy in building things, experimenting relentlessly, and solving complex problems step by step until everything aligns." },
    { title: "Technology", text: "Creative technology fascinates me. Whether it's crafting logic circuits, writing Arduino code, or building interactive UI systems, I'm always exploring." },
    { title: "Experiences", text: "My ultimate goal is to create work that people genuinely remember—something that strikes a chord and creates deep emotional connection." }
  ]

  return (
    <section className="relative w-full bg-[#010912]">
      {blocks.map((block, i) => (
         <div key={i} className="min-h-screen w-full snap-start flex flex-col items-center justify-center text-center px-6 relative py-32">
            
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="max-w-2xl mx-auto p-12 md:p-16 rounded-[40px]"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-8 tracking-tight">
                {block.title}
              </h2>
              <p className="text-white/60 font-body font-light text-lg md:text-xl lg:text-2xl leading-relaxed">
                {block.text}
              </p>
            </motion.div>
         </div>
      ))}
    </section>
  )
}
