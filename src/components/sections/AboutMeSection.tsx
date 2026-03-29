export function AboutMeSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-16 lg:px-24 bg-[#011422]">
      <div className="text-center mb-16">
        <span className="bio-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          About Me
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          More Than Just a Designer.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bio-glass rounded-2xl p-8 hover:bg-white/5 transition-colors">
          <p className="text-white/80 font-body font-light text-sm leading-relaxed">
            I find grounding and perspective by spending time enjoying nature and calm environments. It resets my creative palette and gives me ideas for organic motion and fluid UI design.
          </p>
        </div>
        <div className="bio-glass rounded-2xl p-8 hover:bg-white/5 transition-colors">
          <p className="text-white/80 font-body font-light text-sm leading-relaxed">
            I have a deep appreciation for gaming, movies, and immersive stories. Analyzing game mechanics and narrative arcs heavily influences how I approach interactive storytelling on the web.
          </p>
        </div>
        <div className="bio-glass rounded-2xl p-8 hover:bg-white/5 transition-colors">
          <p className="text-white/80 font-body font-light text-sm leading-relaxed">
            I enjoy being physically active—whether it's playing football, wakeboarding, hitting the gym, or bouldering. It keeps my mind sharp and helps me power through complex logic problems.
          </p>
        </div>
      </div>
    </section>
  )
}
