"use client";

import { MobileHero } from "./MobileHero";
import { FloatingGallery } from "./FloatingGallery";
import { Gallery } from "../shared/Gallery";
import { MobileAbout } from "./MobileAbout";
import { MobileContact } from "./MobileContact";

export function MobileHome() {
  return (
    <div className="min-h-screen bg-[#F5F3F0] text-black selection:bg-[#6B6FA3] selection:text-white noise-overlay">
      <MobileHero />
      <FloatingGallery />
      <Gallery />
      <MobileAbout />
      <MobileContact />
    </div>
  );
}
