"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { name: "Instagram", handle: "@shardul.svg", href: "https://instagram.com/shardul.svg" },
  { name: "Twitter / X", handle: "@pracosm", href: "https://x.com/pracosm" },
  { name: "Behance", handle: "paraco", href: "https://behance.net/paraco" },
  { name: "LinkedIn", handle: "shardul-nandedkar", href: "https://www.linkedin.com/in/sharduln/" },
];

export function DesktopContact() {
  return (
    <section className="relative bg-[#1a1a22] text-white overflow-hidden" id="contact">
      {/* Giant background text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
        <span
          className="text-white/[0.03] font-display font-bold uppercase whitespace-nowrap select-none translate-y-[35%]"
          style={{ fontSize: "14vw", letterSpacing: "-0.03em" }}
        >
          CONNECT
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-16 py-40">
        <div className="grid grid-cols-[1.3fr_1fr] gap-20 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true }}
              className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase mb-10"
            >
              Get in touch
            </motion.p>

            <div className="mb-12">
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease }}
                viewport={{ once: true }}
                className="block font-display font-bold text-[5vw] uppercase leading-[0.9] tracking-tight"
              >
                Let&apos;s{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease }}
                viewport={{ once: true }}
                className="block font-serif italic text-[5vw] leading-[0.9] tracking-tight text-[#6B6FA3]"
              >
                build
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease }}
                viewport={{ once: true }}
                className="block font-display font-bold text-[5vw] uppercase leading-[0.9] tracking-tight"
              >
                together.
              </motion.span>
            </div>

            {/* Email CTA */}
            <motion.a
              href="mailto:shardulnandedkar05@gmail.com"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-base font-display font-semibold tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-transform cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 999,
              }}
            >
              shardulnandedkar05@gmail.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>

          {/* Social grid */}
          <div className="pt-20">
            <div className="grid grid-cols-2 gap-4">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04, y: -5, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
                  className="social-card flex flex-col gap-2 p-6 rounded-2xl bg-white/[0.05] border border-white/[0.06] hover:bg-white/[0.08] cursor-pointer group"
                  style={{ transition: "all 0.25s ease" }}
                >
                  <span className="text-white/70 text-base font-display font-semibold group-hover:text-white transition-colors">
                    {s.name}
                  </span>
                  <span className="text-white/25 text-sm font-mono group-hover:text-[#6B6FA3] transition-colors break-all">
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
          className="text-center text-white/15 text-sm font-display mt-32"
        >
          and thats all :)
        </motion.p>
      </div>
    </section>
  );
}
