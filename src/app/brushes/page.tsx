"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Menu, LayoutGrid } from "lucide-react";
import { brushDataMap, BrushDetailData } from "./brushData";

const brushPacksList: BrushDetailData[] = [
  {
    ...brushDataMap["nour-signature"],
    soon: true,
  },
];

const allCategories = ["الكل"];

/* ─────────────────────────────────────────
   SCROLL REVEAL WRAPPER
───────────────────────────────────────── */
function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
   GRID BRUSH CARD
───────────────────────────────────────── */
function BrushGridCard({ pack }: { pack: BrushDetailData }) {
  const dark = pack.textColor === "dark";
  const ink = dark ? "#1A1916" : "#FAF9F6";
  const inkMid = dark ? "rgba(26,25,22,0.6)" : "rgba(250,249,246,0.6)";
  const border = dark ? "rgba(26,25,22,0.22)" : "rgba(250,249,246,0.22)";

  const content = (
    <>
      {/* Top Row Badges — Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full z-10 gap-2 sm:gap-2">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <span
            className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border tracking-wide whitespace-nowrap"
            style={{
              color: inkMid,
              borderColor: border,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {pack.fileFormat}
            <span className="hidden sm:inline">{pack.fileSize ? ` • ${pack.fileSize}` : ""}</span>
          </span>

          <span
            className="sm:hidden px-2.5 py-1 rounded-full text-[10px] font-semibold border tracking-wide whitespace-nowrap"
            style={{
              color: inkMid,
              borderColor: border,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {pack.stylesAr}
          </span>
        </div>

        {pack.soon && (
          <span
            className="order-first sm:order-none px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border tracking-wider flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:scale-105 select-none shrink-0"
            style={{
              color: ink,
              borderColor: border,
              backgroundColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            قريباً · Soon
          </span>
        )}

        <span
          className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold border tracking-wide whitespace-nowrap"
          style={{
            color: inkMid,
            borderColor: border,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {pack.stylesAr}
        </span>
      </div>

      {/* Center — Brush Title */}
      <div className="flex-1 flex flex-col items-center justify-center py-5 sm:py-6 text-center my-auto">
        <h2
          style={{
            fontFamily: "'Arsenica', serif",
            color: ink,
            fontSize: "clamp(2rem, 6.5vw, 4.8rem)",
            lineHeight: 1.25,
            fontWeight: 800,
          }}
          className="group-hover:scale-105 transition-transform duration-300 mb-1.5 sm:mb-3 select-none"
        >
          {pack.nameAr}
        </h2>
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            color: inkMid,
          }}
          className="text-[11px] sm:text-sm font-semibold tracking-wider uppercase select-none"
        >
          {pack.nameEn}
        </span>
      </div>

      {/* Bottom — Specimen + Action CTA */}
      <div className="flex flex-col gap-2 z-10 mt-auto">
        <p
          style={{
            fontFamily: "'Arsenica', serif",
            color: ink,
            fontSize: "clamp(0.8rem, 1.3vw, 1.1rem)",
            fontWeight: 600,
            opacity: 0.85,
            textAlign: "right",
          }}
          className="line-clamp-1 truncate"
        >
          {pack.specimenAr}
        </p>

        <div className="flex items-center justify-between gap-2 sm:gap-3 pt-2 border-t" style={{ borderColor: border }}>
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: inkMid,
              fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
              direction: "ltr",
            }}
            className="truncate flex-1 min-w-0"
          >
            {pack.specimenEn}
          </p>

          <div
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shrink-0 shadow-xs group-hover:scale-105"
            style={{
              backgroundColor: ink,
              color: pack.bg,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            <span>{pack.soon ? "قريباً" : "تجربة الفرشاة"}</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );

  const cardStyle = {
    backgroundColor: pack.bg,
    minHeight: "clamp(300px, 42vw, 490px)",
    padding: "clamp(16px, 3.5vw, 44px)",
  };

  if (pack.soon) {
    return (
      <div
        onClick={(e) => e.preventDefault()}
        className="relative rounded-[24px] sm:rounded-[40px] flex flex-col justify-between overflow-hidden group shadow-xs cursor-pointer select-none block transition-all duration-300 hover:shadow-2xl"
        style={cardStyle}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/brushes/${pack.id}`}
      className="relative rounded-[24px] sm:rounded-[40px] flex flex-col justify-between overflow-hidden group shadow-xs transition-all duration-300 block cursor-pointer hover:shadow-2xl"
      style={cardStyle}
    >
      {content}
    </Link>
  );
}

/* ─────────────────────────────────────────
   LIST BRUSH CARD
───────────────────────────────────────── */
function BrushListCard({ pack }: { pack: BrushDetailData }) {
  const dark = pack.textColor === "dark";
  const ink = dark ? "#1A1916" : "#FAF9F6";
  const inkMid = dark ? "rgba(26,25,22,0.75)" : "rgba(250,249,246,0.75)";
  const border = dark ? "rgba(26,25,22,0.28)" : "rgba(250,249,246,0.28)";

  const content = (
    <>
      {/* Brush title + specimen */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 text-right">
        <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
          <h2
            style={{ fontFamily: "'Arsenica', serif", color: ink, fontWeight: 800 }}
            className="text-xl sm:text-4xl leading-tight truncate group-hover:scale-[1.02] origin-right transition-transform duration-300"
          >
            {pack.nameAr}
          </h2>
          <span
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: inkMid }}
            className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider hidden xs:inline"
          >
            {pack.nameEn}
          </span>
          {pack.soon && (
            <span
              className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border tracking-wider flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:scale-105 select-none shrink-0"
              style={{
                color: ink,
                borderColor: border,
                backgroundColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              قريباً · Soon
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "'Arsenica', serif",
            color: ink,
            opacity: 0.65,
            fontSize: "0.85rem",
          }}
          className="truncate"
        >
          {pack.specimenAr}
        </p>
      </div>

      {/* Badges & Action Button */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="hidden sm:flex flex-col items-end gap-0.5 text-left">
          <span
            style={{ color: inkMid, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-xs font-bold"
          >
            {pack.fileFormat}
          </span>
          <span
            style={{ color: inkMid, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-[11px] opacity-75"
          >
            {pack.stylesAr}
          </span>
        </div>

        <div
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all duration-200 group-hover:scale-105"
          style={{ borderColor: border, color: ink }}
        >
          <span>{pack.soon ? "قريباً" : "تجربة"}</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </>
  );
  const cardStyle = {
    backgroundColor: pack.bg,
    padding: "clamp(12px, 2.5vw, 28px) clamp(16px, 3.5vw, 44px)",
  };

  if (pack.soon) {
    return (
      <div
        onClick={(e) => e.preventDefault()}
        className="relative flex items-center justify-between gap-4 rounded-[20px] sm:rounded-[28px] group overflow-hidden shadow-xs cursor-pointer select-none block transition-all duration-300"
        style={cardStyle}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/brushes/${pack.id}`}
      className="relative flex items-center justify-between gap-4 rounded-[20px] sm:rounded-[28px] group overflow-hidden shadow-xs block cursor-pointer"
      style={cardStyle}
    >
      {content}
    </Link>
  );
}

/* ─────────────────────────────────────────
   NEWSLETTER SECTION
───────────────────────────────────────── */
function Newsletter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 sm:mt-24 mb-12 sm:mb-20 rounded-[28px] sm:rounded-[44px] overflow-hidden border border-transparent dark:border-white/15"
      style={{ backgroundColor: "#1A1916", padding: "clamp(32px, 5vw, 72px)" }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="flex flex-col gap-2 text-right">
          <h2
            style={{ fontFamily: "'Arsenica', serif", color: "#FAF9F6" }}
            className="text-2xl sm:text-4xl font-bold leading-tight"
          >
            ابق على اطّلاع
          </h2>
          <p
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "rgba(250,249,246,0.6)" }}
            className="text-sm sm:text-base"
          >
            استقبل تحديثات عن الفرش الجديدة والخطوط الرقمية
          </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 w-full sm:w-auto"
          dir="rtl"
        >
          <input
            id="brushes-newsletter-email"
            name="email"
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
   MAIN BRUSHES PAGE
───────────────────────────────────────── */
export default function BrushesPage() {
  const [isListView, setIsListView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredPacks = brushPacksList.filter(
    (p) => activeCategory === "الكل" || p.category === activeCategory
  );
  const availablePacks = filteredPacks.filter((p) => !p.soon);

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-12 max-w-[1350px] mx-auto">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-xs font-bold text-black/70 dark:text-offwhite/80 mb-4"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-[#F6DC8D] via-[#E8C87A] to-[#B8923A] shadow-[0_2px_6px_rgba(232,200,122,0.55),inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <Sparkles className="w-3 h-3 text-[#1A1916]" />
          </span>
          <span>أدوات الخط والرسم الرقمي · Digital Brushes</span>
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-7xl font-black text-black dark:text-offwhite mb-3 sm:mb-4 leading-normal sm:leading-tight">
          فرش رقمية
        </h1>

        <p
          className="text-lg sm:text-2xl font-semibold text-black/80 dark:text-offwhite/80 mb-3 sm:mb-4"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Digital Brushes
        </p>

        <p
          className="text-sm text-black/50 dark:text-offwhite/50 font-medium mb-8 sm:mb-10 max-w-xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {availablePacks.length > 0 ? `${availablePacks.length} حزمة فرش متاحة للتحميل الفوري` : "قريباً · Soon"}
        </p>

        {/* Categories & View Switcher Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-serif text-sm sm:text-base font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#1A1916] text-[#FAF9F6] dark:bg-offwhite dark:text-ink shadow-sm"
                  : "bg-black/[0.05] dark:bg-white/10 text-black/60 dark:text-offwhite/70 hover:bg-black/10 dark:hover:bg-white/15"
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="w-px h-6 bg-black/15 dark:bg-white/15 mx-1 hidden sm:block" />

          {/* Grid / List Switcher */}
          <div
            dir="ltr"
            className="bg-black/[0.07] dark:bg-white/10 rounded-full p-1 inline-flex items-center relative gap-1 shadow-inner select-none"
          >
            <motion.div
              className="absolute top-1 left-1 w-8 h-8 rounded-full bg-[#1A1916] dark:bg-offwhite z-10 shadow-md"
              animate={{ x: isListView ? 0 : 36 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setIsListView(true)}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-20 transition-colors duration-200 ${
                isListView ? "text-[#FAF9F6] dark:text-[#1A1916]" : "text-black/70 dark:text-offwhite/70"
              }`}
              title="عرض قائمة"
            >
              <Menu className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => setIsListView(false)}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-20 transition-colors duration-200 ${
                !isListView ? "text-[#FAF9F6] dark:text-[#1A1916]" : "text-black/70 dark:text-offwhite/70"
              }`}
              title="عرض شبكي"
            >
              <LayoutGrid className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Brush Pack Cards ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`${isListView}-${activeCategory}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={
            isListView
              ? "flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto w-full"
              : filteredPacks.length === 1
              ? "max-w-2xl mx-auto w-full"
              : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          }
        >
          {filteredPacks.length === 0 ? (
            <div className="col-span-2 text-center py-24 text-black/40 font-sans">
              لا توجد فرش في هذه الفئة بعد.
            </div>
          ) : (
            filteredPacks.map((pack, i) => (
              <RevealCard key={pack.id} delay={i * 0.06}>
                <motion.div whileHover={pack.soon ? undefined : { y: isListView ? -3 : -6 }} transition={{ duration: 0.2 }}>
                  {isListView ? <BrushListCard pack={pack} /> : <BrushGridCard pack={pack} />}
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
