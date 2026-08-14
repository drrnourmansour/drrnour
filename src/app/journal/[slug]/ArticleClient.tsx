"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTransitionNav } from "@/components/TransitionProvider";

interface ArticleProps {
  article: {
    title: string;
    date: string;
    readTime: string;
    tag: string;
    bgAccent: string;
    body: string[];
  } | null;
}

export default function ArticleClient({ article }: ArticleProps) {
  const { navigateTo } = useTransitionNav();

  if (!article) {
    return (
      <main className="min-h-screen pt-40 text-center px-6">
        <h1 className="text-4xl font-bold font-serif mb-4">المقال غير موجود</h1>
        <button onClick={() => navigateTo("/journal")} className="underline font-sans text-lg">
          العودة للمدوّنة
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-12 max-w-[820px] mx-auto">
      {/* Back */}
      <button
        onClick={() => navigateTo("/journal")}
        className="inline-flex items-center gap-2 text-black/50 hover:text-black font-sans text-sm font-semibold mb-10 transition-colors"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span>المدوّنة</span>
      </button>

      {/* Accent bar */}
      <div className="h-1.5 w-20 rounded-full mb-8" style={{ backgroundColor: article.bgAccent }} />

      {/* Header */}
      <div className="text-right mb-10 sm:mb-14">
        <div className="flex items-center justify-between mb-5">
          <span className="font-sans text-xs font-bold tracking-widest text-black/35 uppercase">
            {article.readTime} قراءة
          </span>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-black/5 font-sans text-xs font-bold text-black/50">
              {article.tag}
            </span>
            <span className="font-sans text-sm text-black/40">{article.date}</span>
          </div>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-5xl font-extrabold text-black leading-tight"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          {article.title}
        </motion.h1>
      </div>

      {/* Body */}
      <article className="text-right">
        {article.body.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="font-sans text-lg sm:text-xl text-black/75 leading-loose mb-8"
            style={{ fontFamily: "'Arsenica', serif" }}
          >
            {para}
          </motion.p>
        ))}
      </article>

      {/* Footer */}
      <div className="mt-14 pt-10 border-t border-black/10 flex items-center justify-between text-sm text-black/40 font-sans">
        <button onClick={() => navigateTo("/journal")} className="hover:text-black transition-colors flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 rotate-180" /> العودة للمدوّنة
        </button>
        <span>{article.date}</span>
      </div>
    </main>
  );
}
