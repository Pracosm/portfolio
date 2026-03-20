"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileAbout() {
  return (
    <section className="px-6 py-24 bg-[#F5F3F0]">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true }}
        className="text-black/25 text-[10px] font-mono tracking-[0.25em] uppercase mb-6"
      >
        About
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        viewport={{ once: true }}
        className="text-[#6B6FA3] font-serif text-[10vw] leading-[0.9] tracking-tight mb-8"
      >
        Shardul<br />Nandedkar
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        viewport={{ once: true }}
        className="text-black/55 text-lg font-display leading-relaxed mb-6"
      >
        Hi, I&apos;m Shardul — a UX designer passionate about creating delightful
        digital experiences. With a knack for blending intuitive interfaces with
        compelling visuals, I thrive at the intersection of UX design and
        multimedia storytelling.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        viewport={{ once: true }}
        className="text-black/35 text-base font-display leading-relaxed mb-12"
      >
        From crafting seamless interactions to capturing moments behind the camera,
        my journey is all about bringing ideas to life, pixel by pixel.
      </motion.p>

      <div className="space-y-6">
        {[
          { icon: "📐", title: "UX Design", desc: "Empathy-driven design that makes interactions effortless." },
          { icon: "🎨", title: "Visual Design", desc: "Creating visuals that captivate and communicate." },
          { icon: "📸", title: "Photography", desc: "Telling compelling stories through a camera lens." },
        ].map((skill, i) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease }}
            viewport={{ once: true }}
            className="flex gap-4 items-start"
          >
            <span className="text-2xl mt-0.5">{skill.icon}</span>
            <div>
              <h3 className="text-black/75 text-sm font-display font-semibold tracking-wide">
                {skill.title}
              </h3>
              <p className="text-black/35 text-sm font-display leading-relaxed mt-1">
                {skill.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
