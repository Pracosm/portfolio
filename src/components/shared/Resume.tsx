"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function getAge() {
  return Math.floor((Date.now() - new Date(2005, 6, 12).getTime()) / 31557600000);
}

function CountUp({ target, decimals = 1, delay = 0 }: { target: number; decimals?: number; delay?: number }) {
  const count = useMotionValue(0);
  const [text, setText] = useState((0).toFixed(decimals));

  useEffect(() => {
    const unsub = count.on("change", (v) => setText(v.toFixed(decimals)));
    const timer = setTimeout(() => {
      animate(count, target, { duration: 1.5, ease: [0.22, 1, 0.36, 1] });
    }, delay);
    return () => { unsub(); clearTimeout(timer); };
  }, [count, target, decimals, delay]);

  return <>{text}</>;
}

const projects = [
  { name: "SuperPong", desc: "AI platform that adds live commentary to your table tennis games by analyzing footage in real-time.", link: "superpong.live", tags: ["AI", "UX"] },
  { name: "Olakh.live", desc: "Uses Gemini's vision model to identify architectural & design elements in photos, and pinpoint location from design cues alone.", link: "olakh.live", tags: ["AI"] },
  { name: "ArcadeDoom.live", desc: "TikTok-style scrolling mini-games platform — play mobile games with just a swipe, like scrolling through reels.", link: "arcadedoom.live", tags: ["Gaming"] },
  { name: "Disha", desc: "Real-time traffic monitoring dashboard that visualises congestion patterns and optimises signal timing.", link: null, tags: ["UX"] },
  { name: "Lost & Found", desc: "Recovery platform connecting people with lost belongings through smart tagging.", link: null, tags: ["UX"] },
];

const experience = [
  { role: "Founder & Designer", company: "Aakar Labs", period: "2024 — Present", desc: "AI-native design studio — leveraging AI for rapid iterations, quick turnaround, and getting clients online fast with beautiful designs.", current: true },
  { role: "UX Design Intern", company: "Levich.co", period: "3 months", desc: "First UX design intern at this software consultancy. Worked on user research, wireframing, and interface design for client projects.", current: false },
  { role: "Freelance Designer & Editor", company: "Independent", period: "3+ years", desc: "Thumbnail design & video editing for YouTubers (US, Australia). UI design for companies. End-to-end product design.", current: false },
];

const skills = [
  "Figma", "Framer", "UI/UX Design", "Visual Design",
  "Photography", "Video Editing", "AI-Native Design",
  "Prototyping", "User Research", "Design Systems",
];

const interests = [
  "Photography", "Badminton", "Football",
  "AI & Tech", "Geopolitics", "Debate",
];

const socials = [
  { label: "Email", value: "shardulnandedkar05@gmail.com", href: "mailto:shardulnandedkar05@gmail.com" },
  { label: "Instagram", value: "@shardul.svg", href: "https://instagram.com/shardul.svg" },
  { label: "LinkedIn", value: "shardul-nandedkar", href: "https://www.linkedin.com/in/sharduln/" },
  { label: "Behance", value: "paraco", href: "https://behance.net/paraco" },
];

const skillRotations = [-3, 2, -1, 3, -2, 1, -3, 2, -1, 3];

const sectionAnim = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(6px)" } as const,
  animate: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
  transition: { duration: 0.6, ease, delay },
});

export function Resume({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[200]"
            style={{
              background: "rgba(245,243,240,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-4 md:inset-12 z-[201] rounded-3xl overflow-y-auto overscroll-contain"
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(40px) saturate(1.3)",
              WebkitBackdropFilter: "blur(40px) saturate(1.3)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
              scrollBehavior: "smooth",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-4 right-4 float-right z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center mr-4 mt-4 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="px-6 md:px-16 py-10 md:py-16">

              {/* ─── Header ─── */}
              <motion.div className="mb-16 md:mb-20" {...sectionAnim(0.1)}>
                <p className="text-black/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-6">Resume</p>
                <h1 className="font-serif italic text-[10vw] md:text-[5vw] leading-[0.85] tracking-tight text-[#6B6FA3] mb-2">
                  Shardul
                </h1>
                <h1 className="font-display font-bold text-[7vw] md:text-[3.5vw] uppercase leading-[0.9] tracking-tight text-black/85 mb-6">
                  Nandedkar
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-black/40 text-sm font-display mt-4">
                  <span className="px-4 py-2 rounded-full bg-[#6B6FA3] text-white text-xs font-display font-medium">
                    UX Designer
                  </span>
                  <span className="hidden md:inline text-black/15">|</span>
                  <span>{getAge()}</span>
                  <span className="text-black/15">&middot;</span>
                  <span>Bangalore &amp; Mumbai</span>
                  <span className="text-black/15">&middot;</span>
                  <span>Remote</span>
                </div>
              </motion.div>

              {/* Two column layout */}
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-16 md:gap-24">
                <div>

                  {/* ─── Experience ─── */}
                  <motion.div className="mb-14" {...sectionAnim(0.2)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Experience</h2>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#6B6FA3]/15" />

                      <div className="space-y-8">
                        {experience.map((exp, i) => (
                          <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }}
                            className="relative pl-8"
                          >
                            {/* Timeline dot */}
                            <div
                              className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                              style={{
                                borderColor: exp.current ? "#6B6FA3" : "rgba(107,111,163,0.3)",
                                background: exp.current ? "#6B6FA3" : "rgba(255,255,255,0.8)",
                                boxShadow: exp.current ? "0 0 12px rgba(107,111,163,0.4)" : "none",
                              }}
                            >
                              {exp.current && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>

                            <p className="text-black/80 text-base font-display font-semibold">{exp.role}</p>
                            <p className="text-[#6B6FA3] text-sm font-display font-medium mt-0.5">
                              {exp.company} <span className="text-black/25 ml-2">{exp.period}</span>
                            </p>
                            <p className="text-black/40 text-sm font-display leading-relaxed mt-2">{exp.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* ─── Projects ─── */}
                  <motion.div className="mb-14" {...sectionAnim(0.35)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Projects</h2>
                    <div className="space-y-4">
                      {projects.map((proj, i) => (
                        <motion.div
                          key={proj.name}
                          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.5, ease, delay: 0.4 + i * 0.08 }}
                          className={`group p-5 rounded-2xl bg-white/60 border transition-all duration-300 hover:-translate-y-1 cursor-default ${
                            proj.link
                              ? "border-black/[0.04] hover:shadow-[0_8px_30px_rgba(107,111,163,0.15)] hover:border-[#6B6FA3]/20"
                              : "border-black/[0.04] hover:shadow-lg hover:shadow-black/[0.06]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-black/80 text-base font-display font-semibold">{proj.name}</h3>
                              {proj.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
                                  style={{
                                    background: tag === "AI" ? "rgba(107,111,163,0.1)" : tag === "Gaming" ? "rgba(34,197,94,0.1)" : "rgba(0,0,0,0.04)",
                                    color: tag === "AI" ? "#6B6FA3" : tag === "Gaming" ? "#16a34a" : "rgba(0,0,0,0.4)",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {proj.link && (
                              <a
                                href={`https://${proj.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#6B6FA3] text-xs font-mono shrink-0 transition-all group-hover:gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {proj.link}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                  <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </a>
                            )}
                          </div>
                          <p className="text-black/40 text-sm font-display leading-relaxed">{proj.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                </div>

                <div>

                  {/* ─── Education ─── */}
                  <motion.div className="mb-14" {...sectionAnim(0.2)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Education</h2>
                    <div className="p-6 rounded-2xl bg-[#6B6FA3] text-white">
                      <p className="font-display font-semibold text-lg">Bachelor&apos;s of Design</p>
                      <p className="text-white/60 text-sm font-display mt-1">RV University, Bangalore</p>
                      <p className="text-white/40 text-xs font-mono mt-1">3rd Year &middot; Graduating 2027</p>

                      <div className="mt-5 flex gap-4">
                        <div className="flex-1 p-3 rounded-xl bg-white/10">
                          <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">CGPA</p>
                          <p className="text-white text-4xl font-display font-bold mt-1">
                            <CountUp target={8.55} decimals={2} delay={400} />
                          </p>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-white/10">
                          <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">Last Sem</p>
                          <p className="text-white text-4xl font-display font-bold mt-1">
                            <CountUp target={9.7} decimals={1} delay={600} />
                          </p>
                        </div>
                      </div>

                      {/* Progress bar: 7.8 → 9.7 growth */}
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1.5">
                          <span>Growth</span>
                          <span>7.8 → 9.7</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                          <motion.div
                            className="absolute left-0 h-full rounded-l-full bg-white/25"
                            initial={{ width: "0%" }}
                            animate={{ width: "78%" }}
                            transition={{ duration: 1, ease, delay: 0.4 }}
                          />
                          <motion.div
                            className="absolute h-full rounded-r-full bg-white/60"
                            style={{ left: "78%" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "19%" }}
                            transition={{ duration: 0.8, ease, delay: 1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ─── Studio ─── */}
                  <motion.div className="mb-14" {...sectionAnim(0.3)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Studio</h2>
                    <div
                      className="p-6 rounded-2xl bg-[#1a1a22] text-white relative overflow-hidden"
                      style={{
                        boxShadow: "0 0 40px rgba(107,111,163,0.15), 0 8px 32px rgba(0,0,0,0.2)",
                        border: "1px solid rgba(107,111,163,0.2)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-display font-bold text-2xl tracking-tight">Aakar Labs</p>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#6B6FA3]/20 text-[#9B9FD3] border border-[#6B6FA3]/20">
                          AI-Native
                        </span>
                      </div>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-wider mt-1">Design Studio</p>
                      <p className="text-white/50 text-sm font-display leading-relaxed mt-4">
                        Leveraging AI as a tool for rapid iterations, quick turnaround, and helping clients
                        get beautiful designs online as fast as possible.
                      </p>
                    </div>
                  </motion.div>

                  {/* ─── Skills ─── */}
                  <motion.div className="mb-14" {...sectionAnim(0.4)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-6">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8, rotate: skillRotations[i] }}
                          animate={{ opacity: 1, scale: 1, rotate: skillRotations[i] }}
                          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.45 + i * 0.04 }}
                          whileHover={{ rotate: 0, y: -4, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                          className="px-5 py-2.5 rounded-full bg-white text-black/60 text-xs font-display font-medium cursor-default transition-shadow hover:shadow-lg"
                          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* ─── Interests ─── */}
                  <motion.div className="mb-14" {...sectionAnim(0.45)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-6">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 + i * 0.04 }}
                          className="px-4 py-2 rounded-full border border-black/8 text-black/45 text-xs font-display"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* ─── Contact ─── */}
                  <motion.div {...sectionAnim(0.5)}>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-6">Contact</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {socials.map((s, i) => (
                        <motion.a
                          key={s.label}
                          href={s.href}
                          target={s.label === "Email" ? undefined : "_blank"}
                          rel={s.label === "Email" ? undefined : "noopener noreferrer"}
                          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.5, ease, delay: 0.55 + i * 0.06 }}
                          whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                          className="p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-black/[0.04] transition-colors hover:bg-white/70 hover:border-[#6B6FA3]/20"
                        >
                          <p className="text-black/25 text-[10px] font-mono uppercase tracking-wider">{s.label}</p>
                          <p className="text-black/60 text-xs font-display font-medium mt-1.5 truncate">{s.value}</p>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
