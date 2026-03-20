"use client";

import { useState, useEffect } from "react";

export type Experience = "desktop" | "mobile";

const BREAKPOINT = 768;

export function useDeviceExperience(): Experience | null {
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const check = () => {
      setExperience(window.innerWidth >= BREAKPOINT ? "desktop" : "mobile");
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return experience;
}
