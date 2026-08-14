"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const articles = [
  {
    id: "poetic-house",
    date: "٢٢ نوفمبر ٢٠٢٥",
    dateEn: "22 Nov 2025",
    title: "البيت الشعريُّ وتصميم الخطِّ العربيِّ",
    excerpt: "عن تقديم الخطِّ في سياقٍ يستند إلى الذَّاكرة الثَّقافيَّة العربيَّة — وكيف تُصبح الحروف شاهداً على الهُوِيَّة.",
    tag: "نظريّة",
    readTime: "٧ دقائق",
    featured: true,
    bgAccent: "#E8C87A",
  },
  {
    id: "talheen-story",
    date: "٣١ أكتوبر ٢٠٢٤",
    dateEn: "31 Oct 2024",
    title: "تلحين: خطٌّ يدويٌّ بنكهة الشَّخابيط",
    excerpt: "إلى أيِّ مدى يمكن أن يكون الخطُّ الرقميُّ عفويًّا وطبيعيًّا؟ رحلة تصميم خط تلحين من الورقة إلى الشاشة.",
    tag: "خطوط",
    readTime: "١٢ دقيقة",
    featured: false,
    bgAccent: "#96B5A4",
  },
  {
    id: "variable-fonts",
    date: "١٧ يوليو ٢٠٢٣",
    dateEn: "17 Jul 2023",
    title: "الخطوط المتغيّرة، وتجارب بصريّة جديدة",
    excerpt: "استخدام الخطوط المتغيّرة لتصميم خطوطٍ عربيَّة أكثر مرونة واستجابةً على منصات الويب الحديثة.",
    tag: "تقنية",
    readTime: "٩ دقائق",
    featured: false,
    bgAccent: "#C9BECC",
  },
  {
    id: "bilingual-harmony",
    date: "٢ مارس ٢٠٢٣",
    dateEn: "2 Mar 2023",
    title: "الانسجام الطباعيّ بين العربي والرومانيّ",
    excerpt: "ماذا يعني أن يتحدَّث الخطَّانِ بلغةٍ بصريَّة واحدة؟ ضوابط التناسب والتوازن بين الأبجديَّتَين.",
    tag: "نظريّة",
    readTime: "١٠ دقائق",
    featured: false,
    bgAccent: "#D4907A",
  },
  {
    id: "kufi-revival",
    date: "٨ سبتمبر ٢٠٢٢",
    dateEn: "8 Sep 2022",
    title: "الكوفيُّ الحديث: تراثٌ في شكلٍ جديد",
    excerpt: "كيف يُعيد المصمِّمون المعاصرون قراءة الخطِّ الكوفيِّ بأدواتٍ رقميَّة ورؤيةٍ مستقبليَّة.",
    tag: "تاريخ",
    readTime: "٨ دقائق",
    featured: false,
    bgAccent: "#C8BF8A",
  },
];

const allTags = ["الكل", "نظريّة", "خطوط", "تقنية", "تاريخ"];

export default function JournalPage() {
  const [activeTag, setActiveTag] = useState("الكل");

  const featured = articles.find((a) => a.featured)!;
  const filtered = articles
    .filter((a) => !a.featured)
    .filter((a) => activeTag === "الكل" || a.tag === activeTag);

  return (
    <main className="min-h-screen body-journal pt-28 sm:pt-36 pb-24 px-4 sm:px-12 max-w-[1350px] mx-auto">

      {/* ── Title + Tags ── */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 sm:gap-20 mb-14 sm:mb-20 items-end">
        <div className="text-right">
          <h1
            className="font-serif text-5xl sm:text-7xl font-extrabold text-black leading-none mb-3"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            المُدَوَّنَة
          </h1>
          <p className="font-sans text-base text-black/55 leading-relaxed">
            كُرَّاسةُ أفكارٍ متَفَرِّقة عن التَّصميم الطِّباعيِّ.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 flex-wrap justify-end md:justify-start">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full font-sans text-sm font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/60 hover:bg-black/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured Article ── */}
      {(activeTag === "الكل" || activeTag === featured.tag) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-20"
        >
          <Link
            href={`/journal/${featured.id}`}
            className="group block rounded-[28px] sm:rounded-[36px] overflow-hidden border border-black/10 hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Coloured accent bar */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: featured.bgAccent }}
            />
            <div className="p-8 sm:p-14 text-right bg-offwhite">
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans text-xs font-bold tracking-widest text-black/40 uppercase">
                  {featured.readTime} قراءة
                </span>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-black/5 font-sans text-xs font-bold text-black/60">
                    {featured.tag}
                  </span>
                  <span className="font-sans text-sm text-black/40">{featured.date}</span>
                </div>
              </div>
              <h2
                className="font-serif text-3xl sm:text-5xl font-extrabold text-black leading-tight mb-4 group-hover:text-black/70 transition-colors"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {featured.title}
              </h2>
              <p className="font-sans text-lg sm:text-xl text-black/60 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>
            </div>
          </Link>
        </motion.div>
      )}

      {/* ── Articles Feed ── */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 sm:gap-20 items-start">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block md:sticky md:top-36 text-right">
          <p className="font-sans text-xs font-bold tracking-widest text-black/30 uppercase mb-6">
            جميع المقالات
          </p>
          <div className="flex flex-col gap-4">
            {filtered.map((a) => (
              <Link
                key={a.id}
                href={`/journal/${a.id}`}
                className="font-serif text-lg font-bold text-black/40 hover:text-black transition-colors leading-snug"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Feed */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {filtered.length === 0 ? (
            <p className="font-sans text-black/40 text-center py-20">لا توجد مقالات في هذه الفئة بعد.</p>
          ) : (
            filtered.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ x: -6 }}
              >
                <Link href={`/journal/${art.id}`} className="flex flex-col gap-3 group block text-right">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-black/35 uppercase tracking-widest">
                      {art.readTime} قراءة
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-0.5 rounded-full bg-black/5 font-sans text-xs font-semibold text-black/50">
                        {art.tag}
                      </span>
                      <span className="font-sans text-sm text-black/40">{art.date}</span>
                    </div>
                  </div>
                  <h2
                    className="font-serif text-2xl sm:text-3xl font-bold text-black group-hover:text-black/55 transition-colors leading-tight"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {art.title}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-black/55 leading-relaxed">
                    {art.excerpt}
                  </p>
                  <div
                    className="h-px w-full mt-4"
                    style={{ backgroundColor: art.bgAccent, opacity: 0.5 }}
                  />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
