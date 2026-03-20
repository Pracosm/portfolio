"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { name: "Instagram", handle: "@shardul.svg", href: "https://instagram.com/shardul.svg" },
  { name: "Twitter / X", handle: "@pracosm", href: "https://x.com/pracosm" },
  { name: "Behance", handle: "paraco", href: "https://behance.net/paraco" },
  { name: "LinkedIn", handle: "shardul-nandedkar", href: "https://linkedin.com/in/shardul-nandedkar" },
];

export function DesktopContact() {
  return (
    <section className="px-16 py-40 bg-[#F5F3F0]" id="contact">
      <div className="grid grid-cols-[1fr_1.2fr] gap-24 max-w-[1400px] mx-auto">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="text-black/25 text-xs font-mono tracking-[0.25em] uppercase mb-8"
          >
            Contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="text-[#6B6FA3] font-serif text-[3.5vw] leading-[0.95] tracking-tight"
          >
            Let&apos;s build<br />something<br />memorable.
          </motion.h2>

          <motion.a
            href="mailto:shardulnandedkar05@gmail.com"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            viewport={{ once: true }}
            className="inline-block text-black/60 text-lg font-display border-b border-black/20 pb-1 mt-10 hover:text-[#6B6FA3] hover:border-[#6B6FA3] transition-colors duration-300"
          >
            shardulnandedkar05@gmail.com
          </motion.a>
        </div>

        <div className="pt-16">
          <div className="space-y-0">
            {socials.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease }}
                viewport={{ once: true }}
                className="flex items-center justify-between py-5 border-b border-black/[0.06] group cursor-pointer"
              >
                <span className="text-black/50 text-base font-display font-medium tracking-wide group-hover:text-black/80 transition-colors duration-300">
                  {s.name}
                </span>
                <span className="text-black/25 text-sm font-mono group-hover:text-[#6B6FA3] transition-colors duration-300">
                  {s.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        viewport={{ once: true }}
        className="text-center text-black/20 text-sm font-display mt-32"
      >
        and thats all :)
      </motion.p>
    </section>
  );
}
