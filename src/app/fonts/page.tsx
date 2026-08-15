"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Menu, LayoutGrid } from "lucide-react";
import LottieBanner from "@/components/LottieBanner";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
interface FontItem {
  id: string;
  title: string;
  titleEn: string;
  fontFamily: string;
  bg: string;
  textColor: "dark" | "light";
  stylesAr: string;
  stylesEn: string;
  category: string;
  specimenAr: string;
  specimenEn: string;
  soon?: boolean;
}

const fontsList: FontItem[] = [
  {
    id: "talheen",
    title: "تَلْحِين",
    titleEn: "Talheen",
    fontFamily: "'Aref Ruqaa', serif",
    bg: "#E8C87A",
    textColor: "dark",
    stylesAr: "٣ أنماط",
    stylesEn: "3 styles",
    category: "يدوي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
  },
  {
    id: "waraqa",
    title: "وَرَقَة",
    titleEn: "Waraqa",
    fontFamily: "'Cairo', sans-serif",
    bg: "#D4C5B8",
    textColor: "dark",
    stylesAr: "٦ أنماط، متغير",
    stylesEn: "6 styles, Variable",
    category: "هندسي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
  },
  {
    id: "khatt-nour",
    title: "خَط نُور",
    titleEn: "Khatt Nour",
    fontFamily: "'Reem Kufi', sans-serif",
    bg: "#96B5A4",
    textColor: "dark",
    stylesAr: "٦ أنماط، متغير",
    stylesEn: "6 styles, Variable",
    category: "كوفي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
  },
  {
    id: "majd",
    title: "مَجْد",
    titleEn: "Majd",
    fontFamily: "'Tajawal', sans-serif",
    bg: "#D4907A",
    textColor: "dark",
    stylesAr: "٧ أنماط، متغير",
    stylesEn: "7 styles, Variable",
    category: "هندسي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
  },
  {
    id: "rawaa",
    title: "رَوْعَة",
    titleEn: "Rawaa",
    fontFamily: "'Readex Pro', sans-serif",
    bg: "#C8BF8A",
    textColor: "dark",
    stylesAr: "٨ أنماط",
    stylesEn: "8 styles",
    category: "يدوي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
  },
  {
    id: "naskh-modern",
    title: "نَسْخ",
    titleEn: "Naskh",
    fontFamily: "'Amiri', serif",
    bg: "#1A1916",
    textColor: "light",
    stylesAr: "٤ أنماط",
    stylesEn: "4 styles",
    category: "نسخي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
  },
  {
    id: "zuhal",
    title: "زُحَل",
    titleEn: "Zuhal",
    fontFamily: "'Tajawal', sans-serif",
    bg: "#3A3D8A",
    textColor: "light",
    stylesAr: "٦٣ نمط، متغير",
    stylesEn: "63 styles, Variable",
    category: "هندسي",
    specimenAr: "أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ",
    specimenEn: "The quick brown fox",
    soon: true,
  },
];

const allCategories = ["الكل", "يدوي", "هندسي", "كوفي", "نسخي"];

/* ─────────────────────────────────────────
   SCROLL-REVEAL WRAPPER
───────────────────────────────────────── */
function RevealCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   GRID CARD  (Etharee-style)
───────────────────────────────────────── */
function GridCard({ font }: { font: FontItem }) {
  const dark = font.textColor === "dark";
  const ink = dark ? "#1A1916" : "#FAF9F6";
  const inkMid = dark ? "rgba(26,25,22,0.55)" : "rgba(250,249,246,0.55)";
  const border = dark ? "rgba(26,25,22,0.25)" : "rgba(250,249,246,0.25)";

  return (
    <Link
      href={font.soon ? "#" : `/fonts/${font.id}`}
      className="relative rounded-[24px] sm:rounded-[40px] flex flex-col justify-between overflow-hidden group"
      style={{
        backgroundColor: font.bg,
        minHeight: "clamp(300px, 40vw, 480px)",
        padding: "clamp(16px, 3vw, 44px)",
      }}
      aria-disabled={font.soon}
      tabIndex={font.soon ? -1 : 0}
    >
      {/* Soon overlay */}
      {font.soon && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: `${font.bg}CC` }}>
          <span
            className="px-5 py-2 rounded-full text-sm font-bold tracking-widest border"
            style={{ color: ink, borderColor: border, fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            قريبًا · Soon
          </span>
        </div>
      )}

      {/* Top row — badges */}
      <div className="flex items-start justify-between w-full z-10">
        <span
          className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border tracking-wide"
          style={{
            color: inkMid,
            borderColor: border,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {font.stylesEn}
        </span>
        <span
          className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border tracking-wide"
          style={{
            color: inkMid,
            borderColor: border,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {font.stylesAr}
        </span>
      </div>

      {/* Center — HUGE font name rendered in the actual typeface */}
      <div className="flex-1 flex items-center justify-center py-4">
        <h2
          style={{
            fontFamily: font.fontFamily,
            color: ink,
            fontSize: "clamp(3rem, 9vw, 7rem)",
            lineHeight: 1,
            fontWeight: 700,
            textAlign: "center",
            transition: "transform 0.3s ease",
          }}
          className="group-hover:scale-105 transition-transform duration-300"
        >
          {font.title}
        </h2>
      </div>

      {/* Bottom — specimen lines */}
      {/* Bottom — specimen + inline arrow */}
      <div className="hidden sm:flex flex-col gap-1">
        <p
          style={{
            fontFamily: font.fontFamily,
            color: ink,
            fontSize: "clamp(0.75rem, 1.4vw, 1.1rem)",
            fontWeight: 400,
            opacity: 0.75,
            textAlign: "right",
          }}
        >
          {font.specimenAr}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: ink,
              fontSize: "clamp(0.65rem, 1.2vw, 0.95rem)",
              fontWeight: 400,
              opacity: 0.55,
              direction: "ltr",
            }}
          >
            {font.specimenEn}
          </p>
          {!font.soon && (
            <div
              className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ borderColor: border, color: ink }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   LIST CARD  (Etharee-style)
───────────────────────────────────────── */
function ListCard({ font }: { font: FontItem }) {
  const dark = font.textColor === "dark";
  const ink = dark ? "#1A1916" : "#FAF9F6";
  const inkMid = dark ? "rgba(26,25,22,0.5)" : "rgba(250,249,246,0.5)";
  const border = dark ? "rgba(26,25,22,0.2)" : "rgba(250,249,246,0.2)";

  return (
    <Link
      href={font.soon ? "#" : `/fonts/${font.id}`}
      className="relative flex items-center justify-between gap-4 rounded-[20px] sm:rounded-[28px] group overflow-hidden"
      style={{
        backgroundColor: font.bg,
        padding: "clamp(14px, 2.5vw, 28px) clamp(18px, 3.5vw, 44px)",
      }}
    >
      {font.soon && (
        <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: `${font.bg}BB` }}>
          <span className="px-4 py-1.5 rounded-full text-xs font-bold border tracking-widest"
            style={{ color: ink, borderColor: border, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            قريبًا · Soon
          </span>
        </div>
      )}

      {/* Font name + specimen */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h2
          style={{ fontFamily: font.fontFamily, color: ink, fontWeight: 700 }}
          className="text-3xl sm:text-5xl leading-none truncate"
        >
          {font.title}
        </h2>
        <p
          style={{
            fontFamily: font.fontFamily,
            color: ink,
            opacity: 0.55,
            fontSize: "0.85rem",
          }}
          className="hidden sm:block mt-0.5 truncate"
        >
          {font.specimenAr}
        </p>
      </div>

      {/* Right side — styles badges + arrow */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex flex-col items-end gap-1">
          <span style={{ color: inkMid, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-xs font-medium">{font.stylesAr}</span>
          <span style={{ color: inkMid, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-xs font-medium">{font.stylesEn}</span>
        </div>
        {!font.soon && (
          <div
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:scale-110"
            style={{ borderColor: border, color: ink }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   NEWSLETTER SECTION
───────────────────────────────────────── */
function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 sm:mt-24 mb-12 sm:mb-20 rounded-[28px] sm:rounded-[44px] overflow-hidden"
      style={{ backgroundColor: "#1A1916", padding: "clamp(32px, 5vw, 72px)" }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 style={{ fontFamily: "'Arsenica', serif", color: "#FAF9F6" }}
            className="text-2xl sm:text-4xl font-bold leading-tight">
            ابقَ على اطّلاع
          </h2>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "rgba(250,249,246,0.5)" }}
            className="text-sm sm:text-base">
            استقبل تحديثات عن الخطوط الجديدة والمقالات
          </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 w-full sm:w-auto"
          dir="rtl"
        >
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="flex-1 sm:w-64 px-4 py-3 rounded-full text-sm outline-none border border-white/10 focus:border-white/30 transition-colors"
            style={{
              backgroundColor: "rgba(250,249,246,0.08)",
              color: "#FAF9F6",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-85 active:scale-95 shrink-0"
            style={{
              backgroundColor: "#FAF9F6",
              color: "#1A1916",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            اشترك
          </button>
        </form>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function FontsPage() {
  const [isListView, setIsListView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filtered = fontsList.filter(
    (f) => activeCategory === "الكل" || f.category === activeCategory
  );
  const available = filtered.filter((f) => !f.soon);

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-12 max-w-[1350px] mx-auto">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center mb-8 sm:mb-10">

        {/* Animated banner */}
        <div className="mb-6 sm:mb-10 w-full">
          <LottieBanner />
        </div>

        {/* Titles */}
        <h1 className="font-serif text-3xl sm:text-6xl font-extrabold text-black mb-1">
          خطوط عربية ولاتينية
        </h1>
        <p
          className="text-lg sm:text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Arabic &amp; Latin Fonts
        </p>
        <p
          className="text-sm text-black/40 font-medium mb-6 sm:mb-8"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {available.length} خط متاح
          {activeCategory !== "الكل" && ` في فئة "${activeCategory}"`}
        </p>

        {/* Controls bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-serif text-sm sm:text-base font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#1A1916] text-[#FAF9F6] shadow-sm"
                  : "bg-black/[0.05] text-black/60 hover:bg-black/10"
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="w-px h-6 bg-black/15 mx-1 hidden sm:block" />

          {/* View switcher */}
          <div
            dir="ltr"
            className="bg-black/[0.07] rounded-full p-1 inline-flex items-center relative gap-1 shadow-inner select-none"
          >
            <motion.div
              className="absolute top-1 left-1 w-8 h-8 rounded-full bg-[#1A1916] z-10 shadow-md"
              animate={{ x: isListView ? 0 : 36 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setIsListView(true)}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-20 transition-colors duration-200 ${
                isListView ? "text-[#FAF9F6]" : "text-black/70"
              }`}
              title="عرض قائمة"
            >
              <Menu className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => setIsListView(false)}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-20 transition-colors duration-200 ${
                !isListView ? "text-[#FAF9F6]" : "text-black/70"
              }`}
              title="عرض شبكي"
            >
              <LayoutGrid className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Font Cards ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`${isListView}-${activeCategory}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={isListView ? "flex flex-col gap-3 sm:gap-4" : "grid grid-cols-2 gap-3 sm:gap-6"}
        >
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-24 text-black/40 font-sans">
              لا توجد خطوط في هذه الفئة بعد.
            </div>
          ) : (
            filtered.map((font, i) => (
              <RevealCard key={font.id} delay={i * 0.06}>
                <motion.div whileHover={{ y: isListView ? -3 : -6 }} transition={{ duration: 0.2 }}>
                  {isListView ? <ListCard font={font} /> : <GridCard font={font} />}
                </motion.div>
              </RevealCard>
            ))
          )}
        </motion.section>
      </AnimatePresence>

      {/* ── Newsletter ── */}
      <Newsletter />
    </main>
  );
}
