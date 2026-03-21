"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Resume } from "../shared/Resume";

export function MobileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.15, 0.8], [0, -50]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
  const btnOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const btnY = useTransform(scrollYProgress, [0.1, 0.25], [20, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={containerRef} className="relative h-[200svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#6B6FA3]">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/hero-bg.mp4"
          style={{ scale: videoScale }}
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

        <div className="absolute inset-0 z-[4] flex flex-col items-center justify-end pb-[12svh]">
          <motion.div
            className="text-center"
            style={{ opacity: nameOpacity, y: nameY, scale: nameScale }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[11vw] font-display font-semibold text-white leading-none drop-shadow-lg"
              style={{ letterSpacing: "-0.04em", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              this is
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[19vw] font-serif italic text-white leading-[0.85] tracking-tight drop-shadow-lg"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
            >
              shardul
            </motion.span>
          </motion.div>
          <motion.button
            onClick={() => setResumeOpen(true)}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-2.5 rounded-full text-white text-sm font-display font-semibold tracking-[0.15em] uppercase transition-all"
            style={{
              opacity: btnOpacity as unknown as React.CSSProperties["opacity"],
              y: btnY,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 0 24px rgba(107,111,163,0.5), 0 0 60px rgba(107,111,163,0.2), inset 0 0 20px rgba(255,255,255,0.08)",
            }}
          >
            View Resume
          </motion.button>
        </div>
      </div>

      <Resume open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
