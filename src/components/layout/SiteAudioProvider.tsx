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

    // 1. Restore previous time if available
    try {
        const savedTime = localStorage.getItem(TIME_KEY);
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }
    } catch (e) {
        console.error("Failed to restore audio time", e);
    }

    if (!enabled) {
      audio.pause();
      return;
    }

    // Start muted immediately (browsers always allow muted autoplay)
    audio.muted = true;
    audio.volume = 0.6;
    const mutedPlay = audio.play().catch(() => {});

    // Try to unmute immediately — if browser allows, great
    const tryUnmute = async () => {
      await mutedPlay;
      try {
        audio.muted = false;
        // Some browsers throw if we try to unmute without interaction
        await audio.play();
      } catch {
        // Couldn't unmute yet — will unmute on first interaction
      }
    };

    void tryUnmute();

    // Fallback: unmute on first user interaction (click, tap, scroll, key)
    let cleanedUp = false;
    const onFirstInteraction = () => {
      if (cleanedUp) return;
      if (audio.paused) {
        audio.muted = false;
        audio.volume = 0.6;
        void audio.play().catch(() => {});
      } else {
        audio.muted = false;
      }
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    window.addEventListener("scroll", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });

    // 2. Periodically save time to persist across refresh
    const saveInterval = setInterval(() => {
        if (audio && !audio.paused) {
            localStorage.setItem(TIME_KEY, audio.currentTime.toString());
        }
    }, 1000);

    // 3. Save time on page exit
    const handleUnload = () => {
        if (audio) {
            localStorage.setItem(TIME_KEY, audio.currentTime.toString());
        }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      cleanedUp = true;
      clearInterval(saveInterval);
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
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
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />
      {children}
    </SiteAudioContext.Provider>
  );
}

export function useSiteAudio() {
  const ctx = useContext(SiteAudioContext);
  if (!ctx) throw new Error("useSiteAudio must be used within SiteAudioProvider");
  return ctx;
}
