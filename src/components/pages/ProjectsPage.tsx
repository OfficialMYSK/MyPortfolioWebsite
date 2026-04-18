import { motion } from "framer-motion"
import { ArrowLeft, Smartphone } from "lucide-react"
import { useState, useEffect } from "react"
import { HLSVideo } from "@/components/ui/hls-video"
import { SettingsMenu } from "@/components/ui/SettingsMenu"
import { useSettings } from "@/context/SettingsContext"
import { usePerformanceMode } from "@/hooks/use-performance-mode"
import { useIsMobile } from "@/hooks/use-is-mobile"

// Mathematically estimated zones based on intrinsic image coordinates.
// Tip: You now have access to true 3D rotation! 
// - rotateY: turns the TV left/right (perspective)
// - rotateX: tilts the TV forward/backward
// - rotateZ: tilts the TV sideways (like a steering wheel)
export const interactiveZones = [
  { id: 'tv-1-left', left: '16%', top: '39%', width: '17%', height: '18.5%', label: 'Project 1', pdfPath: '/documents/Project Folders/TilburgProject.pdf', imagePath: '/images/main-page/section 4/experience-focused project.webp', rotateZ: '-22deg', rotateY: '30deg', rotateX: '10deg' },
  { id: 'tv-2-fern', left: '32.5%', top: '62.5%', width: '16%', height: '16%', label: 'Project 2', pdfPath: '/documents/Project Folders/TinkerImageneers.pdf', imagePath: '/images/main-page/section 6/wide shot of an experience  installation.webp', rotateZ: '-11deg', rotateY: '25deg', rotateX: '-16deg' },
  { id: 'tv-3-green', left: '44.5%', top: '51.5%', width: '6%', height: '11%', label: 'Project 3', pdfPath: '/documents/Project Folders/NFC RFID.pdf', imagePath: '/images/main-page/section 2/messy prototype.webp', rotateZ: '-5deg', rotateY: '20deg', rotateX: '-22deg' },
  { id: 'tv-4-midwhite', left: '41%', top: '33%', width: '6%', height: '9.5%', label: 'Project 4', pdfPath: '/documents/Project Folders/Discursive Worlding.pdf', imagePath: '/images/main-page/section 8/your single strongest image overall.webp', rotateZ: '2deg', rotateY: '-25deg', rotateX: '-9deg' },
  { id: 'tv-5-tilted', left: '50.75%', top: '42%', width: '7%', height: '8.5%', label: 'Project 5', pdfPath: '/documents/Project Folders/Poster.pdf', imagePath: '/images/main-page/section 7/strongest visual design Poster.webp', rotateImage: true, rotateZ: '54deg', rotateY: '5deg', rotateX: '30deg' },
  { id: 'tv-6-large-right', left: '57%', top: '50%', width: '19.5%', height: '26%', label: 'Project 6', pdfPath: '/documents/Project Folders/ArcadeBox.pdf', imagePath: '/images/main-page/section 5/Arcade Box (main visual).webp', rotateZ: '12deg', rotateY: '-38deg', rotateX: '-11deg' },
  { id: 'tv-7-testbars', left: '59%', top: '30%', width: '7%', height: '8%', label: 'Project 7', rotateZ: '10deg', rotateY: '-10deg', rotateX: '0deg' },
  { id: 'tv-8-far-right', left: '81.25%', top: '40.25%', width: '10%', height: '11.5%', label: 'Project 8', pdfPath: '/documents/Project Folders/Brand ORIGO.pdf', imagePath: '/images/main-page/section 7/strongest visual design ORIGO.webp', rotateZ: '21deg', rotateY: '7deg', rotateX: '-35deg' },
]

interface ProjectsPageProps {
  onBack: () => void
}

export function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const { setPauseMainAudio, isSoundEnabled } = useSettings()
  const isPerformanceMode = usePerformanceMode()

  useEffect(() => {
    setPauseMainAudio(true);
    return () => setPauseMainAudio(false);
  }, [setPauseMainAudio]);

  const [showRotatePrompt, setShowRotatePrompt] = useState(false)
  const isNarrowViewport = useIsMobile(850)
  const [isLatchedMobile, setIsLatchedMobile] = useState(false)

  useEffect(() => {
    // If the device is ever detected as a narrow viewport (mobile), latch it permanently to true.
    if (isNarrowViewport && !isLatchedMobile) {
      setIsLatchedMobile(true)
    }

    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileSized = window.innerWidth <= 850 || window.innerHeight <= 850;
      setShowRotatePrompt(isPortrait && isMobileSized);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, [isNarrowViewport, isLatchedMobile]);

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-[100dvh] overflow-hidden bg-black flex items-center justify-center pointer-events-auto">

      {/* Landscape Lock Overlay */}
      {showRotatePrompt && (
        <div className="absolute inset-0 z-[100000] bg-black flex flex-col items-center justify-center text-white p-6 pointer-events-auto">
          <Smartphone className="w-16 h-16 animate-pulse mb-6 rotate-90 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-heading text-center mb-4 text-white uppercase tracking-wider drop-shadow-xl [text-shadow:0_0_15px_rgba(0,255,255,0.3)]">
            Rotate Device
          </h2>
          <p className="opacity-70 text-center max-w-[320px] text-sm md:text-base leading-relaxed tracking-wide">
            This immersive gallery requires a landscape orientation to view correctly. Please turn your phone sideways.
          </p>
        </div>
      )}

      {/* Title & Hint */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none drop-shadow-2xl text-center w-full">
        <h1 className="text-white font-heading italic text-5xl md:text-6xl opacity-80 mb-3">
          Projects
        </h1>
        <p className="text-white/60 font-body text-xs md:text-sm tracking-[0.3em] uppercase">
          {isLatchedMobile ? "Tap CRT TVs to preview, tap again to view" : "Hover over the CRT TVs"}
        </p>
      </div>

      {/* 
        This wrapper uses minimums and calculated aspect ratios to simulate object-cover 
        perfectly, allowing absolute % positions to map flawlessly to the pixels of the image 
        no matter what the user's screen dimensions are.
      */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"
        style={{
          width: aspectRatio ? '100vw' : '100%',
          height: aspectRatio ? `calc(100vw / ${aspectRatio})` : '100%',
          minWidth: aspectRatio ? `calc(100vh * ${aspectRatio})` : '100%',
          minHeight: aspectRatio ? '100vh' : '100%',
          opacity: aspectRatio ? 1 : 0 // hide until we know exact dimensions
        }}
      >
        {/* Background Video */}
        <HLSVideo
          src="https://stream.mux.com/ceONaTkABKGBENbb264y02ZH4IoZsjETuKUqOeYdSip8.m3u8"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          onLoadedMetadata={(e) => setAspectRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight)}
        />

        {/* Clickable Zones */}
        {aspectRatio && interactiveZones.map((zone) => (
          <div
            key={zone.id}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
              left: zone.left,
              top: zone.top,
              width: zone.width,
              height: zone.height,
              transform: `perspective(1000px) rotateX(${zone.rotateX || '0deg'}) rotateY(${zone.rotateY || '0deg'}) rotateZ(${zone.rotateZ || '0deg'})`
            }}
          >
            <button
              className={`w-full h-full rounded-xl border-2 transition-all duration-300 cursor-pointer group flex items-center justify-center pointer-events-auto transform hover:scale-[1.02] relative overflow-hidden ${isLatchedMobile && activeZone === zone.id ? 'border-white/50 bg-black/20' : 'border-white/0 hover:border-white/50 bg-white/0'}`}
              onClick={(e) => {
                if (isLatchedMobile) {
                  if (activeZone !== zone.id) {
                    e.preventDefault()
                    setActiveZone(zone.id)
                    return
                  }
                }
                if (zone.pdfPath) {
                  window.open(zone.pdfPath, '_blank');
                }
              }}
            >
              {zone.imagePath ? (
                <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none flex items-center justify-center ${isLatchedMobile && activeZone === zone.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <img
                    src={zone.imagePath}
                    alt={zone.label}
                    className={`w-full h-full object-cover ${zone.rotateImage ? '-rotate-90 scale-150' : ''}`}
                  />
                </div>
              ) : null}
            </button>
          </div>
        ))}
      </div>

      {/* Increased Vignette Overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_80%)]" />

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="absolute top-8 left-8 md:top-12 md:left-12 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] text-white font-body text-sm group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Main
      </motion.button>

      {/* Settings Menu Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <SettingsMenu />
        </div>
      </div>

      {/* Primary Projects Audio Stream (hidden, 80% volume) */}
      <HLSVideo
        src="https://stream.mux.com/HCPXUfVqoL8i45kfsl6MzvamKGiqT3OpobtSAI8jwEw.m3u8"
        autoPlay
        loop
        muted={!isSoundEnabled}
        playsInline
        volume={0.8}
        className="hidden"
      />

      {/* Secondary Ambient Projects Audio Stream (hidden, 100% volume) */}
      {!isPerformanceMode && (
        <HLSVideo
          src="https://stream.mux.com/QzHcAGBnqTgcj6VKfuW02G94EGeMIcWHjxqPnOY601rwE.m3u8"
          autoPlay
          loop
          muted={!isSoundEnabled}
          playsInline
          volume={1.0}
          className="hidden"
        />
      )}
    </div>
  )
}
