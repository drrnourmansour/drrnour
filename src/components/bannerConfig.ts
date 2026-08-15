/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║              BANNER CONFIGURATION FILE                   ║
 * ║  Edit this file to control every tile in the banner.    ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * TILE PROPERTIES:
 *   bg     → background color hex  e.g. "#E8C87A"
 *   shape  → "circle" | "pill" | "roundedSquare"
 *   size   → "sm" | "md" | "lg"
 *   glyph  → one of the glyph keys below, or null for no glyph
 *
 * AVAILABLE TYPOGRAPHIC GLYPH KEYS:
 *   "noon"        → Arabic (ن) Noon Monogram + Floating Nuqta
 *   "bezier"      → Vector Bézier Pen Tool & Node Handles (Type Design)
 *   "kaf"         → Arabic (ك) Sculptural Long Kashida Kaf
 *   "hah"         → Arabic (ح) Calligraphic Modulated Sinuous Letter
 *   "la"          → Arabic (لا) Lam-Alif Harmonized Ligature
 *   "waw"         → Arabic (و) Teardrop Editorial Letter
 *   "exclamation" → Editorial Specimen ! with Diamond Dot
 *   "star"        → Type Specimen 8-Point Rotating Asterisk
 *   "wave"        → Kashida Calligraphic Wave (~)
 *   "diamond"     → 4-Point Type Sparkle (✦)
 *   "oo"          → Cursive Double-Loop Fluid Lettering
 *   null          → empty (solid color only)
 */

export type GlyphKey =
  | "noon"
  | "bezier"
  | "kaf"
  | "hah"
  | "la"
  | "waw"
  | "exclamation"
  | "star"
  | "wave"
  | "diamond"
  | "oo"
  | "frame1"
  | "one"
  | "ain"
  | null;

export type TileShape = "circle" | "pill" | "roundedSquare";
export type TileSize  = "sm" | "md" | "lg";

export interface TileConfig {
  bg:    string;      // hex color
  shape: TileShape;
  size:  TileSize;
  glyph: GlyphKey;
}

/* ════════════════════════════════════════════════════════════
   TOP ROW  —  small decorative tiles (above the main row)
   ════════════════════════════════════════════════════════════ */
export const topRowConfig: TileConfig[] = [
  { bg: "#F5D9C5", shape: "circle",        size: "sm", glyph: null        },
  { bg: "#7ABCE8", shape: "pill",          size: "md", glyph: "wave"      },
  { bg: "#D4C5B8", shape: "roundedSquare", size: "sm", glyph: "diamond"   },
  { bg: "#E8C87A", shape: "circle",        size: "sm", glyph: "waw"       },
  { bg: "#AFDF6B", shape: "pill",          size: "md", glyph: null        },
  { bg: "#E84B6A", shape: "circle",        size: "sm", glyph: null        },
  { bg: "#96B5A4", shape: "roundedSquare", size: "sm", glyph: null        },
  { bg: "#3A3D8A", shape: "circle",        size: "sm", glyph: null        },
  { bg: "#D4907A", shape: "pill",          size: "md", glyph: null        },
];

/* ════════════════════════════════════════════════════════════
   MAIN ROW  —  large animated tiles (Typecraft Showcase)
   ════════════════════════════════════════════════════════════ */
export const mainRowConfig: TileConfig[] = [
  { bg: "#E8C87A", shape: "pill",          size: "lg", glyph: "oo"          },
  { bg: "#3A3D8A", shape: "roundedSquare", size: "md", glyph: "exclamation" },
  { bg: "#D4907A", shape: "circle",        size: "lg", glyph: "hah"         },
  { bg: "#D4C5B8", shape: "roundedSquare", size: "md", glyph: "noon"        },
  { bg: "#E84B6A", shape: "circle",        size: "lg", glyph: "kaf"         },
  { bg: "#7ABCE8", shape: "roundedSquare", size: "md", glyph: "la"          },
  { bg: "#96B5A4", shape: "circle",        size: "lg", glyph: "bezier"      },
  { bg: "#AFDF6B", shape: "roundedSquare", size: "lg", glyph: "star"        },
];
