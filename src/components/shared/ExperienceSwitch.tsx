"use client";

import { useDeviceExperience } from "@/hooks/useDeviceExperience";
import { MobileHome } from "@/components/mobile/MobileHome";

export function ExperienceSwitch() {
  const experience = useDeviceExperience();

  if (!experience) return null;

  // Same components for both — responsive sizing handles the rest
  return <MobileHome />;
}
