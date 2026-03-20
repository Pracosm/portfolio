"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/projects";

interface Props {
  project: Project;
  index: number;
}

export function MobileProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-5">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: project.color }}
        >
          <span className="text-white/20 text-[24vw] font-light">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-neutral-600 text-xs">{project.category}</span>
        <span className="w-4 h-px bg-neutral-700" />
        <span className="text-neutral-600 text-xs">{project.year}</span>
      </div>
      <h3 className="text-2xl font-light tracking-tight mb-1">
        {project.title}
      </h3>
      <p className="text-neutral-500 text-sm">{project.subtitle}</p>
    </motion.article>
  );
}
