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
    <section className="relative bg-[#1a1a22] text-white overflow-hidden">
      {/* Giant background text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
        <span
          className="text-white/[0.03] font-display font-bold uppercase whitespace-nowrap select-none translate-y-[30%]"
          style={{ fontSize: "28vw", letterSpacing: "-0.03em" }}
        >
          CONNECT
        </span>
      </div>

      <div className="relative z-10 px-6 py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-white/30 text-[10px] font-mono tracking-[0.3em] uppercase mb-8"
        >
          Get in touch
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="block font-display font-bold text-[12vw] uppercase leading-[0.9] tracking-tight">
            Let&apos;s{" "}
          </span>
          <span className="block font-serif italic text-[12vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
            build
          </span>
          <span className="block font-display font-bold text-[12vw] uppercase leading-[0.9] tracking-tight">
            together.
          </span>
        </motion.div>

        {/* Email CTA */}
        <motion.a
          href="mailto:shardulnandedkar05@gmail.com"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#6B6FA3] text-white text-sm font-display font-semibold tracking-wide active:scale-[0.96] transition-transform mb-14"
          style={{ boxShadow: "0 8px 32px rgba(107,111,163,0.3)" }}
        >
          shardulnandedkar05@gmail.com
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        {/* Social grid */}
        <div className="grid grid-cols-2 gap-3 mb-16">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              viewport={{ once: true }}
              className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.05] border border-white/[0.06] active:bg-white/[0.08] transition-colors"
            >
              <span className="text-white/70 text-sm font-display font-semibold">
                {s.name}
              </span>
              <span className="text-white/25 text-xs font-mono">
                {s.handle}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          viewport={{ once: true }}
          className="text-center text-white/15 text-xs font-display"
        >
          and thats all :)
        </motion.p>
      </div>
    </section>
  );
}
