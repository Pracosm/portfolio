"use client";

import { motion } from "framer-motion";
import { SiFigma, SiFramer, SiBlender, SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiVercel, SiClaude } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";

const ease = [0.22, 1, 0.36, 1] as const;

const tools: { name: string; color: string; Icon: IconType }[] = [
  { name: "Figma", color: "#A259FF", Icon: SiFigma },
  { name: "Framer", color: "#0055FF", Icon: SiFramer },
  { name: "Claude", color: "#D97757", Icon: SiClaude },
  { name: "Blender", color: "#EA7600", Icon: SiBlender },
  { name: "Next.js", color: "#000000", Icon: SiNextdotjs },
  { name: "React", color: "#61DAFB", Icon: SiReact },
  { name: "TypeScript", color: "#3178C6", Icon: SiTypescript },
  { name: "Tailwind", color: "#06B6D4", Icon: SiTailwindcss },
  { name: "Vercel", color: "#000000", Icon: SiVercel },
  { name: "VS Code", color: "#007ACC", Icon: VscVscode },
];

const WORK_THUMBS = [
  "/gallery/1738395286393.png",
  "/gallery/Focus.png",
  "/gallery/AMALGAMATION.png",
  "/gallery/Rise poster.png",
];

const bentoItems = [
  {
    title: "UX Design",
    description: "Interfaces that feel obvious",
    span: "col-span-2",
    bg: "#1a1a1a",
    color: "white",
  },
  {
    title: "Figma",
    description: "2+ years",
    span: "",
    bg: "white",
    color: "#1a1a1a",
  },
  {
    title: "Photography",
    description: "Capturing the moment",
    span: "",
    bg: "white",
    color: "#1a1a1a",
    image: "/gallery/20240922 161656.png",
  },
  {
    title: "Visual Design",
    description: "Pixel-perfect craft",
    span: "",
    bg: "white",
    color: "#1a1a1a",
  },
  {
    title: "Prototyping",
    description: "From idea to interaction",
    span: "",
    bg: "white",
    color: "#1a1a1a",
  },
  {
    title: "Design Systems",
    description: "Scalable foundations",
    span: "",
    bg: "#1a1a1a",
    color: "white",
  },
];

export function DesktopAbout() {
  const age = Math.floor((Date.now() - new Date(2005, 6, 12).getTime()) / 31557600000);

  return (
    <>
      {/* About — cream block */}
      <section className="relative bg-[#F5F3F0] text-[#1a1a1a] overflow-hidden" id="about">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-serif italic whitespace-nowrap select-none"
            style={{ fontSize: "15vw", letterSpacing: "-0.04em", color: "rgba(0,0,0,0.02)" }}
          >
            about
          </span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-16 py-24">
          {/* Section label */}
          <motion.hr
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 48 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="mb-4"
            style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.18)", width: 48 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="text-black/35 text-xs font-mono tracking-[0.3em] uppercase mb-10"
          >
            Who I am
          </motion.p>

          {/* Two-column: left (photo + name + pills) | right (bio + stats) */}
          <div className="grid grid-cols-[auto_1fr] gap-12 items-stretch">
            {/* Left column — photo, name, age, open to work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <img
                src="/portrait.jpg"
                alt="Shardul Nandedkar"
                className="object-cover"
                style={{
                  width: 260,
                  height: 360,
                  objectPosition: "top",
                  borderRadius: 12,
                }}
              />

              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease }}
                viewport={{ once: true }}
                className="font-serif italic text-[2.8rem] leading-[0.85] tracking-tight text-[#1a1a1a]"
              >
                Shardul
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                viewport={{ once: true }}
                className="font-display font-bold text-[2rem] uppercase leading-[0.9] tracking-tight text-[#1a1a1a] -mt-2"
              >
                Nandedkar
              </motion.h2>

              {/* Age badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 self-start"
                style={{
                  background: "#1a1a1a",
                  color: "white",
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Age</span>
                <span className="text-white text-lg font-display font-bold">{age}</span>
              </motion.div>

              {/* Open to Work pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 self-start"
                style={{
                  border: "1px solid #1a1a1a",
                  borderRadius: 999,
                  padding: "6px 16px",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  className="open-to-work-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span className="font-mono">Open to Work</span>
              </motion.div>
            </motion.div>

            {/* Right column — bio + stats */}
            <div className="pt-2 flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                viewport={{ once: true }}
                className="text-[#1a1a1a]/70 text-xl font-display leading-relaxed mb-6"
              >
                A UX designer passionate about creating delightful digital experiences.
                I thrive at the intersection of intuitive design and multimedia storytelling.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="text-[#1a1a1a]/40 text-base font-display leading-relaxed"
              >
                From crafting seamless interactions to capturing moments behind the camera —
                bringing ideas to life, pixel by pixel.
              </motion.p>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                viewport={{ once: true }}
                className="flex gap-8 mt-10 pt-8"
                style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
              >
                {[
                  { number: "2+", label: "Yrs Experience" },
                  { number: "3", label: "Case Studies" },
                  { number: `${age}`, label: "Years Old" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col" style={i > 0 ? { paddingLeft: 32, borderLeft: "1px solid rgba(0,0,0,0.08)" } : {}}>
                    <span className="text-[2rem] font-display font-bold leading-none text-[#1a1a1a]">
                      {stat.number}
                    </span>
                    <span
                      className="font-mono mt-1"
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        opacity: 0.5,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Toolkit icons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <span
                  className="font-mono block mb-4"
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    opacity: 0.35,
                  }}
                >
                  My Toolkit
                </span>
                <div className="flex flex-wrap gap-4">
                  {tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4 + i * 0.04,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2, scale: 1.15 }}
                      className="group relative"
                      style={{ color: tool.color, cursor: "default" }}
                    >
                      <tool.Icon size={22} />
                      <span
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#1a1a1a] text-white text-[9px] font-mono tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      >
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills — Bento Grid */}
      <section
        className="relative overflow-hidden px-16"
        style={{ paddingTop: 80, paddingBottom: 80, background: "#F5F3F0", isolation: "isolate", height: "auto" }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="font-display font-bold text-[5vw] uppercase leading-[0.9] tracking-tight text-black/85">
              What I{" "}
            </span>
            <span className="font-serif italic text-[5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
              bring
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="font-display leading-relaxed mb-10"
            style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", maxWidth: 380 }}
          >
            All your design needs in one place with the assurance of highest excellence and usability.
          </motion.p>

          {/* Bento Grid */}
          <div className="grid grid-cols-3 gap-4">
            {bentoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.08 * i, type: "spring", stiffness: 200, damping: 20 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
                className={`relative overflow-hidden ${item.span}`}
                style={{
                  background: item.bg,
                  color: item.color,
                  border: item.bg === "white" ? "1px solid rgba(0,0,0,0.1)" : "none",
                  borderRadius: 16,
                  padding: 24,
                  minHeight: 140,
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    style={{ borderRadius: 16 }}
                  />
                )}
                <div className="relative z-10 flex flex-col h-full justify-end">
                  <span className="font-display font-bold text-lg tracking-tight">
                    {item.title}
                  </span>
                  <span
                    className="font-display mt-1"
                    style={{
                      fontSize: 13,
                      opacity: item.bg === "white" ? 0.5 : 0.6,
                    }}
                  >
                    {item.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
