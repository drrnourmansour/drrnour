"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function JournalPage() {
  return (
    <main className="min-h-screen body-journal pt-28 sm:pt-36 pb-24 px-4 sm:px-12 max-w-[1350px] mx-auto">
      {/* ── Title & Subtitle ── */}
      <div className="mb-14 sm:mb-20 text-right">
        <h1
          className="font-serif text-5xl sm:text-7xl font-extrabold text-black dark:text-offwhite leading-none mb-4"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          المدوّنة
        </h1>
        <p className="font-sans text-base sm:text-lg text-black/65 dark:text-offwhite/65 leading-relaxed max-w-2xl">
          كراسة لمشاركة أفكاري وبعضاً من مدوناتي..!
        </p>
      </div>

      {/* ── Coming Soon Placeholder ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[28px] sm:rounded-[36px] border border-black/10 dark:border-white/15 bg-offwhite/85 dark:bg-white/[0.04] p-8 sm:p-14 text-right"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold text-black/75 dark:text-offwhite/80 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#9BAF8A]" />
          <span>قريباً — Coming Soon</span>
        </div>
        <h2
          className="font-serif text-2xl sm:text-4xl font-extrabold text-black dark:text-offwhite mb-3"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          التدوينات قيد التحضير
        </h2>
        <p className="font-sans text-base sm:text-lg text-black/60 dark:text-offwhite/60 leading-relaxed max-w-xl">
          ستُضاف هنا المقالات والخواطر حول تصميم الخطوط والفرش الرقمية والتجارب البصرية قريباً.
        </p>
      </motion.section>
    </main>
  );
}
