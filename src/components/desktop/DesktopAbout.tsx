"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const primarySkills = [
  { name: "UX Design", level: 3 },
  { name: "Visual Design", level: 3 },
  { name: "Figma", level: 3 },
  { name: "Interaction Design", level: 2 },
  { name: "Design Systems", level: 2 },
];

const secondarySkills = [
  { name: "Photography", level: 2 },
  { name: "Prototyping", level: 2 },
  { name: "User Research", level: 2 },
  { name: "Wireframing", level: 1 },
  { name: "Multimedia", level: 1 },
];

function Dots({ filled, total = 3 }: { filled: number; total?: number }) {
  return (
    <span className="inline-flex gap-[3px] ml-2">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="inline-block w-[5px] h-[5px] rounded-full"
          style={{
            background: i < filled ? "currentColor" : "rgba(128,128,128,0.25)",
          }}
        />
      ))}
    </span>
  );
}

const WORK_THUMBS = [
  "/gallery/1738395286393.png",
  "/gallery/Focus.png",
  "/gallery/AMALGAMATION.png",
  "/gallery/Rise poster.png",
];

export function DesktopAbout() {
  return (
    <>
      {/* About — cream block */}
      <section className="relative bg-[#F5F3F0] text-[#1a1a1a] overflow-hidden" id="about">
        {/* Giant background text — reduced */}
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

          {/* Single row: photo | name+age | bio */}
          <div className="grid grid-cols-[auto_1fr_1.4fr] gap-12 items-start">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              viewport={{ once: true }}
            >
              <img
                src="/portrait.jpg"
                alt="Shardul Nandedkar"
                className="object-cover"
                style={{
                  width: 200,
                  height: 260,
                  objectPosition: "top",
                  borderRadius: 16,
                }}
              />
            </motion.div>

            {/* Name + age */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease }}
                viewport={{ once: true }}
                className="font-serif italic text-[4.5vw] leading-[0.85] tracking-tight mb-1 text-[#1a1a1a]"
              >
                Shardul
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                viewport={{ once: true }}
                className="font-display font-bold text-[3.2vw] uppercase leading-[0.9] tracking-tight text-[#1a1a1a]"
              >
                Nandedkar
              </motion.h2>

              {/* Age badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mt-6"
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
                <span className="text-white text-lg font-display font-bold">
                  {Math.floor((Date.now() - new Date(2005, 6, 12).getTime()) / 31557600000)}
                </span>
              </motion.div>
            </div>

            {/* Bio */}
            <div className="pt-2">
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
            </div>
          </div>
        </div>
      </section>

      {/* Skills — What I Bring */}
      <section className="relative overflow-hidden px-16" style={{ paddingTop: 80, paddingBottom: 48, background: "#F5F3F0", isolation: "isolate" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-[1fr_auto] gap-16 items-start">
            {/* Left — heading, subtext, pills */}
            <div>
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
                className="font-display leading-relaxed mt-4 mb-10"
                style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", maxWidth: 380 }}
              >
                All your design needs in one place with the assurance of highest excellence and usability.
              </motion.p>

              {/* Skill pills — left-aligned, wrapped */}
              <div className="flex flex-wrap gap-[10px]" style={{ maxWidth: 700 }}>
                {/* Primary — dark filled */}
                {primarySkills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.04, type: "spring", stiffness: 250, damping: 18 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.06, y: -3 }}
                    className="inline-flex items-center rounded-full font-display font-medium tracking-wide cursor-default"
                    style={{
                      background: "#1a1a1a",
                      color: "white",
                      borderRadius: 999,
                      padding: "8px 20px",
                      fontSize: 13,
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {skill.name}
                    <Dots filled={skill.level} />
                  </motion.span>
                ))}
                {/* Secondary — outlined */}
                {secondarySkills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.04, type: "spring", stiffness: 250, damping: 18 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.06, y: -3, backgroundColor: "#1a1a1a", color: "#ffffff" }}
                    className="inline-flex items-center rounded-full font-display font-medium tracking-wide cursor-default"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(0,0,0,0.2)",
                      color: "#1a1a1a",
                      borderRadius: 999,
                      padding: "8px 20px",
                      fontSize: 13,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {skill.name}
                    <Dots filled={skill.level} />
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right — 2x2 work thumbnail grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2 self-end"
            >
              {WORK_THUMBS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="object-cover"
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
