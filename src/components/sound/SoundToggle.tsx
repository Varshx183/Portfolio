"use client";

import { motion } from "framer-motion";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useSound } from "./SoundProvider";

/**
 * Navbar button that toggles the ambient ocean soundscape.
 * Shows animated "sound waves" when active. Fully labelled for screen readers.
 */
export function SoundToggle({ className = "" }: { className?: string }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn ocean sound off" : "Turn ocean sound on"}
      title={enabled ? "Ocean sound: on" : "Ocean sound: off"}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border bg-surface-2/70 transition-colors hover:bg-surface-2 ${
        enabled ? "text-gold" : "text-ink-soft"
      } ${className}`}
    >
      {enabled ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}

      {/* Subtle pulsing ring while playing */}
      {enabled && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-gold/50"
          initial={{ opacity: 0.6, scale: 0.85 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          aria-hidden
        />
      )}
    </button>
  );
}
