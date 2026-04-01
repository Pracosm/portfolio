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
        {/* Floating pill navbar */}
        <nav
          className="fixed z-[100] flex items-center gap-6"
          style={{
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: 999,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px 24px",
          }}
        >
          <a href="#projects" className="text-white text-[13px] font-display tracking-wide hover:opacity-80 transition-opacity">Work</a>
          <a href="#about" className="text-white text-[13px] font-display tracking-wide hover:opacity-80 transition-opacity">About</a>
          <a href="#contact" className="text-white text-[13px] font-display tracking-wide hover:opacity-80 transition-opacity">Connect</a>
        </nav>

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

        <div className="absolute inset-0 z-[4] flex flex-col items-center justify-end pb-[12vh]">
          <motion.div
            className="text-center"
            style={{ opacity: nameOpacity, y: nameY }}
          >
            <span
              className="block text-[4.5vw] font-display font-semibold text-white leading-none drop-shadow-lg"
              style={{ letterSpacing: "-0.04em", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              this is
            </span>
            <span
              className="block text-[8vw] font-serif italic text-white leading-[0.85] tracking-tight drop-shadow-lg"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
            >
              shardul
            </span>

            {/* Tagline */}
            <p
              className="mt-4 font-display"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                opacity: 0.6,
                color: "white",
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              UX Design · Photography · Visual Storytelling
            </p>

            {/* Glass pill buttons */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setResumeOpen(true)}
                className="text-white text-sm font-display font-semibold tracking-[0.15em] uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  padding: "12px 28px",
                }}
              >
                View Resume
              </button>
              <a
                href="#projects"
                className="text-white font-display font-medium tracking-[0.1em] hover:scale-105 active:scale-95 transition-all"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  fontSize: 13,
                }}
              >
                ↓ See Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Resume open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
