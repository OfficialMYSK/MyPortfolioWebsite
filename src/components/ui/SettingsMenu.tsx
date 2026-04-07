import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSoundEnabled, setIsSoundEnabled } = useSettings();

  const handleReset = () => {
    // Force the browser to discard its saved scroll history position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Hard jump to top
    window.scrollTo(0, 0);
    // Reload safely
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col-reverse items-start gap-4">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bio-glass flex items-center justify-center text-cyan-300 hover:text-white hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300"
      >
        <Settings className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
      </button>

      {/* Expandable Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col gap-3 min-w-[220px]"
          >
            {/* Sound Toggle */}
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="bio-glass px-4 py-3 rounded-xl flex items-center gap-3 text-cyan-100 hover:text-white hover:bg-cyan-900/30 transition-colors w-full text-left"
            >
              <div className="w-6 flex justify-center">
                {isSoundEnabled ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
              </div>
              <span className="text-sm font-medium tracking-wide">
                Sound: <span className={isSoundEnabled ? "text-cyan-300" : "text-gray-500"}>{isSoundEnabled ? 'ON' : 'OFF'}</span>
              </span>
            </button>

            {/* Reset Experience */}
            <button
              onClick={handleReset}
              className="bio-glass px-4 py-3 rounded-xl flex items-center gap-3 text-cyan-100 hover:text-white hover:bg-cyan-900/30 transition-colors w-full text-left"
            >
              <div className="w-6 flex justify-center">
                <RotateCcw className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-sm font-medium tracking-wide">Restart Experience</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
