"use client";

import { useState, useCallback, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HalftoneBlobs } from "../shared/HalftoneBlobs";

const CarModel = lazy(() =>
  import("./CarModel").then((m) => ({ default: m.CarModel }))
);

interface ProjectItem {
  title: string;
  tagline: string;
  slug: string;
  num: string;
  model: string;
}

const PROJECTS: ProjectItem[] = [
  { title: "Olakh", tagline: "AI Location Identifier", slug: "olakh", num: "01", model: "/polaroid-camera.glb" },
  { title: "SuperPong", tagline: "AI Commentary Platform", slug: "superpong", num: "02", model: "/ping-pong-paddles.glb" },
  { title: "ArcadeDoom", tagline: "Mobile Mini-Games", slug: "arcadedoom", num: "03", model: "/pacman-arcade.glb" },
];

const COUNT = PROJECTS.length;
const ease = [0.22, 1, 0.36, 1] as const;

function haptic() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
}

export function SpotlightStage() {
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);
  const touchX = useRef(0);

  const go = useCallback((dir: 1 | -1) => {
    if (lockRef.current) return;
    const next = active + dir;
    if (next < 0 || next >= COUNT) return;
    lockRef.current = true;
    setActive(next);
    haptic();
    setTimeout(() => { lockRef.current = false; }, 500);
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1);
  };

  const current = PROJECTS[active];

  return (
    <section
      className="relative w-full h-[100svh] bg-[#FAFAF8] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Radial glow behind model */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full pointer-events-none z-[0]"
        style={{ background: "radial-gradient(circle, rgba(124,140,255,0.12) 0%, transparent 70%)" }}
      />

      {/* Halftone texture */}
      <HalftoneBlobs color="rgba(100, 100, 120, 0.05)" />

      {/* Top: project name + tagline */}
      <div className="absolute top-0 left-0 right-0 z-[3] pt-8 px-5 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={`num-a-${active}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="text-black/20 text-[10px] font-mono tracking-[0.3em] uppercase mb-4"
          >
            {current.num} / {String(COUNT).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-a-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease }}
            className="text-black/85 text-[26px] font-display font-semibold tracking-tight text-center"
          >
            {current.title}
          </motion.h2>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`tag-a-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, delay: 0.05, ease }}
            className="text-black/35 text-sm font-display tracking-wide mt-1"
          >
            {current.tagline}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 3D model — large, centered */}
      <div className="absolute top-[15svh] left-[5px] right-[5px] bottom-[18svh] z-[2]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`model-a-${active}`}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.6, ease }}
            className="w-full h-full"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-black/10 border-t-black/30 rounded-full animate-spin" />
                </div>
              }
            >
              <CarModel src={current.model} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <div className="absolute top-[15svh] bottom-[18svh] left-0 right-0 z-[5] flex items-center justify-between px-2 pointer-events-none">
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/[0.04] active:bg-black/[0.08] transition-colors disabled:opacity-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          disabled={active === COUNT - 1}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/[0.04] active:bg-black/[0.08] transition-colors disabled:opacity-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom: CTA + dots */}
      <div className="absolute bottom-[4svh] left-0 right-0 z-[4] flex flex-col items-center px-5">
        <AnimatePresence mode="wait">
          <motion.a
            key={`cta-a-${active}`}
            href={`/projects/${current.slug}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-black/90 text-white text-sm font-display font-medium tracking-wide active:scale-[0.97] transition-transform"
            style={{ maxWidth: "calc(100vw - 40px)" }}
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-active:translate-x-0.5">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </AnimatePresence>

        <div className="flex gap-2 mt-4">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); haptic(); }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)",
                transform: i === active ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
