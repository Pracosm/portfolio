"use client";

import { MobileHero } from "../mobile/MobileHero";
import { FloatingGallery } from "../mobile/FloatingGallery";

export function DesktopHome() {
  return (
    <div className="min-h-screen bg-[#F5F3F0] text-black selection:bg-[#6B6FA3] selection:text-white noise-overlay">
      <MobileHero />
      <FloatingGallery />
    </div>
  );
}
