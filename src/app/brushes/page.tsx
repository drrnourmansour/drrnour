"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Menu, LayoutGrid } from "lucide-react";
import { brushDataMap, BrushDetailData } from "./brushData";

const brushPacksList: BrushDetailData[] = Object.values(brushDataMap);

const allCategories = ["الكل", "خط عربي", "محاكاة قصب", "هندسي", "حبر وتعتيق", "تشكيل وزخرفة"];

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

  return (
    <Link
      href={pack.soon ? "#" : `/brushes/${pack.id}`}
      className="relative rounded-[24px] sm:rounded-[40px] flex flex-col justify-between overflow-hidden group shadow-xs transition-all duration-300 block"
      style={{
        backgroundColor: pack.bg,
        minHeight: "clamp(320px, 42vw, 490px)",
        padding: "clamp(18px, 3vw, 44px)",
      }}
      aria-disabled={pack.soon}
      tabIndex={pack.soon ? -1 : 0}
    >
      {/* Soon Overlay */}
      {pack.soon && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: `${pack.bg}CC` }}
        >
          <span
            className="px-5 py-2 rounded-full text-sm font-bold tracking-widest border"
            style={{
              color: ink,
              borderColor: border,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            قريبًا · Soon
          </span>
        </div>
      )}

      {/* Top Row Badges */}
      <div className="flex items-start justify-between w-full z-10 gap-2">
        <span
          className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border tracking-wide"
          style={{
            color: inkMid,
            borderColor: border,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {pack.fileFormat} {pack.fileSize ? `• ${pack.fileSize}` : ""}
        </span>
        <span
          className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border tracking-wide"
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
      <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
        <h2
          style={{
            fontFamily: "'Arsenica', serif",
            color: ink,
            fontSize: "clamp(2.4rem, 6.5vw, 4.8rem)",
            lineHeight: 1.1,
            fontWeight: 800,
          }}
          className="group-hover:scale-105 transition-transform duration-300"
        >
          {pack.nameAr}
        </h2>
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            color: inkMid,
          }}
          className="text-xs sm:text-sm font-semibold tracking-wider uppercase mt-1"
        >
          {pack.nameEn}
        </span>
      </div>

      {/* Bottom — Specimen + Action CTA */}
      <div className="flex flex-col gap-2 z-10">
        <p
          style={{
            fontFamily: "'Arsenica', serif",
            color: ink,
            fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)",
            fontWeight: 600,
            opacity: 0.85,
            textAlign: "right",
          }}
          className="line-clamp-1"
        >
          {pack.specimenAr}
        </p>

        <div className="flex items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: border }}>
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: inkMid,
              fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
              direction: "ltr",
            }}
            className="truncate flex-1"
          >
            {pack.specimenEn}
          </p>

          {!pack.soon && (
            <div
              className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shrink-0 shadow-xs group-hover:scale-105"
              style={{
                backgroundColor: ink,
                color: pack.bg,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              <span>تجربة الفرشاة</span>
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
   LIST BRUSH CARD
───────────────────────────────────────── */
function BrushListCard({ pack }: { pack: BrushDetailData }) {
  const dark = pack.textColor === "dark";
  const ink = dark ? "#1A1916" : "#FAF9F6";
  const inkMid = dark ? "rgba(26,25,22,0.55)" : "rgba(250,249,246,0.55)";
  const border = dark ? "rgba(26,25,22,0.2)" : "rgba(250,249,246,0.2)";

  return (
    <Link
      href={pack.soon ? "#" : `/brushes/${pack.id}`}
      className="relative flex items-center justify-between gap-4 rounded-[20px] sm:rounded-[28px] group overflow-hidden shadow-xs block"
      style={{
        backgroundColor: pack.bg,
        padding: "clamp(14px, 2.5vw, 26px) clamp(18px, 3.5vw, 40px)",
      }}
      aria-disabled={pack.soon}
      tabIndex={pack.soon ? -1 : 0}
    >
      {pack.soon && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[2px]"
          style={{ backgroundColor: `${pack.bg}BB` }}
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold border tracking-widest"
            style={{
              color: ink,
              borderColor: border,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            قريبًا · Soon
          </span>
        </div>
      )}

      {/* Brush title + specimen */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 text-right">
        <div className="flex items-baseline gap-3">
          <h2
            style={{ fontFamily: "'Arsenica', serif", color: ink, fontWeight: 800 }}
            className="text-2xl sm:text-4xl leading-tight truncate"
          >
            {pack.nameAr}
          </h2>
          <span
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: inkMid }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-wider hidden sm:inline"
          >
            {pack.nameEn}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Arsenica', serif",
            color: ink,
            opacity: 0.65,
            fontSize: "0.9rem",
          }}
          className="hidden sm:block truncate"
        >
          {pack.specimenAr}
        </p>
      </div>

      {/* Badges & Action Button */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden md:flex flex-col items-end gap-0.5 text-left">
          <span
            style={{ color: inkMid, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-xs font-bold"
          >
            {pack.stylesAr}
          </span>
          <span
            style={{ color: inkMid, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-[10px] tracking-wide uppercase"
          >
            {pack.fileFormat} {pack.fileSize ? `• ${pack.fileSize}` : ""}
          </span>
        </div>

        {!pack.soon && (
          <div
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-xs group-hover:scale-105"
            style={{
              backgroundColor: ink,
              color: pack.bg,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            <span>تجربة الفرشاة</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
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
        <div className="flex flex-col gap-2 text-right">
          <h2
            style={{ fontFamily: "'Arsenica', serif", color: "#FAF9F6" }}
            className="text-2xl sm:text-4xl font-bold leading-tight"
          >
            ابقَ على اطّلاع
          </h2>
          <p
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "rgba(250,249,246,0.5)" }}
            className="text-sm sm:text-base"
          >
            استقبل تحديثات عن الفُرَش الجديدة والخطوط الرقمية
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-bold text-black/70 mb-4"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8C87A]" />
          <span>أدوات الخط والرسم الرقمي · Digital Calligraphy &amp; Brushes</span>
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-7xl font-black text-black mb-1 leading-tight">
          فُرَش الخط العربي الرقمي
        </h1>

        <p
          className="text-lg sm:text-2xl font-semibold text-black/80 mb-2"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Arabic Calligraphy &amp; Digital Brushes
        </p>

        <p
          className="text-sm text-black/50 font-medium mb-6 sm:mb-8 max-w-xl"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {availablePacks.length} حزمة فُرَش متاحة للتحميل الفوري
          {activeCategory !== "الكل" && ` في فئة "${activeCategory}"`} بصيغة .gobrushes
        </p>

        {/* Categories & View Switcher Bar */}
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

          {/* Grid / List Switcher */}
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

      {/* ── Brush Pack Cards ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`${isListView}-${activeCategory}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={
            isListView ? "flex flex-col gap-3 sm:gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          }
        >
          {filteredPacks.length === 0 ? (
            <div className="col-span-2 text-center py-24 text-black/40 font-sans">
              لا توجد فُرَش في هذه الفئة بعد.
            </div>
          ) : (
            filteredPacks.map((pack, i) => (
              <RevealCard key={pack.id} delay={i * 0.06}>
                <motion.div whileHover={{ y: isListView ? -3 : -6 }} transition={{ duration: 0.2 }}>
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
