import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { HLSVideo } from "../ui/hls-video"

export function CinematicLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let current = 0
    const duration = 4000 // 4 seconds total
    const intervalTime = 30
    const increment = (100 / (duration / intervalTime))
    
    const interval = setInterval(() => {
      current += increment
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setLoading(false), 500)
      }
      setProgress(Math.floor(current))
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center z-10 w-full"
          >
            {/* Performance Tip on Left (Middle of VH) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 md:left-12 max-w-[250px] text-left z-20 pointer-events-auto"
            >
              <h3 className="text-white/70 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 border-b border-white/20 pb-2 inline-block">
                Pro Tip
              </h3>
              <p className="text-white/50 font-body text-[11px] leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Turn on <span className="text-white/80 font-medium">Performance Mode</span> (Settings menu) if on mobile or a slower device. For the full cinematic experience, please keep it disabled on devices that can handle it.
              </p>
            </motion.div>

            <div className="h-[66vh] aspect-video mb-12">
              <HLSVideo 
                src="https://stream.mux.com/P00XBGhMZClbke6XtUxmMFJe702aHKkQML7jN1AD8gi02U.m3u8"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-white/60 font-body uppercase tracking-[0.3em] text-base md:text-lg flex flex-col items-center gap-4">
              <span>Loading</span>
              <span className="font-heading italic text-6xl md:text-7xl text-white block min-w-[3ch]">{progress}%</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
