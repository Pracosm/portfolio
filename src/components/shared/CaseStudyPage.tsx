"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Navigation ── */
function NavBar({ title }: { title: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5"
      style={{
        background: "rgba(245, 243, 240, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-display font-medium text-black/50 hover:text-black transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>
      <span className="text-xs font-mono tracking-[0.3em] uppercase text-black/30">
        {title}
      </span>
      <div className="w-14" />
    </motion.nav>
  );
}

/* ── Hero ── */
function Hero({ study }: { study: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-[#F5F3F0] overflow-hidden pt-20">
      {/* Giant background title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-black/[0.03] font-serif italic whitespace-nowrap select-none"
          style={{ fontSize: "20vw", letterSpacing: "-0.04em" }}
        >
          {study.title.toLowerCase()}
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="text-black/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-8"
          >
            Case Study
          </motion.p>

          <motion.div style={{ y: titleY }} className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.1, ease }}
            >
              <span className="block font-display font-bold text-[10vw] md:text-[6vw] uppercase leading-[0.9] tracking-tight text-black/85">
                Super
              </span>
              <span className="block font-serif italic text-[12vw] md:text-[7vw] leading-[0.85] tracking-tight text-[#6B6FA3]">
                Pong
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            style={{ opacity: subtitleOpacity }}
            className="text-black/40 text-base md:text-xl font-display max-w-xl mt-8 leading-relaxed"
          >
            {study.subtitle}
          </motion.p>

          {/* Meta pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {[study.category, study.year, study.context].map((tag, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-full text-xs font-display font-medium tracking-wide text-black/50"
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease }}
            className="mt-10"
          >
            <a
              href={study.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#6B6FA3] text-white text-sm font-display font-semibold tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-transform cursor-pointer"
              style={{ boxShadow: "0 8px 40px rgba(107,111,163,0.3)" }}
            >
              Try It Live
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-black/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-black/10"
        />
      </motion.div>
    </section>
  );
}

/* ── Overview — lavender accent block ── */
function Overview({ study }: { study: CaseStudy }) {
  const items = [
    { label: "My Role", value: study.role },
    { label: "Duration", value: study.duration },
    { label: "Tools", value: study.tools.join(", ") },
    { label: "Context", value: study.context },
  ];

  return (
    <section className="relative bg-[#6B6FA3] text-white overflow-hidden">
      {/* Giant bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-white/[0.04] font-serif italic whitespace-nowrap select-none"
          style={{ fontSize: "18vw", letterSpacing: "-0.04em" }}
        >
          overview
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-40">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true }}
              className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase mb-10"
            >
              What is this
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease }}
              viewport={{ once: true }}
              className="text-white/80 text-xl md:text-2xl font-display leading-relaxed"
            >
              {study.overview}
            </motion.p>
          </div>

          <div className="pt-0 md:pt-20">
            <div className="grid grid-cols-2 gap-8">
              {items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  viewport={{ once: true }}
                >
                  <span className="block text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase mb-2">
                    {item.label}
                  </span>
                  <span className="text-sm font-display font-medium text-white/70 leading-relaxed">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The Challenge — light block ── */
function Challenge({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#F5F3F0] overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true }}
              className="text-black/25 text-xs font-mono tracking-[0.3em] uppercase mb-10"
            >
              The Challenge
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease }}
              viewport={{ once: true }}
            >
              <span className="font-display font-bold text-[8vw] md:text-[4vw] uppercase leading-[0.9] tracking-tight text-black/85">
                Why does{" "}
              </span>
              <span className="font-serif italic text-[8vw] md:text-[4vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
                this
              </span>
              <br />
              <span className="font-serif italic text-[8vw] md:text-[4vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
                matter?
              </span>
            </motion.div>
          </div>

          <div className="pt-0 md:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              viewport={{ once: true }}
              className="text-black/50 text-lg md:text-xl font-serif italic leading-relaxed mb-10 pl-6"
              style={{ borderLeft: "2px solid rgba(107,111,163,0.4)" }}
            >
              {study.problemStatement}
            </motion.p>

            <div className="space-y-6">
              {study.problemPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#6B6FA3] shrink-0" />
                  <p className="text-black/55 text-sm md:text-base font-display leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works — dark block ── */
function HowItWorks({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#1a1a22] text-white overflow-hidden" id="process">
      {/* Giant bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-white/[0.03] font-display font-bold uppercase whitespace-nowrap select-none"
          style={{ fontSize: "16vw", letterSpacing: "-0.03em" }}
        >
          PROCESS
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase mb-10"
        >
          How it works
        </motion.p>

        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="block font-display font-bold text-[8vw] md:text-[4.5vw] uppercase leading-[0.9] tracking-tight"
          >
            Three{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            viewport={{ once: true }}
            className="block font-serif italic text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]"
          >
            simple steps.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          viewport={{ once: true }}
          className="text-white/40 text-base md:text-lg font-display max-w-xl mb-16 leading-relaxed"
        >
          {study.solutionIntro}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {study.steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-8 md:p-10 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-default"
            >
              <span className="block text-[#6B6FA3] text-6xl md:text-7xl font-serif italic leading-none mb-6 opacity-40">
                {step.num}
              </span>
              <h3 className="text-lg md:text-xl font-display font-semibold tracking-tight mb-4 text-white/85">
                {step.title}
              </h3>
              <p className="text-sm text-white/40 font-display leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features — light with scattered pills style ── */
function Features({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#F5F3F0] overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
          >
            <span className="text-black/25 text-xs font-mono tracking-[0.3em] uppercase block mb-6">
              Core Features
            </span>
            <span className="font-display font-bold text-[8vw] md:text-[4.5vw] uppercase leading-[0.9] tracking-tight text-black/85">
              What it{" "}
            </span>
            <span className="font-serif italic text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
              does
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="text-black/35 text-sm font-display leading-relaxed max-w-[280px] md:text-right mt-6 md:mt-0"
          >
            Everything you need for a hands-free match. Nothing you don&apos;t.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {study.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06, type: "spring", stiffness: 220, damping: 20 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-8 md:p-10 rounded-2xl bg-white cursor-default transition-shadow hover:shadow-lg"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#6B6FA3]/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6B6FA3]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold tracking-tight text-black/80 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-black/45 font-display leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tech — EEECEA gallery-style bg ── */
function TechStack({ study }: { study: CaseStudy }) {
  const allTech = study.techStack.flatMap((s) => s.items);

  return (
    <section className="relative bg-[#EEECEA] overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="text-black/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            Under the Hood
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true }}
          >
            <span className="font-display font-bold text-[8vw] md:text-[4.5vw] uppercase leading-[0.9] tracking-tight text-black/85">
              Built on{" "}
            </span>
            <span className="font-serif italic text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
              serious
            </span>
            <br />
            <span className="font-serif italic text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
              technology.
            </span>
          </motion.div>
        </div>

        {/* Tech pills — scattered like skills section */}
        <div className="flex flex-wrap gap-4 mt-14 justify-center">
          {allTech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: (i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1) }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04, type: "spring", stiffness: 250, damping: 18 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 0, y: -4 }}
              className="px-7 py-3.5 rounded-full bg-white text-black/70 text-base font-display font-medium tracking-wide cursor-default transition-shadow hover:shadow-lg"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Grouped stacks below */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {study.techStack.map((stack, i) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              viewport={{ once: true }}
            >
              <span className="block text-[10px] font-mono tracking-[0.25em] uppercase text-[#6B6FA3] mb-4">
                {stack.category}
              </span>
              <ul className="space-y-2">
                {stack.items.map((item) => (
                  <li key={item} className="text-sm text-black/50 font-display flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#6B6FA3] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Impact — dark block ── */
function Impact({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#1a1a22] text-white overflow-hidden">
      {/* Giant bg text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
        <span
          className="text-white/[0.03] font-display font-bold uppercase whitespace-nowrap select-none translate-y-[35%]"
          style={{ fontSize: "14vw", letterSpacing: "-0.03em" }}
        >
          IMPACT
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase mb-10"
        >
          Results
        </motion.p>

        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
            className="block font-display font-bold text-[8vw] md:text-[4.5vw] uppercase leading-[0.9] tracking-tight"
          >
            The numbers{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            viewport={{ once: true }}
            className="block font-serif italic text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]"
          >
            speak.
          </motion.span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
          {study.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="block text-4xl md:text-6xl font-serif italic text-[#6B6FA3] mb-3">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-white/30 font-display tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="text-white/40 text-base md:text-xl font-display leading-relaxed max-w-2xl"
        >
          {study.conclusion}
        </motion.p>
      </div>
    </section>
  );
}

/* ── CTA — matching contact section ── */
function FinalCTA({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#F5F3F0] overflow-hidden py-24 md:py-40 px-6 md:px-16">
      {/* Giant bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-black/[0.03] font-serif italic whitespace-nowrap select-none"
          style={{ fontSize: "18vw", letterSpacing: "-0.04em" }}
        >
          try it
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-black/25 text-xs font-mono tracking-[0.3em] uppercase mb-10"
        >
          See it in action
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="block font-display font-bold text-[9vw] md:text-[5vw] uppercase leading-[0.9] tracking-tight text-black/85">
            Your camera,{" "}
          </span>
          <span className="block font-serif italic text-[9vw] md:text-[5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
            the umpire.
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          viewport={{ once: true }}
          className="text-black/35 text-sm md:text-base font-display leading-relaxed max-w-md mb-12"
        >
          Point your camera at a table tennis table and let the AI handle scoring, commentary, and everything in between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={study.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#6B6FA3] text-white text-base font-display font-semibold tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-transform cursor-pointer"
            style={{ boxShadow: "0 8px 40px rgba(107,111,163,0.3)" }}
          >
            Try SuperPong
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {study.githubUrl && (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-display font-medium tracking-wide text-black/50 hover:text-black transition-colors cursor-pointer"
              style={{ border: "1px solid rgba(0,0,0,0.1)" }}
            >
              View on GitHub
            </a>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        viewport={{ once: true }}
        className="relative z-10 text-center mt-32"
      >
        <Link
          href="/"
          className="text-black/20 text-sm font-display hover:text-black/50 transition-colors"
        >
          &larr; Back to portfolio
        </Link>
      </motion.div>
    </section>
  );
}

/* ── Main Export ── */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <div className="min-h-screen bg-[#F5F3F0] text-black selection:bg-[#6B6FA3] selection:text-white noise-overlay">
      <NavBar title={study.title} />
      <Hero study={study} />
      <Overview study={study} />
      <Challenge study={study} />
      <HowItWorks study={study} />
      <Features study={study} />
      <TechStack study={study} />
      <Impact study={study} />
      <FinalCTA study={study} />
    </div>
  );
}
