"use client";

import { DesktopHero } from "./DesktopHero";
import { DesktopProjects } from "./DesktopProjects";

export function DesktopHome() {
  return (
    <div className="min-h-screen bg-[#F5F3F0] text-black selection:bg-[#6B6FA3] selection:text-white noise-overlay">
      <DesktopHero />
      <DesktopProjects />
    </div>
  );
}
