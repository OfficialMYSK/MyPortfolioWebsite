import { CinematicLoader } from "@/components/layout/CinematicLoader"
import { CinematicHero } from "@/components/sections/CinematicHero"
import { TransitionDive } from "@/components/sections/TransitionDive"
import { DeepNarrativeExperience } from "@/components/sections/DeepNarrativeExperience"
import { CinematicFooter } from "@/components/sections/CinematicFooter"
import { BioluminescentCursor } from "@/components/ui/bioluminescent-cursor"
import { ParticleProvider } from "@/context/ParticleContext"
import { ParticleToggle } from "@/components/ui/ParticleToggle"

function App() {
  return (
    <ParticleProvider>
      <div id="scroll-root" className="w-full relative bg-[#000000] text-white selection:bg-primary/30 selection:text-white">

        <CinematicLoader />
        <BioluminescentCursor />
        <ParticleToggle />

        <main className="w-full relative z-10">
          <CinematicHero />
          <TransitionDive />

          {/* Container for sections with a seamless depth gradient */}
          <div className="relative w-full">
            {/* Background gradient starting oceanic and becoming pitch black */}
            <div className="absolute inset-0 z-[-1] pointer-events-none bg-[linear-gradient(to_bottom,#09071a_0%,#070514_20%,#04030d_50%,#020106_80%,#000000_100%)]" />
            <div className="relative z-10 w-full">
              <DeepNarrativeExperience />
            </div>
          </div>
        </main>

        {/* Empty scroll space buffer to create the same pacing void before the footer appears */}
        <div className="w-full h-[75vh] bg-[#000000] pointer-events-none" />

        <CinematicFooter />
      </div>
    </ParticleProvider>
  )
}

export default App
