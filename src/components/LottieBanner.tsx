"use client";

import { motion } from "framer-motion";
import {
  topRowConfig,
  mainRowConfig,
  type TileConfig,
  type TileShape,
  type TileSize,
  type GlyphKey,
} from "./bannerConfig";

/* ══════════════════════════════════════════════════════
   STROKE-DRAW ANIMATION VARIANTS
   ══════════════════════════════════════════════════════ */
const drawStroke = (delay: number = 0, duration: number = 2.2) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay,
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1.2,
      },
      opacity: { delay, duration: 0.1 },
    },
  },
});

/* ══════════════════════════════════════════════════════
   BESPOKE ARABIC & TYPE FOUNDRY GLYPHS
   ══════════════════════════════════════════════════════ */

/** 1. ن — Noon (Foundry Signature Monogram) */
function GlyphNoon({ color = "#1A1916" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      {/* Bowl */}
      <motion.path
        d="M20 42 C18 68 34 86 52 86 C70 86 84 66 82 42"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
        variants={drawStroke(0, 2.0)}
        initial="hidden"
        animate="visible"
      />
      {/* Diamond Dot (Nuqta) */}
      <motion.path
        d="M52 28 L59 35 L52 42 L45 35 Z"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.15, 1, 1, 0],
          opacity: [0, 1, 1, 1, 0],
          y: [0, -2, 0, 0, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          times: [0, 0.25, 0.45, 0.85, 1],
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/** 2. Bézier Vector Tool (Type Design & Font Engineering) */
function GlyphBezier({ color = "#1A1916" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      {/* Vector Path Curve */}
      <motion.path
        d="M22 75 C25 30 75 70 78 25"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        variants={drawStroke(0, 2.2)}
        initial="hidden"
        animate="visible"
      />
      {/* Control Handle Line 1 */}
      <motion.line
        x1="22" y1="75" x2="35" y2="40"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity={0.6}
        animate={{ x2: [35, 42, 35], y2: [40, 32, 40] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Control Handle Line 2 */}
      <motion.line
        x1="78" y1="25" x2="65" y2="60"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity={0.6}
        animate={{ x2: [65, 58, 65], y2: [60, 68, 60] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Anchor Point 1 */}
      <rect x="17" y="70" width="10" height="10" fill={color} rx="2" />
      {/* Anchor Point 2 */}
      <rect x="73" y="20" width="10" height="10" fill={color} rx="2" />
      {/* Handle Nodes */}
      <motion.circle
        cx="35" cy="40" r="4" fill="none" stroke={color} strokeWidth="2"
        animate={{ cx: [35, 42, 35], cy: [40, 32, 40] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="65" cy="60" r="4" fill="none" stroke={color} strokeWidth="2"
        animate={{ cx: [65, 58, 65], cy: [60, 68, 60] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** 3. ك — Kaf (Sculptural Long Kashida) */
function GlyphKaf({ color = "white" }: { color?: string }) {
  return (
    <svg viewBox="0 0 178 95" width="100%" height="100%">
      <motion.path
        d="M88 5 C96 5 99 10 99 16 C99 22 94 29 87 33 C87 33 86 26 77 26 C50 26 28 37 28 43 C28 47 111 47 128 47 C164 47 172 58 172 70 C172 85 167 92 114 92 C108 92 2 92 1 87 C1.5 73 3 67 2.8 67 C7 71 87 72 98 72 C125 72 156 71 159 69 C159 66 158 64 114 64 C98 64 40 64 31 62 C18 59 14 47 21 34 C28.5 19 54 5 88 5 Z"
        fill={color}
        animate={{ scale: [1, 1.04, 1], rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "50%", originY: "50%" }}
      />
    </svg>
  );
}

/** 4. ح — Haa (Bold Calligraphic Flourish) */
function GlyphHah({ color = "white" }: { color?: string }) {
  return (
    <svg viewBox="0 0 90 110" width="100%" height="100%" fill="none">
      <motion.path
        d="M20 18 C32 10 62 12 74 24 C82 32 76 44 60 48 C40 52 22 62 20 78 C18 96 42 102 70 94"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawStroke(0, 2.0)}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

/** 5. لا — Lam-Alif (Harmonized Calligraphic Ligature) */
function GlyphLa({ color = "#1A1916" }: { color?: string }) {
  return (
    <svg viewBox="0 0 90 110" width="100%" height="100%" fill="none">
      {/* Lam stroke looping down and across */}
      <motion.path
        d="M62 14 C56 34 32 80 30 92 C28 100 36 104 50 102 C66 100 74 86 64 74 C50 58 34 38 28 14"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawStroke(0, 2.2)}
        initial="hidden"
        animate="visible"
      />
      {/* Upper Alif cross */}
      <motion.path
        d="M32 30 C45 22 55 18 60 14"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        variants={drawStroke(0.3, 1.6)}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

/** 6. و — Waw (Arabic Editorial Teardrop Loop) */
function GlyphWaw({ color = "#1A1916" }: { color?: string }) {
  return (
    <svg viewBox="0 0 90 100" width="100%" height="100%" fill="none">
      {/* Waw Head & Tail */}
      <motion.path
        d="M48 30 C48 18 32 16 26 26 C20 36 28 48 46 48 C68 48 76 66 68 84 C60 98 38 98 22 88"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawStroke(0, 2.2)}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

/** 7. ! — Editorial Exclamation with Diamond Dot */
function GlyphExclamation({ color = "white" }: { color?: string }) {
  return (
    <motion.svg viewBox="0 0 50 100" width="100%" height="100%">
      {/* Stem with tapered rounded form */}
      <motion.path
        d="M19 14 L31 14 C31 14 30 62 28 66 C26 70 24 70 22 66 C20 62 19 14 19 14 Z"
        fill={color}
        animate={{ scaleY: [1, 0.94, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: "15%" }}
      />
      {/* Diamond Dot */}
      <motion.path
        d="M25 78 L32 85 L25 92 L18 85 Z"
        fill={color}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        style={{ originX: "50%", originY: "50%" }}
      />
    </motion.svg>
  );
}

/** 8. ✳ — Type Specimen Star / Asterisk */
function GlyphStar({ color = "white" }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ originX: "40px", originY: "40px" }}
      >
        {/* 8-point star petals with thick modulated type petals */}
        <path
          d="M40 8 C42 22 42 22 40 34 C38 22 38 22 40 8 Z"
          fill={color}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={i}
            d="M40 10 C43 25 43 25 40 36 C37 25 37 25 40 10 Z"
            fill={color}
            transform={`rotate(${angle} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r="5" fill={color} />
      </motion.g>
    </svg>
  );
}

/** 9. ~ / Kashida Wave (Type Rhythm Flourish) */
function GlyphWave({ color = "#1A1916" }: { color?: string }) {
  return (
    <svg viewBox="0 0 110 50" width="100%" height="100%" fill="none">
      <motion.path
        d="M10 25 C25 8 40 8 55 25 C70 42 85 42 100 25"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        variants={drawStroke(0, 2.0)}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

/** 10. ✦ — Type Sparkle / Diamond Ornament */
function GlyphDiamond({ color = "white" }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 60" width="100%" height="100%">
      <motion.path
        d="M30 6 C31 20 40 29 54 30 C40 31 31 40 30 54 C29 40 20 31 6 30 C20 29 29 20 30 6 Z"
        fill={color}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "50%", originY: "50%" }}
      />
    </svg>
  );
}

/** 11. Cursive Fluid Lettering (oo) */
function GlyphOo({ color = "#1A1916" }: { color?: string }) {
  return (
    <svg viewBox="0 0 140 60" width="100%" height="100%" fill="none">
      <motion.path
        d="M15 30 C12 12 36 10 42 26 C48 44 26 50 18 36 C10 22 40 18 58 32 C74 46 95 44 105 28 C115 12 90 8 82 24 C74 40 98 48 114 34 C124 24 135 28 135 28"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawStroke(0, 2.4)}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   GLYPH REGISTRY & COLOR MAPPER
   ══════════════════════════════════════════════════════ */
function renderGlyph(key: GlyphKey, isDarkTile: boolean) {
  if (!key) return null;
  const color = isDarkTile ? "#FAF9F6" : "#1A1916";

  switch (key) {
    case "noon":
    case "frame1":
      return <GlyphNoon color={color} />;
    case "bezier":
    case "one":
      return <GlyphBezier color={color} />;
    case "kaf":
      return <GlyphKaf color={color} />;
    case "hah":
      return <GlyphHah color={color} />;
    case "la":
      return <GlyphLa color={color} />;
    case "waw":
    case "ain":
      return <GlyphWaw color={color} />;
    case "exclamation":
      return <GlyphExclamation color={color} />;
    case "star":
      return <GlyphStar color={color} />;
    case "wave":
      return <GlyphWave color={color} />;
    case "diamond":
      return <GlyphDiamond color={color} />;
    case "oo":
      return <GlyphOo color={color} />;
    default:
      return <GlyphNoon color={color} />;
  }
}

/* ══════════════════════════════════════════════════════
   TILE LAYOUT & CONTRAST
   ══════════════════════════════════════════════════════ */
const darkBgColors = new Set(["#3A3D8A", "#1A1916", "#E84B6A", "#D4907A"]);

function tileClass(shape: TileShape, size: TileSize) {
  const base = "flex items-center justify-center shrink-0 shadow-xs";
  // fluid sizes: clamp scales from mobile → desktop smoothly
  const sz: Record<TileSize, string> = {
    sm: "banner-sm",
    md: "banner-md",
    lg: "banner-lg",
  };
  const rx: Record<TileShape, string> = {
    pill: "rounded-full",
    circle: "rounded-full",
    roundedSquare: "rounded-[clamp(12px,2.5vw,32px)]",
  };
  return `${base} ${sz[size]} ${rx[shape]}`;
}

function Tile({
  tile,
  index,
  rowDelay = 0,
}: {
  tile: TileConfig;
  index: number;
  rowDelay?: number;
}) {
  const isDark = darkBgColors.has(tile.bg);
  const glyphNode = renderGlyph(tile.glyph, isDark);

  return (
    <motion.div
      className={tileClass(tile.shape, tile.size)}
      style={{ backgroundColor: tile.bg }}
      initial={{ y: rowDelay > 0 ? 30 : 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: rowDelay + index * 0.05,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{  }}
    >
      {glyphNode && (
        <div
          className="flex items-center justify-center"
          style={{
            width: tile.size === "sm" ? "58%" : "68%",
            height: tile.size === "sm" ? "58%" : "68%",
          }}
        >
          {glyphNode}
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT EXPORT
   ══════════════════════════════════════════════════════ */
export default function LottieBanner() {
  return (
    <div className="w-full select-none" dir="ltr">
      {/* Top decorative row — hidden on xs, shown sm+ */}
      <div className="hidden sm:flex items-end gap-[clamp(6px,1.2vw,14px)] pb-[clamp(4px,0.8vw,8px)] justify-center">
        {topRowConfig.map((tile, i) => (
          <Tile key={i} tile={tile} index={i} rowDelay={0} />
        ))}
      </div>

      {/* Main animated row — always visible, fluid sizing */}
      <div className="flex items-center gap-[clamp(4px,1vw,14px)] justify-center px-2 sm:px-0">
        {mainRowConfig.map((tile, i) => (
          <Tile key={i} tile={tile} index={i} rowDelay={0.08} />
        ))}
      </div>
    </div>
  );
}
