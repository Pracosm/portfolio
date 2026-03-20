"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Replace these with real images once available in /public/gallery/
const ROW_1 = [
  { src: "", label: "Project Alpha", color: "#6B6FA3" },
  { src: "", label: "Disha UI", color: "#8B6F7A" },
  { src: "", label: "Brand Identity", color: "#6F8B6B" },
  { src: "", label: "Lost & Found", color: "#8B7A6B" },
  { src: "", label: "Dashboard", color: "#6B7F8B" },
  { src: "", label: "Mobile App", color: "#7A6B8B" },
];

const ROW_2 = [
  { src: "", label: "Photography", color: "#8B6B6B" },
  { src: "", label: "Social Media", color: "#6B8B7A" },
  { src: "", label: "Campaign", color: "#7A8B6B" },
  { src: "", label: "Typography", color: "#6B6B8B" },
  { src: "", label: "Illustration", color: "#8B7A6F" },
  { src: "", label: "Packaging", color: "#6F7A8B" },
];

const ROW_3 = [
  { src: "", label: "Poster Design", color: "#7A6F8B" },
  { src: "", label: "Web Design", color: "#6B8B6F" },
  { src: "", label: "Motion GFX", color: "#8B6F6B" },
  { src: "", label: "Editorial", color: "#6F8B8B" },
  { src: "", label: "Rebranding", color: "#8B8B6B" },
  { src: "", label: "3D Art", color: "#6B7A7A" },
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: typeof ROW_1;
  direction?: "left" | "right";
  speed?: number;
}) {
  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="relative w-[260px] h-[180px] md:w-[340px] md:h-[230px] rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer"
            style={{
              transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
            }}
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}88 100%)`,
                }}
              />
            )}
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
              <span className="text-white text-sm font-display font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="relative bg-[#EEECEA] overflow-hidden py-20 md:py-32">
      {/* Header */}
      <div className="px-6 md:px-16 mb-12 md:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-black/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-6"
        >
          Gallery
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
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

      {/* Tilted marquee container */}
      <div
        className="relative"
        style={{
          transform: "rotate(-3deg) scale(1.05)",
          transformOrigin: "center center",
        }}
      >
        <MarqueeRow items={ROW_1} direction="left" speed={35} />
        <MarqueeRow items={ROW_2} direction="right" speed={28} />
        <MarqueeRow items={ROW_3} direction="left" speed={32} />
      </div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        viewport={{ once: true }}
        className="text-center text-black/25 text-xs md:text-sm font-display mt-16 md:mt-24 px-6"
      >
        Lil bit of camera magic, lil bit of pixel-perfect wizardry!
      </motion.p>
    </section>
  );
}
