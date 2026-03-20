"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function MobileHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const nameOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.3, 0.8], [0, -50]);

  return (
    <div ref={containerRef} className="relative h-[200svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#6B6FA3]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/hero-bg.mp4"
        />

        {/* Comets — sky area only */}
        <div className="absolute inset-x-0 top-0 h-[15%] z-[2] overflow-hidden pointer-events-none">
          <div className="comet comet-1" />
          <div className="comet comet-2" />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(15,18,34,0.55) 0%, rgba(15,18,34,0.2) 35%, transparent 60%)",
          }}
        />

        {/* Centered content */}
        <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            style={{ opacity: nameOpacity, y: nameY }}
          >
            <span
              className="block text-[11vw] font-display font-medium text-white/70 leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              this is
            </span>
            <span className="block text-[19vw] font-serif italic text-white leading-[0.85] tracking-tight">
              shardul
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
