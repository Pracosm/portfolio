"use client";

import { useDeviceExperience } from "@/hooks/useDeviceExperience";
import { DesktopHome } from "@/components/desktop/DesktopHome";
import { MobileHome } from "@/components/mobile/MobileHome";

export function ExperienceSwitch() {
  const experience = useDeviceExperience();

  if (!experience) return null;

  return experience === "desktop" ? <DesktopHome /> : <MobileHome />;
}
