"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type SiteAudioContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const SiteAudioContext = createContext<SiteAudioContextValue | null>(null);

const STORAGE_KEY = "dippa:sound-enabled";
const TIME_KEY = "dippa:audio-time";
const AUDIO_SRC = "/audio/webx-background.mp3";

export function SiteAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  // Load initial enabled state
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "0") setEnabled(false);
      else setEnabled(true);
    } catch {
      // Ignore storage failures
    }
  }, []);

  // Save enabled state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch {
      // Ignore storage failures
    }
  }, [enabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!enabled) {
      audio.pause();
      return;
    }

    let cleanedUp = false;

    const startPlayback = () => {
      if (cleanedUp) return;
      if (!audio.getAttribute("src")) audio.src = AUDIO_SRC;
      try {
        const savedTime = localStorage.getItem(TIME_KEY);
        if (savedTime) audio.currentTime = parseFloat(savedTime);
      } catch {
        // Ignore storage failures
      }
      audio.muted = false;
      audio.volume = 0.6;
      void audio.play().catch(() => {});
    };

    window.addEventListener("pointerdown", startPlayback, { once: true });
    window.addEventListener("keydown", startPlayback, { once: true });
    window.addEventListener("touchstart", startPlayback, { once: true });

    const saveInterval = setInterval(() => {
      if (audio && !audio.paused) {
        localStorage.setItem(TIME_KEY, audio.currentTime.toString());
      }
    }, 4000);

    const handleUnload = () => {
      if (audio && audio.currentTime) {
        localStorage.setItem(TIME_KEY, audio.currentTime.toString());
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      cleanedUp = true;
      clearInterval(saveInterval);
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
      window.removeEventListener("touchstart", startPlayback);
    };
  }, [enabled]);

  const value = useMemo<SiteAudioContextValue>(() => {
    return {
      enabled,
      toggle: () => setEnabled((v) => !v),
    };
  }, [enabled]);

  return (
    <SiteAudioContext.Provider value={value}>
      <audio ref={audioRef} loop preload="none" />
      {children}
    </SiteAudioContext.Provider>
  );
}

export function useSiteAudio() {
  const ctx = useContext(SiteAudioContext);
  if (!ctx) throw new Error("useSiteAudio must be used within SiteAudioProvider");
  return ctx;
}
