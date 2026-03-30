import { useEffect } from "react"
import { useParticles } from "@/context/ParticleContext"

export function BioluminescentCursor() {
  const { particlesEnabled } = useParticles()

  useEffect(() => {
    if (!particlesEnabled) return; // Immediately disable heavy DOM injection

    const mainContainer = document.querySelector('main')
    if (!mainContainer) return

    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Wait until user has scrolled past the Hero section (or if Hero is removed)
      const hero = document.getElementById("cinematic-hero-section");
      if (hero && hero.style.display !== "none" && window.scrollY < window.innerHeight * 0.9) {
        return;
      }

      // Calculate coordinates relative to mainContainer
      const mainRect = mainContainer.getBoundingClientRect();
      const x = e.clientX - mainRect.left;
      const y = e.clientY - mainRect.top;

      const dx = x - lastX
      const dy = y - lastY
      const distance = Math.sqrt(dx*dx + dy*dy)
      if (distance < 5) return // Flowing spawn threshold
      
      lastX = x
      lastY = y

      // Physics: real bioluminescence flashes brightly on disturbance then fades.
      // 1. Create a diffuse base "glow cloud" for ambient microscopic flashes
      const cloud = document.createElement('div')
      const cloudSize = Math.random() * 20 + 30 + (distance * 0.3) // Expand with speed
      
      cloud.className = "pointer-events-none absolute rounded-full mix-blend-screen z-[10]"
      cloud.style.width = `${cloudSize}px`
      cloud.style.height = `${cloudSize}px`
      cloud.style.left = `${x}px`
      cloud.style.top = `${y}px`
      cloud.style.background = "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 150, 255, 0.05) 50%, rgba(0,0,0,0) 100%)"
      cloud.style.transform = `translate(-50%, -50%) scale(0.8)`
      cloud.style.opacity = Math.min(0.3 + (distance * 0.01), 0.6).toString()
      cloud.style.willChange = "transform, opacity"
      
      const cloudDuration = Math.random() * 1000 + 800
      cloud.style.transition = `all ${cloudDuration}ms cubic-bezier(0.25, 1, 0.5, 1)` // Snappy fade
      
      mainContainer.appendChild(cloud)
      
      // 2. Create tiny individual bright specks (dinoflagellates)
      const speckCount = Math.floor(Math.random() * 4) + 3 // 3-6 specks per move (increased from 2-4)
      
      for(let i = 0; i < speckCount; i++) {
        const speck = document.createElement('div')
        const size = (Math.random() * 2 + 1.5) * 1.6 // Slightly increased size (~2.4-5.6px)
        
        speck.className = "pointer-events-none absolute rounded-full mix-blend-screen z-[10]"
        speck.style.width = `${size}px`
        speck.style.height = `${size}px`
        speck.style.left = `${x}px`
        speck.style.top = `${y}px`
        
        // Randomly pick electric cyan/blue shades
        const colors = [
          "rgba(0, 255, 255, 0.9)",
          "rgba(0, 220, 255, 0.8)",
          "rgba(0, 180, 255, 0.8)"
        ]
        // Parse the color string for the box shadow replacement trick
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        speck.style.background = color
        speck.style.boxShadow = `0 0 ${size * 4}px ${size * 2}px ${color.replace(/[\d.]+\)$/, '0.6)')}`
        
        speck.style.transform = `translate(-50%, -50%)`
        speck.style.opacity = (Math.random() * 0.4 + 0.6).toString()
        speck.style.willChange = "transform, opacity"
        
        const speckDuration = Math.random() * 1500 + 1000
        speck.style.transition = `all ${speckDuration}ms cubic-bezier(0.1, 0.9, 0.2, 1)`
        
        mainContainer.appendChild(speck)
        
        // Force reflow for animation
        void speck.offsetWidth
        
        // Let the specks drift randomly away from the wake
        const spreadX = dx * -0.2 + (Math.random() - 0.5) * 40
        const spreadY = dy * -0.2 + (Math.random() - 0.5) * 40
        
        speck.style.transform = `translate(calc(-50% + ${spreadX}px), calc(-50% + ${spreadY}px)) scale(0.1)`
        speck.style.opacity = "0"
        
        setTimeout(() => {
          if (mainContainer.contains(speck)) mainContainer.removeChild(speck)
        }, speckDuration)
      }
      
      // Force reflow for cloud animation
      void cloud.offsetWidth
      cloud.style.transform = `translate(-50%, -50%) scale(2)`
      cloud.style.opacity = "0"
      
      setTimeout(() => {
        if (mainContainer.contains(cloud)) mainContainer.removeChild(cloud)
      }, cloudDuration)
    }

    // Attach to window instead of scroll root to ensure we capture all mouse movement
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [particlesEnabled])

  // We no longer render a fixed overlay. Particles are injected directly into the DOM tree of `main`.
  return null
}
