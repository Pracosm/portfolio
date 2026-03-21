"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const ROW_1 = [
  "/gallery/1738395286393.png",
  "/gallery/1efdf0168187977.644629f9b454e.png",
  "/gallery/20240530 132952-min.png",
  "/gallery/20240922 161656.png",
  "/gallery/20241012 172544 (3).png",
  "/gallery/20241012 173204.png",
  "/gallery/460830430 877100087690129_7911353268290737687_n.png",
  "/gallery/460838484 1209009680420527_6210251591662787793_n.png",
];

const ROW_2 = [
  "/gallery/All i can think off two.png",
  "/gallery/AMALGAMATION.png",
  "/gallery/Blood donation-min.png",
  "/gallery/Focus.png",
  "/gallery/History.png",
  "/gallery/Ideas poster.png",
  "/gallery/IMG-20250408-WA0000.png",
  "/gallery/Psychedelic type 🔮.jpg",
];

const ROW_3 = [
  "/gallery/Rise poster.png",
  "/gallery/Some old photos, I never posted4th is mandatory.png",
  "/gallery/Type3.png",
  "/gallery/Video-1.png",
  "/gallery/Video.png",
  "/gallery/Weave and thread 2-min(1).png",
  "/gallery/Yin yang poster-min.png",
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-2xl overflow-hidden flex-shrink-0 group cursor-pointer"
            style={{
              transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="relative bg-[#EEECEA] overflow-hidden py-20 md:py-32">
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
