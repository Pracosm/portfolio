"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const skills = [
  "UX Design", "Visual Design", "Photography", "Prototyping",
  "User Research", "Wireframing", "Figma", "Multimedia",
  "Interaction Design", "Design Systems",
];

export function DesktopAbout() {
  return (
    <>
      {/* About — lavender block */}
      <section className="relative bg-[#6B6FA3] text-white overflow-hidden" id="about">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="text-white/[0.04] font-serif italic whitespace-nowrap select-none"
            style={{ fontSize: "22vw", letterSpacing: "-0.04em" }}
          >
            about
          </span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-16 py-40">
          <div className="grid grid-cols-[1.2fr_1fr] gap-20 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, ease }}
                viewport={{ once: true }}
                className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase mb-10"
              >
                Who I am
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease }}
                viewport={{ once: true }}
                className="font-serif italic text-[6vw] leading-[0.85] tracking-tight mb-2"
              >
                Shardul
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                viewport={{ once: true }}
                className="font-display font-bold text-[4.5vw] uppercase leading-[0.9] tracking-tight"
              >
                Nandedkar
              </motion.h2>

              {/* Age badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/20 mt-10"
              >
                <span className="text-white/50 text-xs font-mono uppercase tracking-wider">Age</span>
                <span className="text-white text-lg font-display font-bold">
                  {Math.floor((Date.now() - new Date(2005, 6, 12).getTime()) / 31557600000)}
                </span>
              </motion.div>
            </div>

            <div className="pt-24">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                viewport={{ once: true }}
                className="text-white/70 text-xl font-display leading-relaxed mb-6"
              >
                A UX designer passionate about creating delightful digital experiences.
                I thrive at the intersection of intuitive design and multimedia storytelling.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="text-white/40 text-base font-display leading-relaxed"
              >
                From crafting seamless interactions to capturing moments behind the camera —
                bringing ideas to life, pixel by pixel.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills — light block */}
      <section className="relative bg-[#F5F3F0] overflow-hidden py-32 px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              viewport={{ once: true }}
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
              className="text-black/35 text-sm font-display leading-relaxed max-w-[280px] text-right"
            >
              All your design needs in one place with the assurance of highest excellence and usability.
            </motion.p>
          </div>

          {/* Scattered skill pills */}
          <div className="flex flex-wrap gap-4 mt-14 justify-center">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: (i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1) }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.04, type: "spring", stiffness: 250, damping: 18 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 0, y: -4 }}
                className="px-7 py-3.5 rounded-full bg-white text-black/70 text-base font-display font-medium tracking-wide cursor-default transition-shadow hover:shadow-lg"
                style={{
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
