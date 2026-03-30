import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function CinematicHero() {
  const [isLocked, setIsLocked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Lock logic on mount if we're at the top of the page
  useEffect(() => {
    if (window.scrollY < 50) {
      setIsLocked(true);
    }
  }, []);

  // Control the body scroll behavior based on the lock state
  useEffect(() => {
    if (isLocked) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    // Cleanup to ensure we don't accidentally permanently lock the page
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  const simulateSpacebar = () => {
    if (isAnimating || !isLocked) return;

    const event = new KeyboardEvent('keydown', {
      key: ' ',
      code: 'Space',
      keyCode: 32,
      which: 32,
      bubbles: true,
      cancelable: true,
      composed: true
    });

    window.dispatchEvent(event);

    const viewer = document.querySelector('spline-viewer');
    if (viewer) viewer.dispatchEvent(event);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Spacebar detection
      if (e.code === 'Space' && isLocked && !isAnimating) {
        setIsAnimating(true);

        // Wait exactly 5 seconds for the Spline animation to complete
        setTimeout(() => {
          setIsLocked(false);
          setIsAnimating(false);
          
          // Wait a brief moment to allow the overflow: hidden CSS to clear, then scroll down
          setTimeout(() => {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });

            // Wait 1 second for the smooth scroll to finish.
            setTimeout(() => {
              // Synchronously hide the element and reset scroll in the exact same event loop tick.
              // This guarantees the browser won't render a visual frame where the scroll is at 0
              // but the hero section still exists, eliminating the "glitch" flash.
              const heroEl = document.getElementById("cinematic-hero-section");
              if (heroEl) {
                heroEl.style.display = "none";
              }
              window.scrollTo(0, 0);
              
              // Now update React state to officially unmount it from the virtual DOM
              setIsFinished(true);
            }, 1000);

          }, 50);

        }, 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocked, isAnimating]);

  if (isFinished) {
    return null; // Entirely removes the hero section from the DOM after the full sequence
  }

  return (
    <section id="cinematic-hero-section" className="relative w-full h-screen snap-start overflow-hidden flex flex-col justify-center items-center text-center px-6 bg-[#000000]">

      {/* Spline 3D Scene */}
      <div className="absolute inset-0 z-0">
        <spline-viewer loading-anim-type="none" url="https://prod.spline.design/1LlT-W3FlyC737pP/scene.splinecode">
          <img src="data:image/png;base64,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" alt="Spline preview" style={{ width: "100%", height: "100%" }} />
        </spline-viewer>
      </div>

      {/* Bottom Gradient Transition to Black */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />


      {/* Centered Interactive Trigger */}
      <AnimatePresence>
        {isLocked && !isAnimating && !isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-8 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-white/80 text-sm tracking-[0.4em] uppercase font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                Initiate Experience
              </motion.div>

              <motion.button
                onClick={simulateSpacebar}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95, y: 8 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="group relative px-14 py-6 bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl cursor-pointer shadow-[0_0_60px_rgba(255,255,255,0.15)] overflow-hidden"
              >
                {/* Glossy highlight line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80" />

                <div className="flex flex-col items-center gap-1 relative z-10">
                  <span className="text-white font-mono text-2xl tracking-[0.6em] uppercase font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                    SPACE
                  </span>
                  <span className="text-white/60 font-mono text-[10px] tracking-[0.25em] uppercase mt-2">
                    Press key or tap
                  </span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
