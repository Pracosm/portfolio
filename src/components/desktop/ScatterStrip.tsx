"use client";

const SCATTER_IMAGES = [
  { src: "/gallery/1738395286393.png", top: "5%", left: "2%", rotate: -6, width: 130, opacity: 0.82, duration: 5.2, delay: 0 },
  { src: "/gallery/20240530 132952-min.png", top: "30%", left: "8%", rotate: 4, width: 110, opacity: 0.75, duration: 6.1, delay: 0.4 },
  { src: "/gallery/20240922 161656.png", top: "55%", left: "3%", rotate: -3, width: 140, opacity: 0.88, duration: 4.8, delay: 1.2 },
  { src: "/gallery/460830430 877100087690129_7911353268290737687_n.png", top: "10%", left: "18%", rotate: 7, width: 120, opacity: 0.78, duration: 5.6, delay: 0.8 },
  { src: "/gallery/Gemini_Generated_Image_2tui092tui092tui 1.png", top: "50%", left: "22%", rotate: -5, width: 150, opacity: 0.85, duration: 6.5, delay: 1.6 },
  { src: "/gallery/All i can think off two.png", top: "8%", left: "35%", rotate: 3, width: 115, opacity: 0.9, duration: 4.4, delay: 0.2 },
  { src: "/gallery/AMALGAMATION.png", top: "45%", left: "38%", rotate: -8, width: 135, opacity: 0.72, duration: 5.9, delay: 2.0 },
  { src: "/gallery/Focus.png", top: "15%", left: "52%", rotate: 5, width: 125, opacity: 0.8, duration: 6.8, delay: 0.6 },
  { src: "/gallery/Blood donation-min.png", top: "55%", left: "55%", rotate: -4, width: 100, opacity: 0.92, duration: 4.2, delay: 1.4 },
  { src: "/gallery/Rise poster.png", top: "5%", left: "68%", rotate: 6, width: 145, opacity: 0.77, duration: 5.4, delay: 1.0 },
  { src: "/gallery/Type3.png", top: "40%", left: "72%", rotate: -7, width: 115, opacity: 0.84, duration: 6.3, delay: 0.3 },
  { src: "/gallery/Weave and thread 2-min(1).png", top: "12%", left: "85%", rotate: 4, width: 130, opacity: 0.7, duration: 5.0, delay: 1.8 },
  { src: "/gallery/1efdf0168187977.644629f9b454e.png", top: "52%", left: "82%", rotate: -2, width: 155, opacity: 0.86, duration: 7.0, delay: 2.2 },
  { src: "/gallery/Halftone CMYK@2x 1 1.png", top: "30%", left: "92%", rotate: 8, width: 105, opacity: 0.79, duration: 4.6, delay: 0.9 },
];

export function ScatterStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: 420, background: "#F5F3F0", isolation: "isolate", zIndex: 1 }}
    >
      {SCATTER_IMAGES.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt=""
          loading="lazy"
          className="scatter-float"
          style={{
            position: "absolute",
            width: img.width,
            top: img.top,
            left: img.left,
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            opacity: img.opacity,
            transform: `rotate(${img.rotate}deg)`,
            animationDuration: `${img.duration}s`,
            animationDelay: `${img.delay}s`,
            // store rotate value for the keyframes via CSS custom property
            ["--scatter-rotate" as string]: `${img.rotate}deg`,
          }}
        />
      ))}
    </section>
  );
}
