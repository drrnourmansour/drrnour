"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LayoutGrid } from "lucide-react";

interface FontItem {
  id: string;
  title: string;
  fontFamily: string;
  bgClass: string;
  stylesAr: string;
  stylesEn: string;
  category: string;
}

const fontsList: FontItem[] = [
  {
    id: "talheen",
    title: "تَلْحِين",
    fontFamily: "'Aref Ruqaa', serif",
    bgClass: "bg-[#FCD34D]",
    stylesAr: "٣ أنماط",
    stylesEn: "3 styles",
    category: "يدوي",
  },
  {
    id: "waraqa",
    title: "وَرَقَة",
    fontFamily: "'Cairo', sans-serif",
    bgClass: "bg-[#D6CECE]",
    stylesAr: "٦ أنماط، متغير",
    stylesEn: "6 styles, Variable",
    category: "هندسي",
  },
  {
    id: "khatt-nour",
    title: "خَط نُور",
    fontFamily: "'Reem Kufi', sans-serif",
    bgClass: "bg-[#6EE7B7]",
    stylesAr: "٦ أنماط، متغير",
    stylesEn: "6 styles, Variable",
    category: "كوفي",
  },
  {
    id: "majd",
    title: "مَجْد",
    fontFamily: "'Tajawal', sans-serif",
    bgClass: "bg-[#FCA5A5]",
    stylesAr: "٧ أنماط، متغير",
    stylesEn: "7 styles, Variable",
    category: "هندسي",
  },
  {
    id: "rawaa",
    title: "رَوْعَة",
    fontFamily: "'Readex Pro', sans-serif",
    bgClass: "bg-[#D4FF00]",
    stylesAr: "٨ أنماط",
    stylesEn: "8 styles",
    category: "يدوي",
  },
  {
    id: "naskh-modern",
    title: "نَسْخ",
    fontFamily: "'Amiri', serif",
    bgClass: "bg-[#E9D5FF]",
    stylesAr: "٤ أنماط",
    stylesEn: "4 styles",
    category: "نسخي",
  },
];

const allCategories = ["الكل", "يدوي", "هندسي", "كوفي", "نسخي"];

const shapes = [
  { text: "و", bg: "#FDE68A", shape: "rounded-full w-14 sm:w-20 h-14 sm:h-20" },
  { text: "~", bg: "#A7F3D0", shape: "rounded-[30px] sm:rounded-[45px] px-4 sm:px-7 h-14 sm:h-20" },
  { text: "✦", bg: "#C084FC", shape: "rounded-[16px] sm:rounded-[20px] w-14 sm:w-20 h-14 sm:h-20" },
  { text: "۶", bg: "#FCD34D", shape: "rounded-full w-14 sm:w-20 h-14 sm:h-20" },
  { text: "ن", bg: "#BEF264", shape: "rounded-[28px] sm:rounded-[40px] px-5 sm:px-8 h-14 sm:h-20" },
  { text: "س", bg: "#DDD6FE", shape: "rounded-[24px] sm:rounded-[35px] px-4 sm:px-7 h-14 sm:h-20" },
  { text: "٨", bg: "#F87171", shape: "rounded-[18px] sm:rounded-[24px] px-4 sm:px-6 h-14 sm:h-20" },
  { text: "ع", bg: "#6EE7B7", shape: "rounded-full w-14 sm:w-20 h-14 sm:h-20" },
  { text: "ر", bg: "#FBCFE8", shape: "rounded-[30px] sm:rounded-[45px] px-5 sm:px-8 h-14 sm:h-20" },
];

export default function FontsPage() {
  const [isListView, setIsListView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filtered = fontsList.filter(
    (f) => activeCategory === "الكل" || f.category === activeCategory
  );

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-12 max-w-[1350px] mx-auto">
      {/* Hero Header Section */}
      <section className="flex flex-col items-center text-center mb-8 sm:mb-10">

        {/* Shapes Banner */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 w-full overflow-x-auto no-scrollbar py-2 sm:py-4 px-2">
          {shapes.map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: item.bg }}
              className={`flex items-center justify-center font-serif text-xl sm:text-3xl font-extrabold text-black shrink-0 ${item.shape}`}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Hero Titles */}
        <h1 className="font-serif text-3xl sm:text-6xl font-extrabold text-black mb-1">
          خطوط عربية ولاتينية
        </h1>
        <p className="font-sans text-lg sm:text-2xl font-semibold text-black mb-1">
          Arabic & Latin Fonts
        </p>
        <p className="font-sans text-sm text-black/40 font-medium mb-6 sm:mb-8">
          {filtered.length} خط متاح
          {activeCategory !== "الكل" && ` في فئة "${activeCategory}"`}
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-6 sm:mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-sans text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-black/6 text-black/60 hover:bg-black/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sliding Knob View Switcher Pill */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div
            dir="ltr"
            className="bg-[#EFEFEF] rounded-full p-1 inline-flex items-center relative gap-1 shadow-inner select-none"
          >
            <motion.div
              className="absolute top-1 left-1 w-10 h-10 rounded-full bg-black z-10 shadow-md"
              animate={{ x: isListView ? 0 : 44 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setIsListView(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center z-20 transition-colors duration-200 ${
                isListView ? "text-white" : "text-black/80"
              }`}
              title="عرض قائمة List View"
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>
            <button
              onClick={() => setIsListView(false)}
              className={`w-10 h-10 rounded-full flex items-center justify-center z-20 transition-colors duration-200 ${
                !isListView ? "text-white" : "text-black/80"
              }`}
              title="عرض شبكي Grid View"
            >
              <LayoutGrid className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>
      </section>

      {/* Font Cards Grid / List */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`${isListView}-${activeCategory}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`grid mb-20 sm:mb-32 ${
            isListView
              ? "grid-cols-1 gap-4 sm:gap-6"
              : "grid-cols-2 md:grid-cols-2 gap-4 sm:gap-10"
          }`}
        >
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-24 text-black/40 font-sans">
              لا توجد خطوط في هذه الفئة بعد.
            </div>
          ) : (
            filtered.map((font, i) => (
              <motion.div
                key={font.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                {isListView ? (
                  /* List View Card — Compact horizontal row */
                  <Link
                    href={`/fonts/${font.id}`}
                    className={`rounded-2xl sm:rounded-[28px] px-5 sm:px-10 py-4 sm:py-7 flex items-center justify-between gap-4 text-black shadow-sm hover:shadow-lg transition-shadow ${font.bgClass}`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <h2
                        style={{ fontFamily: font.fontFamily }}
                        className="text-3xl sm:text-5xl font-extrabold leading-none text-black"
                      >
                        {font.title}
                      </h2>
                      <span className="font-sans text-xs sm:text-sm font-medium text-black/60 mt-1">
                        {font.stylesAr} · {font.stylesEn}
                      </span>
                    </div>
                    {/* Arrow pointing RIGHT (RTL: means "go forward/into") */}
                    <span className="font-sans text-sm font-bold border border-black/30 rounded-full w-8 h-8 flex items-center justify-center shrink-0 text-black/60">
                      ←
                    </span>
                  </Link>
                ) : (
                  /* Grid View Card — Full tall card */
                  <Link
                    href={`/fonts/${font.id}`}
                    className={`rounded-[20px] sm:rounded-[36px] p-4 sm:p-12 flex flex-col justify-between min-h-[300px] sm:min-h-[420px] text-black shadow-sm transition-shadow hover:shadow-xl block ${font.bgClass}`}
                  >
                    {/* Badges */}
                    <div className="flex items-center justify-between w-full">
                      <span className="px-2 sm:px-5 py-0.5 sm:py-1.5 rounded-full border border-black/80 font-sans text-[9px] sm:text-sm font-semibold">
                        {font.stylesEn}
                      </span>
                      <span className="px-2 sm:px-5 py-0.5 sm:py-1.5 rounded-full border border-black/80 font-sans text-[9px] sm:text-sm font-semibold">
                        {font.stylesAr}
                      </span>
                    </div>

                    {/* HUGE Font Title */}
                    <div className="text-center my-auto py-4 sm:py-0 sm:my-10">
                      <h2
                        style={{ fontFamily: font.fontFamily }}
                        className="text-5xl sm:text-8xl font-extrabold leading-none text-black"
                      >
                        {font.title}
                      </h2>
                    </div>

                    {/* Specimen — hidden on mobile to keep grid clean */}
                    <div className="hidden sm:flex text-center flex-col gap-0.5">
                      <div className="font-sans text-xl font-semibold text-black leading-snug">
                        أَبْجَدْ هَوَّزْ حُطِّي كَلَمُنْ سَعَفَصْ
                      </div>
                      <div className="font-sans text-base font-medium text-black/75">
                        The quick brown fox jumps over the lazy dog
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))
          )}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
