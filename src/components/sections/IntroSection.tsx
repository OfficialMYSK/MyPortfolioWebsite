export function IntroSection() {
  return (
    <section id="intro" className="relative w-full py-24 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b12] to-[#011422] z-[-1]"></div>
      
      <span className="bio-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
        Who I Am
      </span>
      
      <p className="max-w-2xl text-white/80 font-body font-light text-lg md:text-xl leading-relaxed mt-6">
        Curiosity drives my creative process. I am fascinated by what happens when you build things with technology and layer aesthetics, interaction, and narrative into a singular sensory moment.
      </p>
    </section>
  )
}
