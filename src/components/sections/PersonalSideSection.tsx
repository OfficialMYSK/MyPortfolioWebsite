import { HLSVideo } from "../ui/hls-video"

export function PersonalSideSection() {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 flex items-center justify-center">
      <HLSVideo 
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-color-dodge"
      />
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#011422] to-transparent z-[1]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#011422] to-transparent z-[1]"></div>

      <div className="relative z-10 bio-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 text-center max-w-6xl mx-auto w-full">
        <div>
          <h4 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">Nature</h4>
          <p className="text-white/60 font-body font-light text-sm uppercase tracking-widest">Where I recharge</p>
        </div>
        <div>
          <h4 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">Gaming</h4>
          <p className="text-white/60 font-body font-light text-sm uppercase tracking-widest">Where I get inspired</p>
        </div>
        <div>
          <h4 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">Sports</h4>
          <p className="text-white/60 font-body font-light text-sm uppercase tracking-widest">Where I get energy</p>
        </div>
        <div>
          <h4 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">Learning</h4>
          <p className="text-white/60 font-body font-light text-sm uppercase tracking-widest">What excites me</p>
        </div>
      </div>
    </section>
  )
}
