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
    <span className="inline-flex gap-[3px] ml-1.5">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="inline-block w-[4px] h-[4px] rounded-full"
          style={{
            background: i < filled ? "currentColor" : "rgba(128,128,128,0.25)",
          }}
        />
      ))}
    </span>
  );
}

export function MobileAbout() {
  return (
    <>
      {/* About — cream block */}
      <section className="relative bg-[#F5F3F0] text-[#1a1a1a] overflow-hidden py-16 px-6" id="about">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-serif italic whitespace-nowrap select-none"
            style={{ fontSize: "35vw", letterSpacing: "-0.04em", color: "rgba(0,0,0,0.02)" }}
          >
            about
          </span>
        </div>

        <div className="relative z-10">
          {/* HR + label */}
          <hr className="mb-3" style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.18)", width: 36 }} />
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="text-black/35 text-[10px] font-mono tracking-[0.3em] uppercase mb-6"
          >
            Who I am
          </motion.p>

          {/* Photo + name row */}
          <div className="flex items-start gap-5 mb-8">
            <motion.img
              src="/portrait.jpg"
              alt="Shardul Nandedkar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              viewport={{ once: true }}
              className="object-cover flex-shrink-0"
              style={{ width: 110, height: 140, objectPosition: "top", borderRadius: 12 }}
            />

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease }}
                viewport={{ once: true }}
                className="font-serif italic text-[12vw] leading-[0.85] tracking-tight mb-1 text-[#1a1a1a]"
              >
                Shardul
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                viewport={{ once: true }}
                className="font-display font-bold text-[8vw] uppercase leading-[0.9] tracking-tight text-[#1a1a1a]"
              >
                Nandedkar
              </motion.h2>

              {/* Age badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mt-4"
                style={{
                  background: "#1a1a1a",
                  color: "white",
                  borderRadius: 999,
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <span className="text-white/60 text-[10px] font-mono uppercase tracking-wider">Age</span>
                <span className="text-white text-base font-display font-bold">
                  {Math.floor((Date.now() - new Date(2005, 6, 12).getTime()) / 31557600000)}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            viewport={{ once: true }}
            className="text-[#1a1a1a]/70 text-base font-display leading-relaxed mb-4"
          >
            A UX designer passionate about creating delightful digital experiences.
            I thrive at the intersection of intuitive design and multimedia storytelling.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            viewport={{ once: true }}
            className="text-[#1a1a1a]/40 text-sm font-display leading-relaxed"
          >
            From crafting seamless interactions to capturing moments behind the camera —
            bringing ideas to life, pixel by pixel.
          </motion.p>
        </div>
      </section>

      {/* Skills — What I Bring */}
      <section className="relative overflow-hidden py-16 px-6" style={{ background: "#F5F3F0", isolation: "isolate" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mb-3"
        >
          <span className="font-display font-bold text-[11vw] uppercase leading-[0.9] tracking-tight text-black/85">
            What I{" "}
          </span>
          <span className="font-serif italic text-[11vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
            bring
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          viewport={{ once: true }}
          className="font-display leading-relaxed mb-8 max-w-[85%]"
          style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}
        >
          All your design needs in one place with the assurance of highest excellence and usability.
        </motion.p>

        {/* Skill pills — two tiers */}
        <div className="flex flex-wrap gap-[8px]">
          {primarySkills.map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 250, damping: 18 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full font-display font-medium tracking-wide"
              style={{
                background: "#1a1a1a",
                color: "white",
                borderRadius: 999,
                padding: "7px 16px",
                fontSize: 12,
              }}
            >
              {skill.name}
              <Dots filled={skill.level} />
            </motion.span>
          ))}
          {secondarySkills.map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.05, type: "spring", stiffness: 250, damping: 18 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full font-display font-medium tracking-wide"
              style={{
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.2)",
                color: "#1a1a1a",
                borderRadius: 999,
                padding: "7px 16px",
                fontSize: 12,
              }}
            >
              {skill.name}
              <Dots filled={skill.level} />
            </motion.span>
          ))}
        </div>
      </section>
    </>
  );
}
