"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Ambient ocean soundscape, synthesized with the Web Audio API.
 *
 * Why synthesized instead of an MP3?
 *  - Zero download weight, loops seamlessly forever, no CSP/asset issues.
 *  - It's filtered brown noise (the "shhh" of water) shaped by slow, gently
 *    randomized swells to imitate waves rolling in and out.
 *
 * Prefer a real recording? See `useRealAudioFile` note at the bottom of this
 * file — you can drop an MP3 in /public and switch a few lines.
 *
 * UX / a11y rules honored here:
 *  - Sound is OFF by default (browsers block autoplay anyway).
 *  - Starting requires a user gesture (the toggle click provides it).
 *  - The on/off choice is persisted; on reload we wait for the first user
 *    interaction before resuming, so we never fight the autoplay policy.
 */

type SoundContextValue = {
  enabled: boolean;
  ready: boolean;
  toggle: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "ocean-sound-enabled";
const TARGET_VOLUME = 0.06; // very low & calming by default (0 = silent, 1 = loud)
const FADE_SECONDS = 2.6; // slow, gentle fade-in

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // Web Audio graph refs (created lazily on first enable).
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioScheduledSourceNode[]>([]);
  const rafRef = useRef<number | null>(null);

  /** Build the audio graph once. */
  const buildGraph = useCallback(() => {
    if (ctxRef.current) return;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();

    // Master gain — starts silent, we fade it in.
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // --- Brown noise source (2s buffer, looped) ---
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Integrate white noise -> brown noise (deep, water-like rumble).
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // --- Low-pass filter: turns hiss into muffled surf ---
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 300; // very low cutoff = deep, muffled, calming surf
    lowpass.Q.value = 0.6;

    // --- Wave swell gain, modulated over time in the RAF loop ---
    const swell = ctx.createGain();
    swell.gain.value = 0.5;

    // --- A second, brighter layer for foam/spray, quieter ---
    const highpass = ctx.createBiquadFilter();
    highpass.type = "bandpass";
    highpass.frequency.value = 1100;
    highpass.Q.value = 0.4;
    const foamGain = ctx.createGain();
    foamGain.gain.value = 0.02; // near-silent foam -> deep, calm, almost no hiss
    const foamSource = ctx.createBufferSource();
    foamSource.buffer = buffer;
    foamSource.loop = true;

    // Wire it up:
    noise.connect(lowpass);
    lowpass.connect(swell);
    swell.connect(master);

    foamSource.connect(highpass);
    highpass.connect(foamGain);
    foamGain.connect(master);

    noise.start();
    foamSource.start();

    ctxRef.current = ctx;
    masterRef.current = master;
    nodesRef.current = [noise, foamSource];

    // Animate slow, organic wave swells by modulating the swell gain and the
    // low-pass cutoff. Two out-of-phase sines + drift = never-repeating waves.
    const startedAt = ctx.currentTime;
    const tick = () => {
      const t = ctx.currentTime - startedAt;
      const wave =
        0.5 +
        0.28 * Math.sin(t * 0.11) +
        0.1 * Math.sin(t * 0.33 + 1.3);
      swell.gain.setTargetAtTime(Math.max(0.12, wave), ctx.currentTime, 0.4);
      lowpass.frequency.setTargetAtTime(
        260 + 110 * (0.5 + 0.5 * Math.sin(t * 0.09)),
        ctx.currentTime,
        0.5
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, []);

  const fadeTo = useCallback((value: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + FADE_SECONDS);
  }, []);

  const start = useCallback(async () => {
    buildGraph();
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") await ctx.resume();
    fadeTo(TARGET_VOLUME);
    setReady(true);
  }, [buildGraph, fadeTo]);

  const stop = useCallback(() => {
    fadeTo(0);
    // Suspend after the fade completes to save CPU/battery.
    const ctx = ctxRef.current;
    if (!ctx) return;
    window.setTimeout(() => {
      if (ctx.state === "running") ctx.suspend().catch(() => {});
    }, FADE_SECONDS * 1000 + 100);
  }, [fadeTo]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) void start();
      else stop();
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore private-mode storage errors */
      }
      return next;
    });
  }, [start, stop]);

  // On mount: if the user previously enabled sound, arm a one-time listener so
  // it resumes on their first interaction (respecting the autoplay policy).
  useEffect(() => {
    let saved = "0";
    try {
      saved = localStorage.getItem(STORAGE_KEY) ?? "0";
    } catch {
      /* ignore */
    }
    if (saved !== "1") return;

    const resume = () => {
      setEnabled(true);
      void start();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return cleanup;
  }, [start]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      nodesRef.current.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
      });
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, ready, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within <SoundProvider>");
  return ctx;
}
