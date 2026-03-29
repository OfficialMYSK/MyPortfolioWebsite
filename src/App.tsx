import { CinematicLoader } from "@/components/layout/CinematicLoader"
import { CinematicHero } from "@/components/sections/CinematicHero"
import { ScrollingWhoIAm } from "@/components/sections/ScrollingWhoIAm"
import { TransitionDive } from "@/components/sections/TransitionDive"
import { CinematicProjects } from "@/components/sections/CinematicProjects"
import { CinematicStrengths } from "@/components/sections/CinematicStrengths"
import { CinematicPersonal } from "@/components/sections/CinematicPersonal"
import { GallerySection } from "@/components/sections/GallerySection"
import { CinematicFooter } from "@/components/sections/CinematicFooter"
import { BioluminescentCursor } from "@/components/ui/bioluminescent-cursor"
import { ParticleProvider } from "@/context/ParticleContext"
import { ParticleToggle } from "@/components/ui/ParticleToggle"

function App() {
  return (
    <ParticleProvider>
      <div id="scroll-root" className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#010912] text-white selection:bg-primary/30 selection:text-white relative">
        <CinematicLoader />
        <BioluminescentCursor />
        <ParticleToggle />
      
      <main className="w-full relative z-10">
        <CinematicHero />
        <ScrollingWhoIAm />
        <TransitionDive />
        <CinematicProjects />
        <CinematicStrengths />
        <CinematicPersonal />
        <GallerySection />
      </main>
      
      <CinematicFooter />
      </div>
    </ParticleProvider>
  )
}

export default App
