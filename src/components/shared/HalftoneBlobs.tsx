"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
}

const DOT_SPACING = 10;
const MAX_DOT_R = 4.5;
const BLOB_COUNT = 6;

export function HalftoneBlobs({ color = "rgba(255,255,255,0.35)" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const blobs: Blob[] = Array.from({ length: BLOB_COUNT }, () => ({
      x: 0.1 + Math.random() * 0.8,
      y: 0.1 + Math.random() * 0.8,
      r: 0.2 + Math.random() * 0.15,
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
      phase: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.002,
    }));

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    let raf: number;

    function draw(t: number) {
      if (w === 0 || h === 0) {
        resize();
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx!.clearRect(0, 0, w, h);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -0.05 || b.x > 1.05) b.vx *= -1;
        if (b.y < -0.05 || b.y > 1.05) b.vy *= -1;
      }

      const cols = Math.ceil(w / DOT_SPACING);
      const rows = Math.ceil(h / DOT_SPACING);
      const minDim = Math.min(w, h);

      ctx!.fillStyle = color;

      for (let gy = 0; gy <= rows; gy++) {
        const py = gy * DOT_SPACING;
        for (let gx = 0; gx <= cols; gx++) {
          const px = gx * DOT_SPACING;

          let influence = 0;
          for (const b of blobs) {
            const bx = b.x * w;
            const by = b.y * h;
            const br =
              b.r * minDim * (1 + 0.25 * Math.sin(t * b.speed + b.phase));

            const dx = px - bx;
            const dy = py - by;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const f = 1 - dist / br;
            if (f > 0) {
              influence += f * f;
            }
          }

          if (influence > 0.01) {
            const clamped = Math.min(influence, 1);
            const dotR = clamped * MAX_DOT_R;
            ctx!.beginPath();
            ctx!.arc(px, py, dotR, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      className="pointer-events-none"
    />
  );
}
