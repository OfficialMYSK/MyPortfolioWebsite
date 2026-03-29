import { Zap, Leaf, Palette, Puzzle } from "lucide-react"

export function StrengthsSection() {
  const strengths = [
    {
      icon: Zap,
      title: "Innovation",
      label: "Creative Technology",
      desc: "I enjoy experimenting with technology and turning ideas into interactive experiences."
    },
    {
      icon: Leaf,
      title: "Nature",
      label: "Nature Inspired",
      desc: "Calm environments and natural atmospheres influence my visual style and design thinking."
    },
    {
      icon: Palette,
      title: "Palette",
      label: "Strong Aesthetics",
      desc: "I like creating visually pleasing work supported by design theory."
    },
    {
      icon: Puzzle,
      title: "Puzzle",
      label: "Problem Solver",
      desc: "I enjoy struggling with a problem until it finally works and everything comes together."
    }
  ]

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-[#011422]">
      <div className="text-center mb-16">
        <span className="bio-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          Strengths
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          What Defines My Work.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {strengths.map((str, i) => {
          const Icon = str.icon
          return (
            <div key={i} className="bio-glass rounded-2xl p-6 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
              <div className="bio-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-heading italic text-white mb-2">{str.title} — {str.label}</h3>
              <p className="text-white/60 font-body font-light text-sm">{str.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
