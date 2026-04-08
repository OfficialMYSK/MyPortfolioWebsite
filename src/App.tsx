import { useState, useEffect, useRef } from "react"
import { CinematicLoader } from "@/components/layout/CinematicLoader"
import { CinematicHero } from "@/components/sections/CinematicHero"
import { TransitionDive } from "@/components/sections/TransitionDive"
import { DeepNarrativeExperience } from "@/components/sections/DeepNarrativeExperience"
import { CinematicFooter } from "@/components/sections/CinematicFooter"
import { SettingsProvider } from "@/context/SettingsContext"
import { SettingsMenu } from "@/components/ui/SettingsMenu"
import { ProjectsPage } from "@/components/pages/ProjectsPage"

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home')

  const previousPage = useRef<'home' | 'projects'>('home')

  useEffect(() => {
    if (currentPage === 'home' && previousPage.current === 'projects') {
      // Returning to home from projects, send user to the footer!
      setTimeout(() => {
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'instant' });
      }, 50);
    } else if (currentPage === 'projects') {
      // We don't necessarily need to scroll to top just for projects because it's absolute, 
      // but if we do, it won't hurt. However, keeping the body where it was helps!
    } else if (currentPage === 'home' && previousPage.current === 'home') {
       window.scrollTo(0, 0); // Initial mount
    }
    previousPage.current = currentPage;
  }, [currentPage]);

  return (
    <SettingsProvider>
      {/* 
        We keep the main app mounted at all times to prevent complex WebGL/scroll 
        hooks from crashing the app upon unmount.
      */}
      <div 
        id="scroll-root" 
        className={`w-full relative bg-[#000000] text-white selection:bg-primary/30 selection:text-white ${
          currentPage === 'projects' ? 'h-screen overflow-hidden pointer-events-none' : ''
        }`}
      >
        <CinematicLoader />
        <SettingsMenu />

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

          <CinematicFooter onNavigateToProjects={() => setCurrentPage('projects')} />
      </div>

      {currentPage === 'projects' && (
        <ProjectsPage onBack={() => setCurrentPage('home')} />
      )}
    </SettingsProvider>
  )
}

export default App
