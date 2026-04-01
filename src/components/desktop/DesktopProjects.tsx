"use client";

import { useState, useRef, lazy, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { HalftoneBlobs } from "../shared/HalftoneBlobs";
import { projects } from "@/content/projects";

const CarModel = lazy(() =>
  import("../mobile/CarModel").then((m) => ({ default: m.CarModel }))
);

interface ProjectItem {
  title: string;
  slug: string;
  num: string;
  model: string;
  modelScale: number;
  subtitle: string;
  category: string;
  brief: string;
  externalUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    title: "Olakh",
    slug: "olakh",
    num: "01",
    model: "/polaroid-camera.glb",
    modelScale: 1.1,
    subtitle: projects[0].subtitle,
    category: projects[0].category,
    brief: projects[0].brief,
  },
  {
    title: "Super\nPong",
    slug: "superpong",
    num: "02",
    model: "/ping-pong-paddles.glb",
    modelScale: 1.4,
    subtitle: projects[1].subtitle,
    category: projects[1].category,
    brief: projects[1].brief,
    externalUrl: projects[1].externalUrl,
  },
  {
    title: "Arcade\nDoom",
    slug: "arcadedoom",
    num: "03",
    model: "/pacman-arcade.glb",
    modelScale: 1.0,
    subtitle: projects[2].subtitle,
    category: projects[2].category,
    brief: projects[2].brief,
  },
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
  const [hovered, setHovered] = useState(false);
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
  const isOdd = active % 2 === 0; // 0-indexed: 0,2 = odd project numbers (01, 03)

  const projectHref = current.externalUrl
    ? current.externalUrl
    : `/projects/${current.slug}`;

  return (
    <section id="projects">
      <div
        ref={containerRef}
        style={{ height: `${COUNT * 100}vh` }}
      >
        <motion.div
          className="sticky top-0 w-full h-screen overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ backgroundColor: hovered ? "#EDEAE6" : "#F5F3F0" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <HalftoneBlobs color="rgba(100, 100, 120, 0.05)" />

          {/* Project counter with editorial line */}
          <div className="absolute top-0 left-0 right-0 z-[3] flex items-center pt-10 pointer-events-none">
            <div className="flex-1 h-px bg-black/[0.08]" />
            <AnimatePresence mode="wait">
              <motion.span
                key={`num-d-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="px-6 font-mono"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  color: "rgba(0,0,0,0.35)",
                }}
              >
                {current.num} / {String(COUNT).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <div className="w-12" />
          </div>

          {/* Editorial title — alternating sides */}
          <div
            className={`absolute inset-0 z-[1] flex items-center pointer-events-none px-16 overflow-hidden ${
              isOdd ? "justify-start" : "justify-end"
            }`}
            style={{ paddingBottom: "10%" }}
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
                className={`flex flex-col select-none overflow-hidden ${
                  isOdd ? "items-start" : "items-end"
                }`}
                style={{ maxWidth: "50%" }}
              >
                {current.title.split("\n").map((line, i) => (
                  <span
                    key={i}
                    className={`block text-[#6B6FA3] font-serif uppercase leading-[0.88] ${
                      isOdd ? "text-left" : "text-right"
                    }`}
                    style={{
                      fontSize: `clamp(3rem, ${Math.min(90 / line.length, 13)}vw, 10rem)`,
                      letterSpacing: "-0.04em",
                      wordBreak: "break-word",
                    }}
                  >
                    {line}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3D model — opposite side from title */}
          <div
            className={`absolute top-[6vh] bottom-[12vh] z-[2] flex items-center justify-center`}
            style={{
              width: "50%",
              ...(isOdd
                ? { right: "2%", left: "auto" }
                : { left: "2%", right: "auto" }),
            }}
          >
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
                style={{
                  transform: hovered ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.4s ease",
                }}
              >
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 border-2 border-black/10 border-t-black/30 rounded-full animate-spin" />
                    </div>
                  }
                >
                  <CarModel src={current.model} scale={current.modelScale} />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom metadata strip */}
          <div className="absolute bottom-12 left-12 right-12 z-[4] flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-d-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="flex items-center justify-between w-full gap-6"
              >
                {/* Category pill */}
                <span
                  className="shrink-0 font-display uppercase tracking-[0.1em]"
                  style={{
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: 999,
                    padding: "4px 14px",
                    fontSize: 11,
                    color: "#1a1a1a",
                  }}
                >
                  {current.category}
                </span>

                {/* One-line description */}
                <p
                  className="flex-1 text-center font-display truncate"
                  style={{ fontSize: 13, color: "rgba(26,26,26,0.5)" }}
                >
                  {current.subtitle}
                </p>

                {/* View Project link */}
                <Link
                  href={projectHref}
                  target={current.externalUrl ? "_blank" : undefined}
                  rel={current.externalUrl ? "noopener noreferrer" : undefined}
                  className="group shrink-0 inline-flex items-center gap-1.5 font-display font-medium uppercase tracking-[0.12em] hover:underline"
                  style={{ fontSize: 12, color: "#1a1a1a" }}
                >
                  View Project
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
