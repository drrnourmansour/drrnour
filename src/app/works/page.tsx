"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

const worksCategories = [
  {
    id: "type-design",
    titleAr: "تصميم الخطوط",
    titleEn: "Type Design",
    desc: "خطوط عربية ولاتينية معاصرة ومتغيّرة مصمّمة بعناية للوسائط الرقمية والمطبوعة.",
    bg: "#E8C87A",
    darkBg: "#3E3317",
  },
  {
    id: "logotypes",
    titleAr: "الشعارات والهويات",
    titleEn: "Logotypes & Branding",
    desc: "صياغة أسماء العلامات التجارية بخط عربي أصيل وهندسة طباعية رصينة.",
    bg: "#C4735A",
    darkBg: "#45241B",
  },
  {
    id: "lettering",
    titleAr: "الخط الحرّ والتشكيل",
    titleEn: "Custom Lettering",
    desc: "مشاريع حروفية وتجارب بصرية تمزج بين التراث الخطّي والحداثة.",
    bg: "#9BAF8A",
    darkBg: "#283121",
  },
];

export default function WorksPage() {
  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-12 max-w-[1100px] mx-auto text-ink dark:text-offwhite">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 sm:mb-20 text-right"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1
            style={{ fontFamily: "'Arsenica', serif" }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-ink dark:text-offwhite"
          >
            أعمالي
          </h1>
          <span
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-black/50 dark:text-offwhite/50"
          >
            Works
          </span>
        </div>
        <p className="text-base sm:text-lg text-black/70 dark:text-offwhite/70 max-w-2xl leading-relaxed">
          مختارات من المشاريع والتجارب في تصميم الخطوط العربية واللاتينية، الشعارات، والهندسة الطباعية الرقمية.
        </p>
      </motion.section>

      {/* Coming Soon Banner Card */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 rounded-3xl border border-black/10 dark:border-white/15 bg-[#EAE6DF]/70 dark:bg-white/[0.04] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>قريباً — Coming Soon</span>
          </div>
          <h2
            style={{ fontFamily: "'Arsenica', serif" }}
            className="text-2xl sm:text-3xl font-bold text-ink dark:text-offwhite"
          >
            معرض الأعمال الكامل قيد التجهيز
          </h2>
          <p className="text-sm sm:text-base text-black/65 dark:text-offwhite/65 max-w-xl">
            يتم حالياً توثيق وتجهيز دراسات الحالة والمشاريع الطباعية لعرضها هنا قريباً.
          </p>
        </div>

        <Link
          href="/fonts"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink dark:bg-offwhite text-offwhite dark:text-ink text-xs sm:text-sm font-bold hover:opacity-85 transition-opacity shrink-0"
        >
          <span>تصفّح الخطوط</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </motion.section>

      {/* Categories Preview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {worksCategories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
            className="rounded-2xl border border-black/10 dark:border-white/15 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] bg-white/60 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between gap-2 mb-6">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ backgroundColor: cat.bg }}
                aria-hidden="true"
              />
              <span
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                className="text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-offwhite/45"
              >
                {cat.titleEn}
              </span>
            </div>

            <div>
              <h3
                style={{ fontFamily: "'Arsenica', serif" }}
                className="text-2xl font-bold mb-2 text-ink dark:text-offwhite"
              >
                {cat.titleAr}
              </h3>
              <p className="text-sm text-black/65 dark:text-offwhite/65 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
