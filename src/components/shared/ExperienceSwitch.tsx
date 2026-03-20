"use client";

import { useEffect } from "react";
import { useDeviceExperience } from "@/hooks/useDeviceExperience";
import { MobileHome } from "@/components/mobile/MobileHome";

export function ExperienceSwitch() {
  const experience = useDeviceExperience();

  useEffect(() => {
    if (experience === "desktop") {
      window.location.replace("/desktop.html");
    }
  }, [experience]);

  if (!experience || experience === "desktop") return null;

  return <MobileHome />;
}
