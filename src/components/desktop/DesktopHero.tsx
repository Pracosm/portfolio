"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Resume } from "../shared/Resume";

export function DesktopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const onScrollChange = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = progress * video.duration;
  }, []);
  useMotionValueEvent(scrollYProgress, "change", onScrollChange);

  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.15, 0.5], [0, -50]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#6B6FA3]">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/hero-bg-hd.mp4"
        />

        <div className="absolute inset-x-0 top-0 h-[15%] z-[2] overflow-hidden pointer-events-none">
          <div className="comet comet-1" />
          <div className="comet comet-2" />
        </div>

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(15,18,34,0.55) 0%, rgba(15,18,34,0.2) 35%, transparent 60%)",
          }}
        />

        <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            style={{ opacity: nameOpacity, y: nameY }}
          >
            <span
              className="block text-[4.5vw] font-display font-medium text-white/70 leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              this is
            </span>
            <span className="block text-[8vw] font-serif italic text-white leading-[0.85] tracking-tight">
              shardul
            </span>
            <button
              onClick={() => setResumeOpen(true)}
              className="mt-8 px-8 py-3 rounded-full text-white text-sm font-display font-medium tracking-[0.15em] uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 0 20px rgba(107,111,163,0.4), 0 0 60px rgba(107,111,163,0.15), inset 0 0 20px rgba(255,255,255,0.05)",
              }}
            >
              View Resume
            </button>
          </motion.div>
        </div>
      </div>

      <Resume open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
