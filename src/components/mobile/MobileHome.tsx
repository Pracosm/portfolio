"use client";

import { useEffect } from "react";
import { MobileHero } from "./MobileHero";
import { FloatingGallery } from "./FloatingGallery";
import { Gallery } from "../shared/Gallery";
import { MobileAbout } from "./MobileAbout";
import { MobileContact } from "./MobileContact";

export function MobileHome() {
  useEffect(() => {
    document.body.classList.add("loaded");

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
      <MobileHero />
      <FloatingGallery />
      <div className="section-reveal"><Gallery /></div>
      <div className="section-reveal"><MobileAbout /></div>
      <div className="section-reveal"><MobileContact /></div>
    </div>
  );
}
