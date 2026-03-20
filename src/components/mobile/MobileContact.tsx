"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { name: "Instagram", handle: "@shardul.svg", href: "https://instagram.com/shardul.svg" },
  { name: "Twitter / X", handle: "@pracosm", href: "https://x.com/pracosm" },
  { name: "Behance", handle: "paraco", href: "https://behance.net/paraco" },
  { name: "LinkedIn", handle: "shardul-nandedkar", href: "https://linkedin.com/in/shardul-nandedkar" },
];

export function MobileContact() {
  return (
    <section className="px-6 py-24 bg-[#F5F3F0]">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true }}
        className="text-black/25 text-[10px] font-mono tracking-[0.25em] uppercase mb-6"
      >
        Contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        viewport={{ once: true }}
        className="text-[#6B6FA3] font-serif text-[9vw] leading-[0.9] tracking-tight mb-4"
      >
        Let&apos;s build something<br />memorable together.
      </motion.h2>

      <motion.a
        href="mailto:shardulnandedkar05@gmail.com"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
        viewport={{ once: true }}
        className="inline-block text-black/60 text-base font-display border-b border-black/20 pb-1 mb-14 active:text-[#6B6FA3] active:border-[#6B6FA3] transition-colors"
      >
        shardulnandedkar05@gmail.com
      </motion.a>

      <div className="space-y-5">
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
            className="flex items-center justify-between py-3 border-b border-black/[0.06] group"
          >
            <span className="text-black/50 text-sm font-display font-medium tracking-wide">
              {s.name}
            </span>
            <span className="text-black/25 text-sm font-mono group-active:text-[#6B6FA3] transition-colors">
              {s.handle}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        viewport={{ once: true }}
        className="text-center text-black/20 text-xs font-display mt-20"
      >
        and thats all :)
      </motion.p>
    </section>
  );
}
