"use client";

import { useEffect } from "react";
import { DesktopHero } from "./DesktopHero";
import { ScatterStrip } from "./ScatterStrip";
import { DesktopProjects } from "./DesktopProjects";
import { Gallery } from "../shared/Gallery";
import { DesktopAbout } from "./DesktopAbout";
import { DesktopContact } from "./DesktopContact";

export function DesktopHome() {
  useEffect(() => {
    // Page load fade-in
    document.body.classList.add("loaded");

    // Section fade-in on scroll
    const sections = document.querySelectorAll<HTMLElement>(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3F0] text-black selection:bg-[#6B6FA3] selection:text-white noise-overlay">
      <DesktopHero />
      <ScatterStrip />
      <DesktopProjects />
      <div className="section-reveal"><Gallery /></div>
      <div className="section-reveal"><DesktopAbout /></div>
      <div className="section-reveal"><DesktopContact /></div>
    </div>
  );
}
