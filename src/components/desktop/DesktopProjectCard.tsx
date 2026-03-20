"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/projects";

interface Props {
  project: Project;
  index: number;
}

export function DesktopProjectCard({ project, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-12 gap-8 items-center group cursor-pointer ${
        isEven ? "" : "direction-rtl"
      }`}
    >
      {/* Thumbnail area */}
      <div
        className={`col-span-7 relative aspect-[4/3] overflow-hidden rounded-sm ${
          isEven ? "col-start-1" : "col-start-6"
        }`}
      >
        <motion.div
          className="absolute inset-0 rounded-sm"
          style={{ backgroundColor: project.color }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-[12vw] font-light">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Info area */}
      <div
        className={`col-span-4 ${
          isEven ? "col-start-9" : "col-start-1 row-start-1"
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-neutral-600 text-sm">{project.category}</span>
          <span className="w-8 h-px bg-neutral-700" />
          <span className="text-neutral-600 text-sm">{project.year}</span>
        </div>
        <h3 className="text-4xl font-light tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-500">
          {project.title}
        </h3>
        <p className="text-neutral-500 text-lg mb-6">{project.subtitle}</p>
        <p className="text-neutral-600 text-sm leading-relaxed">
          {project.brief}
        </p>
        <motion.div
          className="mt-8 flex items-center gap-2 text-sm text-neutral-500 group-hover:text-white transition-colors duration-300"
        >
          <span>View project</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            &rarr;
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  );
}
