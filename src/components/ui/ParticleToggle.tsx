import { Sparkles } from "lucide-react";
import { useParticles } from "@/context/ParticleContext";
import { motion } from "framer-motion";

export function ParticleToggle() {
  const { particlesEnabled, toggleParticles } = useParticles();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      onClick={toggleParticles}
      className={`fixed bottom-6 right-6 z-[100] p-3 rounded-full flex flex-col items-center justify-center transition-all duration-300 bio-glass backdrop-blur-md cursor-pointer ${
        particlesEnabled 
          ? "text-[#a0ffcc] shadow-[0_0_15px_rgba(0,255,128,0.2)] border-white/10" 
          : "text-white/40 shadow-none border-white/5 saturate-0"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={particlesEnabled ? "Disable Particle Effects (Boost Performance)" : "Enable Particle Effects (Immersive Mode)"}
    >
      <Sparkles size={22} className={particlesEnabled ? "animate-pulse" : ""} />
    </motion.button>
  );
}
