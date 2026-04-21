"use client";

const TICKER_TEXT =
  "UX DESIGN \u00B7 PHOTOGRAPHY \u00B7 MULTIMEDIA STORYTELLING \u00B7 CREATIVE DIRECTION \u00B7 FIGMA \u00B7 INTERACTION DESIGN \u00B7 ";

export function MarqueeTicker() {
  const repeated = TICKER_TEXT.repeat(8);

  return (
    <div
      className="relative overflow-hidden flex items-center"
      style={{ height: 48, background: "#1a1a22" }}
    >
      <div
        className="marquee-ticker whitespace-nowrap"
        style={{
          color: "white",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}
