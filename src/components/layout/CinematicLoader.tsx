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
