"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { name: "Instagram", handle: "@shardul.svg", href: "https://instagram.com/shardul.svg" },
  { name: "Twitter / X", handle: "@pracosm", href: "https://x.com/pracosm" },
  { name: "Behance", handle: "paraco", href: "https://behance.net/paraco" },
  { name: "LinkedIn", handle: "shardul-nandedkar", href: "https://www.linkedin.com/in/sharduln/" },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function MobileContact() {
  return (
    <section className="relative bg-[#1a1a22] text-white overflow-hidden" id="contact">
      {/* Giant background text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden"
      >
        <span
          className="text-white/[0.03] font-display font-bold uppercase whitespace-nowrap select-none translate-y-[30%]"
          style={{ fontSize: "28vw", letterSpacing: "-0.03em" }}
        >
          CONNECT
        </span>
      </motion.div>

      <div className="relative z-10 px-6 py-20">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
          className="text-white/30 text-[10px] font-mono tracking-[0.3em] uppercase mb-8"
        >
          Get in touch
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="block font-display font-bold text-[12vw] uppercase leading-[0.9] tracking-tight"
          >
            Let&apos;s{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            viewport={{ once: true }}
            className="block font-serif italic text-[12vw] leading-[0.9] tracking-tight text-[#6B6FA3]"
          >
            build
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            viewport={{ once: true }}
            className="block font-display font-bold text-[12vw] uppercase leading-[0.9] tracking-tight"
          >
            together.
          </motion.span>
        </motion.div>

        {/* Email CTA — glass pill */}
        <motion.a
          href="mailto:shardulnandedkar05@gmail.com"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-white text-sm font-display font-semibold tracking-wide transition-transform mb-14"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 999,
          }}
        >
          shardulnandedkar05@gmail.com
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        {/* Social grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 mb-16"
        >
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.05] border border-white/[0.06] active:bg-white/[0.08] transition-colors"
            >
              <span className="text-white/70 text-sm font-display font-semibold">
                {s.name}
              </span>
              <span className="text-white/25 text-xs font-mono break-all">
                {s.handle}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          viewport={{ once: true }}
          className="text-center text-white/15 text-xs font-display"
        >
          and thats all :)
        </motion.p>
      </div>
    </section>
  );
}
