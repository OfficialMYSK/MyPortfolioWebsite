export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24 bg-[#011422]">
      <div className="mb-20 text-center">
        <span className="bio-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          Projects
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Experiences I Have Created.
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-heading italic text-white">Interactive and sensory design.</h3>
            <p className="text-white/60 font-body font-light text-sm leading-relaxed">
              Projects where technology, space, and emotion come together to create something people can actually feel instead of just see.
            </p>
            <button className="bio-glass-strong rounded-full px-6 py-3 mt-4 text-sm font-medium hover:scale-105 transition-transform">
              View Project
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="bio-glass p-2 rounded-2xl w-full aspect-video flex items-center justify-center overflow-hidden">
              <div className="bg-primary/10 w-full h-full rounded-xl flex items-center justify-center text-primary/30">Gif Placeholder</div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-heading italic text-white">Creative technology and experimentation.</h3>
            <p className="text-white/60 font-body font-light text-sm leading-relaxed">
              I enjoy working with tools like Arduino and building interactive ideas where design and technology work together.
            </p>
            <button className="border border-white/20 rounded-full px-6 py-3 mt-4 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              See more
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="bio-glass p-2 rounded-2xl w-full aspect-video flex items-center justify-center overflow-hidden">
              <div className="bg-primary/10 w-full h-full rounded-xl flex items-center justify-center text-primary/30">Gif Placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
