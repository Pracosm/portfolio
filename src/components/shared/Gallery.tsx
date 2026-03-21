"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface GalleryItem {
  src: string;
  tag: string;
}

const ROW_1: GalleryItem[] = [
  { src: "/gallery/1738395286393.png", tag: "Graphic Design" },
  { src: "/gallery/1efdf0168187977.644629f9b454e.png", tag: "UI Design" },
  { src: "/gallery/20240530 132952-min.png", tag: "Photography" },
  { src: "/gallery/20240922 161656.png", tag: "Photography" },
  { src: "/gallery/20241012 172544 (3).png", tag: "Photography" },
  { src: "/gallery/20241012 173204.png", tag: "Photography" },
  { src: "/gallery/460830430 877100087690129_7911353268290737687_n.png", tag: "Graphic Design" },
  { src: "/gallery/460838484 1209009680420527_6210251591662787793_n.png", tag: "Graphic Design" },
  { src: "/gallery/Gemini_Generated_Image_2tui092tui092tui 1.png", tag: "AI Art" },
  { src: "/gallery/Gemini_Generated_Image_ddixepddixepddix 1.png", tag: "AI Art" },
];

const ROW_2: GalleryItem[] = [
  { src: "/gallery/All i can think off two.png", tag: "Typography" },
  { src: "/gallery/AMALGAMATION.png", tag: "Graphic Design" },
  { src: "/gallery/Blood donation-min.png", tag: "Poster" },
  { src: "/gallery/Focus.png", tag: "Graphic Design" },
  { src: "/gallery/History.png", tag: "Graphic Design" },
  { src: "/gallery/Ideas poster.png", tag: "Poster" },
  { src: "/gallery/IMG-20250408-WA0000.png", tag: "Photography" },
  { src: "/gallery/Psychedelic type 🔮.jpg", tag: "Typography" },
  { src: "/gallery/Gemini_Generated_Image_n1oqrdn1oqrdn1oq 1.png", tag: "AI Art" },
  { src: "/gallery/Gemini_Generated_Image_t55ocut55ocut55o 1.png", tag: "AI Art" },
];

const ROW_3: GalleryItem[] = [
  { src: "/gallery/Rise poster.png", tag: "Poster" },
  { src: "/gallery/Some old photos, I never posted4th is mandatory.png", tag: "Photography" },
  { src: "/gallery/Type3.png", tag: "Typography" },
  { src: "/gallery/Video-1.png", tag: "Motion" },
  { src: "/gallery/Video.png", tag: "Motion" },
  { src: "/gallery/Weave and thread 2-min(1).png", tag: "Graphic Design" },
  { src: "/gallery/Yin yang poster-min.png", tag: "Poster" },
  { src: "/gallery/Halftone CMYK@2x 1 1.png", tag: "Graphic Design" },
  { src: "/gallery/Image Dithering@2x 1.png", tag: "Graphic Design" },
  { src: "/gallery/SuperPong Hero.png", tag: "UI Design" },
];

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-16 cursor-zoom-out"
        style={{
          background: "rgba(10,10,14,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.4, ease }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-full max-h-full flex flex-col items-center cursor-default"
        >
          <img
            src={item.src}
            alt=""
            className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.5)" }}
          />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 px-4 py-1.5 rounded-full bg-white/10 text-white/60 text-xs font-display font-medium tracking-[0.15em] uppercase"
          >
            {item.tag}
          </motion.span>
        </motion.div>

        {/* Close hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
  onItemClick,
}: {
  items: GalleryItem[];
  direction?: "left" | "right";
  speed?: number;
  onItemClick: (item: GalleryItem) => void;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-2 group/row">
      <div
        className="flex gap-4 w-max group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <motion.div
            key={`${item.src}-${i}`}
            className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer"
            style={{
              transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
            }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => onItemClick(item)}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-4">
              <span className="px-3 py-1 rounded-full bg-white/90 text-black/70 text-[10px] font-display font-semibold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {item.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const tiltRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, -3, -1]);

  return (
    <>
      <section ref={sectionRef} className="relative bg-[#EEECEA] overflow-hidden py-20 md:py-32">
        <div className="px-6 md:px-16 mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="text-black/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            Gallery
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true }}
          >
            <span className="font-display font-bold text-[9vw] md:text-[4.5vw] uppercase leading-[0.9] tracking-tight text-black/85">
              A little{" "}
            </span>
            <span className="font-serif italic text-[9vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
              magic,
            </span>
            <br />
            <span className="font-display font-bold text-[9vw] md:text-[4.5vw] uppercase leading-[0.9] tracking-tight text-black/85">
              a little{" "}
            </span>
            <span className="font-serif italic text-[9vw] md:text-[4.5vw] leading-[0.9] tracking-tight text-[#6B6FA3]">
              wizardry.
            </span>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          style={{
            rotate: tiltRotate,
            scale: 1.05,
            transformOrigin: "center center",
          }}
        >
          <MarqueeRow items={ROW_1} direction="left" speed={35} onItemClick={setLightboxItem} />
          <MarqueeRow items={ROW_2} direction="right" speed={28} onItemClick={setLightboxItem} />
          <MarqueeRow items={ROW_3} direction="left" speed={32} onItemClick={setLightboxItem} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          viewport={{ once: true }}
          className="text-center text-black/25 text-xs md:text-sm font-display mt-16 md:mt-24 px-6"
        >
          Lil bit of camera magic, lil bit of pixel-perfect wizardry!
        </motion.p>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </>
  );
}
