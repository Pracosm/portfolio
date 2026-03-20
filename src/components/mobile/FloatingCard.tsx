"use client";

import { useState, useCallback, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { HalftoneBlobs } from "../shared/HalftoneBlobs";

const CarModel = lazy(() =>
  import("./CarModel").then((m) => ({ default: m.CarModel }))
);

interface ProjectItem {
  title: string;
  description: string;
  slug: string;
  num: string;
  model: string;
}

const PROJECTS: ProjectItem[] = [
  { title: "Disha", description: "A real-time traffic monitoring dashboard that visualises congestion patterns and optimises signal timing.", slug: "disha", num: "01", model: "/fairlady-z.glb" },
  { title: "Lost & Found", description: "A recovery platform that connects people with their lost belongings through smart tagging.", slug: "lost-and-found", num: "02", model: "/lost-and-found.glb" },
];

const COUNT = PROJECTS.length;
const ease = [0.22, 1, 0.36, 1] as const;

function haptic() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
}

export function FloatingCard() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const lockRef = useRef(false);
  const touchX = useRef(0);

  const sheetY = useMotionValue(0);
  const sheetOpacity = useTransform(sheetY, [-100, 0, 200], [1, 1, 0.6]);

  const go = useCallback((dir: 1 | -1) => {
    if (lockRef.current) return;
    const next = active + dir;
    if (next < 0 || next >= COUNT) return;
    lockRef.current = true;
    setActive(next);
    setExpanded(false);
    haptic();
    setTimeout(() => { lockRef.current = false; }, 500);
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (expanded) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1);
  };

  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -40) {
      setExpanded(true);
    } else if (info.offset.y > 40) {
      setExpanded(false);
    }
  };

  const current = PROJECTS[active];

  return (
    <section
      className="relative w-full h-[100svh] bg-[#EEECEA] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Subtle dark gradient behind model at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[65svh] z-[0] pointer-events-none"
        style={{ background: "linear-gradient(180deg, #1a1a22 0%, #2a2a32 60%, #EEECEA 100%)" }}
      />

      {/* Halftone on dark area */}
      <HalftoneBlobs color="rgba(255, 255, 255, 0.04)" />

      {/* Project number — top left on dark area */}
      <div className="absolute top-0 left-0 right-0 z-[3] px-5 pt-6 flex items-start justify-between pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={`num-c-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase"
          >
            {current.num} / {String(COUNT).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 3D model — fills the dark top area */}
      <div className="absolute top-[4svh] left-[5px] right-[5px] h-[55svh] z-[2]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`model-c-${active}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease }}
            className="w-full h-full"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/15 border-t-white/35 rounded-full animate-spin" />
                </div>
              }
            >
              <CarModel src={current.model} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows on dark area */}
      <div className="absolute top-[4svh] h-[55svh] left-0 right-0 z-[5] flex items-center justify-between px-2 pointer-events-none">
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:bg-white/10 transition-colors disabled:opacity-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          disabled={active === COUNT - 1}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:bg-white/10 transition-colors disabled:opacity-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Frosted glass card — overlaps model from bottom */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.15}
        onDragEnd={onSheetDragEnd}
        animate={{ y: expanded ? "-18svh" : 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        style={{ y: sheetY, opacity: sheetOpacity }}
        className="absolute bottom-0 left-0 right-0 z-[6] rounded-t-[24px] px-6 pt-4 pb-[5svh]"
        // light frosted glass
        // using style for backdrop-filter + background
        // the card sits on the light/dark boundary
      >
        <div
          className="absolute inset-0 rounded-t-[24px] -z-10"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 -4px 30px rgba(0,0,0,0.08)",
          }}
        />

        {/* Drag handle */}
        <div className="flex justify-center mb-4">
          <div className="w-8 h-1 rounded-full bg-black/10" />
        </div>

        {/* Card content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-c-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
          >
            <h3 className="text-black/85 text-2xl font-display font-semibold tracking-tight">
              {current.title}
            </h3>
            <p className="text-black/40 text-sm font-display tracking-wide mt-2 leading-relaxed">
              {current.description}
            </p>

            <a
              href={`/projects/${current.slug}`}
              className="group mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-black/90 text-white text-sm font-display font-medium tracking-wide active:scale-[0.97] transition-transform"
            >
              View Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-active:translate-x-0.5">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setExpanded(false); haptic(); }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)",
                transform: i === active ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
