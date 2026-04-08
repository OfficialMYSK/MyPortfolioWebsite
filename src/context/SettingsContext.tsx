import { createContext, useContext, useState, useEffect, useRef } from 'react';

type SettingsContextType = {
  isSoundEnabled: boolean;
  setIsSoundEnabled: (enabled: boolean) => void;
  pauseMainAudio: boolean;
  setPauseMainAudio: (pause: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [pauseMainAudio, setPauseMainAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state to audio element gracefully
  useEffect(() => {
    if (!audioRef.current) return;

    if (isSoundEnabled && !pauseMainAudio) {
      audioRef.current.volume = 1.0; // 100% volume
      // A promise is returned by play(), catch handles edge cases where browser native policies block it early
      audioRef.current.play().catch(e => {
        console.warn("Audio play prevented by browser:", e);
        // Automatically revert the toggle if the browser permanently blocks the stream
        setIsSoundEnabled(false); 
      });
    } else {
      audioRef.current.pause();
    }
  }, [isSoundEnabled, pauseMainAudio]);

  return (
    <SettingsContext.Provider value={{ isSoundEnabled, setIsSoundEnabled, pauseMainAudio, setPauseMainAudio }}>
      {children}
      {/* 
        Explicitly mounting the audio tag in the DOM is infinitely more stable 
        across browsers than generating a bare 'new Audio()' object, and ensures
        the 'speaker' icon actually appears on the browser tab!
      */}
      <audio 
        ref={audioRef}
        src="/sounds/Background-Soundscape.mp3"
        loop
        preload="auto"
        className="hidden"
      />
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
