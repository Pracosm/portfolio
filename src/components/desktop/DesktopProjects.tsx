"use client";

import { useState, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { HalftoneBlobs } from "../shared/HalftoneBlobs";

const CarModel = lazy(() =>
  import("../mobile/CarModel").then((m) => ({ default: m.CarModel }))
);

interface ProjectItem {
  title: string;
  slug: string;
  num: string;
  model: string;
}

const PROJECTS: ProjectItem[] = [
  { title: "Disha", slug: "disha", num: "01", model: "/fairlady-z.glb" },
  { title: "Lost & Found", slug: "lost-and-found", num: "02", model: "/lost-and-found.glb" },
];

const COUNT = PROJECTS.length;
const ease = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "50%" : "-50%",
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-50%" : "50%",
    opacity: 0,
    scale: 0.9,
  }),
};

const titleVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "20%" : "-20%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 0.9,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-20%" : "20%",
    opacity: 0,
  }),
};

export function DesktopProjects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const adjusted = Math.max(0, Math.min(1, v));
    const index = Math.min(Math.floor(adjusted * COUNT), COUNT - 1);
    if (index !== active) {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    }
  });

  const current = PROJECTS[active];

  return (
    <div
      ref={containerRef}
      id="work"
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F5F3F0]">
        {/* Halftone background */}
        <HalftoneBlobs color="rgba(100, 100, 120, 0.06)" />

        {/* Project number — top left */}
        <div className="absolute top-0 left-0 right-0 z-[3] px-12 pt-10 flex items-start justify-between pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-d-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="text-black/20 text-xs font-mono tracking-[0.25em] uppercase"
            >
              {current.num} / {String(COUNT).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Giant editorial title — BEHIND model */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`title-d-${active}`}
              custom={direction}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease }}
              className="w-full flex flex-col items-center select-none"
            >
              {current.title.split(" ").length <= 2 ? (
                <span
                  className="block text-center text-[#7C8CFF] font-serif uppercase leading-[0.85] w-full px-8"
                  style={{
                    fontSize: `${Math.min(180 / current.title.length, 20)}vw`,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {current.title}
                </span>
              ) : (
                current.title.split(" ").reduce<string[][]>((acc, word) => {
                  // Split into lines of roughly equal length
                  const mid = Math.ceil(current.title.split(" ").length / 2);
                  const idx = current.title.split(" ").indexOf(word);
                  if (idx < mid) {
                    if (!acc[0]) acc[0] = [];
                    acc[0].push(word);
                  } else {
                    if (!acc[1]) acc[1] = [];
                    acc[1].push(word);
                  }
                  return acc;
                }, []).map((words, i) => {
                  const line = words.join(" ");
                  return (
                    <span
                      key={i}
                      className="block text-center text-[#7C8CFF] font-serif uppercase leading-[0.85] w-full px-8"
                      style={{
                        fontSize: `${Math.min(160 / line.length, 18)}vw`,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {line}
                    </span>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D model — center stage */}
        <div className="absolute top-[10vh] left-[5%] right-[5%] bottom-[16vh] z-[2]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`model-d-${active}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease }}
              className="w-full h-full"
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-black/10 border-t-black/30 rounded-full animate-spin" />
                  </div>
                }
              >
                <CarModel src={current.model} />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA — bottom center */}
        <div className="absolute bottom-[5vh] left-0 right-0 z-[4] flex justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.a
              key={`cta-d-${active}`}
              href={`/projects/${current.slug}`}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.15, ease }}
              className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#7C8CFF] text-white text-base font-display font-semibold tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-transform overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 8px 40px rgba(124,140,255,0.3)" }}
            >
              <span className="relative z-10">View Project</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="relative z-10 transition-transform group-hover:translate-x-1">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C8CFF] via-[#A7B0FF] to-[#7C8CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
