"use client";

import { useState, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { HalftoneBlobs } from "../shared/HalftoneBlobs";

const CarModel = lazy(() =>
  import("./CarModel").then((m) => ({ default: m.CarModel }))
);

interface ProjectItem {
  title: string;
  slug: string;
  num: string;
  model: string;
}

const PROJECTS: ProjectItem[] = [
  { title: "Disha", slug: "disha", num: "01", model: "/fairlady-z.glb" },
  { title: "Lost &\nFound", slug: "lost-and-found", num: "02", model: "/lost-and-found.glb" },
];

const COUNT = PROJECTS.length;
const ease = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.92,
  }),
};

const titleVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "30%" : "-30%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 0.9,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-30%" : "30%",
    opacity: 0,
  }),
};

function getTitleSize(line: string, isDesktop: boolean): string {
  if (isDesktop) {
    return `${Math.min(120 / line.length, 22)}vw`;
  }
  return `${Math.min(200 / line.length, 55)}vw`;
}

export function FloatingGallery() {
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
      style={{ height: `${COUNT * 100}svh` }}
    >
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#F5F3F0]">
        {/* Halftone background */}
        <HalftoneBlobs color="rgba(100, 100, 120, 0.08)" />

        {/* Project number — top left */}
        <div className="absolute top-0 left-0 right-0 z-[3] px-5 md:px-12 pt-6 md:pt-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="text-black/20 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase"
            >
              {current.num} / {String(COUNT).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Giant editorial title — BEHIND model, slides horizontally */}
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
          style={{ paddingBottom: "45%" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`title-${active}`}
              custom={direction}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease }}
              className="w-full flex flex-col items-center select-none"
            >
              {current.title.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block text-center text-[#6B6FA3] font-serif uppercase leading-[0.9] w-full px-3 md:px-8"
                >
                  {/* Mobile size */}
                  <span
                    className="md:hidden"
                    style={{
                      fontSize: getTitleSize(line, false),
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {line}
                  </span>
                  {/* Desktop size */}
                  <span
                    className="hidden md:inline"
                    style={{
                      fontSize: getTitleSize(line, true),
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D model — slides horizontally */}
        <div className="absolute top-[18svh] md:top-[10vh] left-[24px] md:left-[12%] right-[24px] md:right-[12%] bottom-[20svh] md:bottom-[12vh] z-[2]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`model-${active}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
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

      </div>
    </div>
  );
}
