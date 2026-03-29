import React, { createContext, useContext, useState, useEffect } from "react";

interface ParticleContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticleContext = createContext<ParticleContextType | undefined>(undefined);

export function ParticleProvider({ children }: { children: React.ReactNode }) {
  // Check localStorage for user preference, default to true for the immersive experience
  const [particlesEnabled, setParticlesEnabled] = useState(() => {
    const saved = localStorage.getItem("cinematic-particles");
    return saved !== null ? saved === "true" : true;
  });

  // Automatically save preferences directly to the browser
  useEffect(() => {
    localStorage.setItem("cinematic-particles", particlesEnabled.toString());
  }, [particlesEnabled]);

  const toggleParticles = () => setParticlesEnabled((prev) => !prev);

  return (
    <ParticleContext.Provider value={{ particlesEnabled, toggleParticles }}>
      {children}
    </ParticleContext.Provider>
  );
}

export function useParticles() {
  const context = useContext(ParticleContext);
  if (context === undefined) {
    throw new Error("useParticles must be used within a ParticleProvider");
  }
  return context;
}
