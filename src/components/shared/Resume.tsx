"use client";

import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function getAge() {
  return Math.floor((Date.now() - new Date(2005, 6, 12).getTime()) / 31557600000);
}

const projects = [
  { name: "SuperPong", desc: "AI platform that adds live commentary to your table tennis games by analyzing footage in real-time.", link: "superpong.live" },
  { name: "Olakh.live", desc: "Uses Gemini's vision model to identify architectural & design elements in photos, and pinpoint location from design cues alone.", link: "olakh.live" },
  { name: "ArcadeDoom.live", desc: "TikTok-style scrolling mini-games platform — play mobile games with just a swipe, like scrolling through reels.", link: "arcadedoom.live" },
  { name: "Disha", desc: "Real-time traffic monitoring dashboard that visualises congestion patterns and optimises signal timing.", link: null },
  { name: "Lost & Found", desc: "Recovery platform connecting people with lost belongings through smart tagging.", link: null },
];

const experience = [
  { role: "Founder & Designer", company: "Aakar Labs", period: "2024 — Present", desc: "AI-native design studio — leveraging AI for rapid iterations, quick turnaround, and getting clients online fast with beautiful designs." },
  { role: "UX Design Intern", company: "Levich.co", period: "3 months", desc: "First UX design intern at this software consultancy. Worked on user research, wireframing, and interface design for client projects." },
  { role: "Freelance Designer & Editor", company: "Independent", period: "3+ years", desc: "Thumbnail design & video editing for YouTubers (US, Australia). UI design for companies. End-to-end product design." },
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-12 z-[201] rounded-3xl overflow-y-auto overscroll-contain"
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(40px) saturate(1.3)",
              WebkitBackdropFilter: "blur(40px) saturate(1.3)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
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

              {/* Header */}
              <div className="mb-16 md:mb-20">
                <p className="text-black/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-6">Resume</p>
                <h1 className="font-serif italic text-[10vw] md:text-[5vw] leading-[0.85] tracking-tight text-[#6B6FA3] mb-2">
                  Shardul
                </h1>
                <h1 className="font-display font-bold text-[7vw] md:text-[3.5vw] uppercase leading-[0.9] tracking-tight text-black/85 mb-6">
                  Nandedkar
                </h1>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-4 py-2 rounded-full bg-[#6B6FA3] text-white text-xs font-display font-medium">
                    UX Designer
                  </span>
                  <span className="px-4 py-2 rounded-full border border-black/10 text-black/50 text-xs font-display">
                    {getAge()} years old
                  </span>
                  <span className="px-4 py-2 rounded-full border border-black/10 text-black/50 text-xs font-display">
                    Bangalore & Mumbai
                  </span>
                  <span className="px-4 py-2 rounded-full border border-black/10 text-black/50 text-xs font-display">
                    Remote
                  </span>
                </div>
              </div>

              {/* Two column on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-16 md:gap-24">
                <div>

                  {/* Experience */}
                  <div className="mb-14">
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Experience</h2>
                    <div className="space-y-8">
                      {experience.map((exp) => (
                        <div key={exp.company} className="border-l-2 border-[#6B6FA3]/30 pl-5">
                          <p className="text-black/80 text-base font-display font-semibold">{exp.role}</p>
                          <p className="text-[#6B6FA3] text-sm font-display font-medium mt-0.5">
                            {exp.company} <span className="text-black/25 ml-2">{exp.period}</span>
                          </p>
                          <p className="text-black/40 text-sm font-display leading-relaxed mt-2">{exp.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-14">
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Projects</h2>
                    <div className="space-y-6">
                      {projects.map((proj) => (
                        <div key={proj.name} className="p-5 rounded-2xl bg-white/60 border border-black/[0.04]">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-black/80 text-base font-display font-semibold">{proj.name}</h3>
                            {proj.link && (
                              <span className="text-[#6B6FA3] text-xs font-mono">{proj.link}</span>
                            )}
                          </div>
                          <p className="text-black/40 text-sm font-display leading-relaxed">{proj.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>

                  {/* Education */}
                  <div className="mb-14">
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Education</h2>
                    <div className="p-6 rounded-2xl bg-[#6B6FA3] text-white">
                      <p className="font-display font-semibold text-lg">Bachelor&apos;s of Design</p>
                      <p className="text-white/60 text-sm font-display mt-1">RV University, Bangalore</p>
                      <p className="text-white/40 text-xs font-mono mt-1">3rd Year &middot; Graduating 2027</p>
                      <div className="mt-5 flex gap-4">
                        <div className="flex-1 p-3 rounded-xl bg-white/10">
                          <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">CGPA</p>
                          <p className="text-white text-2xl font-display font-bold mt-1">8.55</p>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-white/10">
                          <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">Last Sem</p>
                          <p className="text-white text-2xl font-display font-bold mt-1">9.7</p>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-white/10">
                          <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">Growth</p>
                          <p className="text-white text-2xl font-display font-bold mt-1">7.8→9.7</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Studio */}
                  <div className="mb-14">
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-8">Studio</h2>
                    <div className="p-6 rounded-2xl bg-[#1a1a22] text-white">
                      <p className="font-display font-bold text-xl tracking-tight">Aakar Labs</p>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-wider mt-1">AI-Native Design Studio</p>
                      <p className="text-white/50 text-sm font-display leading-relaxed mt-4">
                        Leveraging AI as a tool for rapid iterations, quick turnaround, and helping clients
                        get beautiful designs online as fast as possible.
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-14">
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-6">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s) => (
                        <span key={s} className="px-4 py-2 rounded-full bg-white text-black/60 text-xs font-display font-medium" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="mb-14">
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-6">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((s) => (
                        <span key={s} className="px-4 py-2 rounded-full border border-black/8 text-black/45 text-xs font-display">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <h2 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-black/30 mb-6">Contact</h2>
                    <div className="space-y-3">
                      <a href="mailto:shardulnandedkar05@gmail.com" className="block text-black/50 text-sm font-mono hover:text-[#6B6FA3] transition-colors">
                        shardulnandedkar05@gmail.com
                      </a>
                      <a href="https://instagram.com/shardul.svg" target="_blank" rel="noopener noreferrer" className="block text-black/50 text-sm font-mono hover:text-[#6B6FA3] transition-colors">
                        @shardul.svg
                      </a>
                      <a href="https://www.linkedin.com/in/sharduln/" target="_blank" rel="noopener noreferrer" className="block text-black/50 text-sm font-mono hover:text-[#6B6FA3] transition-colors">
                        linkedin/shardul-nandedkar
                      </a>
                      <a href="https://behance.net/paraco" target="_blank" rel="noopener noreferrer" className="block text-black/50 text-sm font-mono hover:text-[#6B6FA3] transition-colors">
                        behance/paraco
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
