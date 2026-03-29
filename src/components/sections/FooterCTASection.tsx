import { HLSVideo } from "../ui/hls-video"

export function FooterCTASection() {
  return (
    <footer id="contact" className="relative w-full pt-32 pb-8 px-6 md:px-16 lg:px-24 bg-[#011422]">
      <HLSVideo 
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-[120%] -top-[20%] object-cover z-0 opacity-20 mix-blend-color-dodge"
      />
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#011422] to-transparent z-[1]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#011422] to-[#011422] z-[1]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
          Let's create something meaningful.
        </h2>
        
        <p className="max-w-2xl text-white/60 font-body font-light text-base leading-relaxed mb-10">
          I am always excited to learn new things and work on creative projects that combine design and technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bio-glass-strong rounded-full px-8 py-4 text-sm font-medium text-white hover:scale-105 transition-transform">
            Contact Me
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.6)] rounded-full px-8 py-4 text-sm font-medium transition-transform hover:scale-105">
            View Projects
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/40 text-xs font-body max-w-7xl mx-auto">
        <p>© 2026 Portfolio. All rights reserved.</p>
        <div className="flex items-center justify-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
