"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const skills = [
  "UX Design", "Visual Design", "Photography", "Prototyping",
  "User Research", "Wireframing", "Figma", "Multimedia",
];

export function MobileAbout() {
  return (
    <>
      {/* About — lavender block */}
      <section className="relative bg-[#6B6FA3] text-white overflow-hidden py-20 px-6">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="text-white/[0.04] font-serif italic whitespace-nowrap select-none"
            style={{ fontSize: "45vw", letterSpacing: "-0.04em" }}
          >
            about
          </span>
        </div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase mb-8"
          >
            Who I am
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="font-serif italic text-[14vw] leading-[0.85] tracking-tight mb-2"
          >
            Shardul
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="font-display font-bold text-[10vw] uppercase leading-[0.9] tracking-tight mb-10"
          >
            Nandedkar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            viewport={{ once: true }}
            className="text-white/70 text-base font-display leading-relaxed mb-4 max-w-[90%]"
          >
            A UX designer passionate about creating delightful digital experiences.
            I thrive at the intersection of intuitive design and multimedia storytelling.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            viewport={{ once: true }}
            className="text-white/40 text-sm font-display leading-relaxed mb-14"
          >
            From crafting seamless interactions to capturing moments behind the camera —
            bringing ideas to life, pixel by pixel.
          </motion.p>

          {/* Age badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/20 mb-6"
          >
            <span className="text-white/50 text-xs font-mono uppercase tracking-wider">Age</span>
            <span className="text-white text-lg font-display font-bold">19</span>
          </motion.div>
        </div>
      </section>

      {/* Skills — light block with scattered pills */}
      <section className="relative bg-[#F5F3F0] overflow-hidden py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-4"
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
          transition={{ duration: 0.5, delay: 0.1, ease }}
          viewport={{ once: true }}
          className="text-black/35 text-sm font-display leading-relaxed mb-10 max-w-[80%]"
        >
          All your design needs in one place with the assurance of highest excellence and usability.
        </motion.p>

        {/* Scattered skill pills */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 12, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? -2 : 3) }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              viewport={{ once: true }}
              className="px-5 py-2.5 rounded-full bg-white text-black/70 text-sm font-display font-medium tracking-wide"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </section>
    </>
  );
}
