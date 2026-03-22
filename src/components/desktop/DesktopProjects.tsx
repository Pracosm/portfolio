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
  { title: "Olakh", slug: "olakh", num: "01", model: "/polaroid-camera.glb" },
  { title: "Super\nPong", slug: "superpong", num: "02", model: "/polaroid-camera.glb" },
  { title: "Arcade\nDoom", slug: "arcadedoom", num: "03", model: "/polaroid-camera.glb" },
];

const COUNT = PROJECTS.length;
const ease = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "40%" : "-40%",
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-40%" : "40%",
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
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F5F3F0]">
        {/* Halftone background — smaller dots for desktop */}
        <HalftoneBlobs color="rgba(100, 100, 120, 0.05)" />

        {/* Project number */}
        <div className="absolute top-0 left-0 right-0 z-[3] px-12 pt-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-d-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="text-black/18 text-xs font-mono tracking-[0.25em] uppercase"
            >
              {current.num} / {String(COUNT).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Editorial title — sized for desktop */}
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
          style={{ paddingBottom: "0" }}
        >
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
              {current.title.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block text-center text-[#6B6FA3] font-serif uppercase leading-[0.88] w-full px-12"
                  style={{
                    fontSize: `${Math.min(90 / line.length, 18)}vw`,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {line}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D model */}
        <div className="absolute top-[8vh] left-[18%] right-[18%] bottom-[10vh] z-[2]">
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
      </div>
    </div>
  );
}
