import { useEffect } from "react"
import { useParticles } from "@/context/ParticleContext"

export function BioluminescentCursor() {
  const { particlesEnabled } = useParticles()

  useEffect(() => {
    if (!particlesEnabled) return; // Immediately disable heavy DOM injection

    const scrollRoot = document.getElementById("scroll-root")
    const mainContainer = document.querySelector('main')
    if (!scrollRoot || !mainContainer) return

    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Wait until user has scrolled past the Hero section
      if (scrollRoot.scrollTop < window.innerHeight * 0.9) return

      // Because we inject into <main> (which scrolls via scroll-root), 
      // we must map the exact Y coordinates relative to the scroll depth!
      const x = e.clientX
      const y = e.clientY + scrollRoot.scrollTop

      const distance = Math.sqrt((x - lastX)**2 + (y - lastY)**2)
      if (distance < 5) return // Flowing spawn threshold
      
      lastX = x
      lastY = y

      // Smooth flowing algae physics
      const particleCount = 2
      
      for(let i = 0; i < particleCount; i++) {
        const el = document.createElement('div')
        const size = Math.random() * 8 + 8 
        
        // z-[0] locks the algae into the bottom layer of the section, cleanly BEHIND typography (z-[20])
        el.className = "pointer-events-none absolute rounded-full mix-blend-screen z-[0]"
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.left = `${x}px`
        el.style.top = `${y}px`
        
        // Deep soft liquid ocean glow
        el.style.background = "rgba(100, 200, 255, 0.3)"
        el.style.boxShadow = `0 0 ${size * 3}px ${size * 2}px rgba(0, 100, 255, 0.7)`
        el.style.filter = "blur(4px)" 
        
        el.style.transform = `translate(-50%, -50%) scale(0.5)`
        el.style.opacity = (Math.random() * 0.4 + 0.6).toString()
        el.style.willChange = "transform, opacity, filter"
        
        const duration = Math.random() * 2000 + 1500
        el.style.transition = `all ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`
        
        // Append directly to the main container
        mainContainer.appendChild(el)
        void el.offsetWidth // Force reflow
        
        // Minimal drift to keep them clustered exactly where the mouse touched the "water"
        const randomX = (Math.random() - 0.5) * 15
        const randomY = (Math.random() - 0.5) * 15 + 10 // Gentle upward float

        el.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% - ${randomY}px)) scale(2.5)`
        el.style.opacity = "0"
        el.style.filter = "blur(12px)" // Fade out into haze
        
        setTimeout(() => {
          if (mainContainer.contains(el)) mainContainer.removeChild(el)
        }, duration)
      }
    }

    // Attach to scroll root
    scrollRoot.addEventListener("mousemove", handleMouseMove)
    return () => scrollRoot.removeEventListener("mousemove", handleMouseMove)
  }, [particlesEnabled])

  // We no longer render a fixed overlay. Particles are injected directly into the DOM tree of `main`.
  return null
}
