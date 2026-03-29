import { ArrowDown } from "lucide-react"
import { HLSVideo } from "../ui/hls-video"

export function StartSection() {
  return (
    <section id="tech" className="relative w-full min-h-[700px] py-32 px-6 md:px-16 lg:px-24">
      {/* Underwater HLS Video Background fallback mux streams */}
      <HLSVideo 
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 mix-blend-screen"
      />
      
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#011422] to-transparent z-[1]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#011422] to-transparent z-[1]"></div>

      <div className="relative z-10 min-h-[500px] flex flex-col items-center justify-center text-center">
        <span className="bio-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
          Creative Tech
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          Technology that feels alive.
        </h2>
        
        <p className="max-w-xl text-white/60 font-body font-light text-sm md:text-base leading-relaxed mb-10">
          I enjoy experimenting with interactive technology, building projects, and solving problems step by step until an idea works.
        </p>

        <button className="bio-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-sm font-medium hover:scale-105 transition-transform">
          View Projects <ArrowDown className="w-4 h-4 text-primary" />
        </button>
      </div>
    </section>
  )
}
