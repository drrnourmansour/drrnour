"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.94 4.66a1.5 1.5 0 0 0-1.6-.24L2.97 11.42a1.3 1.3 0 0 0 .06 2.43l4.38 1.46 1.68 5.26a1 1 0 0 0 1.67.4l2.45-2.46 4.44 3.28a1.45 1.45 0 0 0 2.28-.88l2.53-14.6a1.5 1.5 0 0 0-.52-1.65ZM9.85 15.16l-.65 3.1-.96-3.02 9.48-6.66-7.87 6.58Z" />
    </svg>
  );
}

const services = [
  {
    icon: "✦",
    titleAr: "تصميم فرش وخطوط عربية مخصصة",
    titleEn: "Custom Arabic Brushes & Type",
    desc: "تطوير عائلات خطوط وحزم فرش رقمية حصرية تعكس الهوية البصرية وتمنحها صوتا طباعيا فريدا في كافة الوسائط الرقمية والمطبوعة.",
  },
  {
    icon: "◐",
    titleAr: "الهوية البصرية والشعارات",
    titleEn: "Visual Identity & Logotypes",
    desc: "تصميم أسماء العلامات التجارية بخطوط عربية يدوية، بالإضافة إلى الشعارات اللاتينية.",
  },
];

const stats = [
  { value: "١٠+", label: "فرش مصمّمة" },
  { value: "٢", label: "لغة — عربي ولاتيني" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-12 max-w-[1100px] mx-auto text-ink dark:text-offwhite">
      {/* ── Hero Header ── */}
      <section className="mb-16 sm:mb-24 text-right">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-sm font-bold tracking-widest text-black/40 dark:text-offwhite/40 uppercase mb-4"
        >
          About — عنّي
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-serif text-4xl sm:text-7xl font-extrabold mb-6 leading-tight text-ink dark:text-offwhite"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          نور منصور
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-sans text-lg sm:text-2xl leading-relaxed text-black/80 dark:text-offwhite/85 max-w-2xl"
        >
          طالب مُسلم يدرس علم الطب بجامعة القاهرة بمصر، هاوي ومصمم متخصص في صناعة الفرش الرقمية وتصميم الخطوط العربية منها واللاتينية.
        </motion.p>
      </section>

      {/* ── Stats Row ── */}
      <section className="mb-16 sm:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 dark:bg-white/15 border border-black/10 dark:border-white/15 rounded-3xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="bg-offwhite dark:bg-[#141311] px-6 sm:px-10 py-8 sm:py-10 text-right"
            >
              <div
                className="text-4xl sm:text-5xl font-extrabold text-black dark:text-offwhite mb-1"
                style={{ fontFamily: "'Arsenica', serif" }}
              >
                {s.value}
              </div>
              <div className="font-sans text-sm text-black/50 dark:text-offwhite/55 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-right border-b border-black/10 dark:border-white/15 pb-4 text-ink dark:text-offwhite">
          الخدمات والحلول الطباعية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="border border-black/8 dark:border-white/15 rounded-3xl p-7 sm:p-9 bg-offwhite dark:bg-white/[0.03] hover:bg-[#F0EDE8] dark:hover:bg-white/[0.06] hover:shadow-md transition-all duration-300 text-right"
            >
              <div className="text-3xl mb-4 text-black/30 dark:text-offwhite/30">{svc.icon}</div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1 text-black dark:text-offwhite">{svc.titleAr}</h3>
              <p className="font-sans text-xs text-black/40 dark:text-offwhite/45 font-semibold tracking-widest uppercase mb-3">{svc.titleEn}</p>
              <p className="font-sans text-sm sm:text-base text-black/65 dark:text-offwhite/70 leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8 text-right border-b border-black/10 dark:border-white/15 pb-4 text-ink dark:text-offwhite">
          كيف أعمل
        </h2>
        <div className="flex flex-col gap-0">
          {[
            { title: "الاستكشاف والبحث", desc: "أبدأ بفهم عميق للمشروع — هويته الثقافية، قيمه البصرية، وجمهوره المستهدف." },
            { title: "رسم التصورات والمقترحات", desc: "أبدأ بالرسم اليدوي لاستكشاف الأشكال الخطية قبل الانتقال إلى البيئة الرقمية." },
            { title: "بناء الخط رقميا", desc: "تحويل الرسومات إلى خط رقمي متكامل بتقنيات OpenType وVariable axis." },
            { title: "الاختبار والصقل", desc: "اختبار مكثف على شاشات مختلفة، أوزان، وأحجام لضمان الجودة والانسجام." },
          ].map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="py-7 border-b border-black/10 dark:border-white/15 text-right"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-black dark:text-offwhite mb-1">{step.title}</h3>
              <p className="font-sans text-sm sm:text-base text-black/60 dark:text-offwhite/65 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A1916] dark:bg-white/[0.06] border border-transparent dark:border-white/15 rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="text-right">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-[#FAF9F6]">هل لديك مشروع خط مخصص؟</h2>
          <p className="font-sans text-sm text-[#FAF9F6]/60 max-w-sm">
            تواصل معي لبدء مناقشة تفاصيل المشروع ورسم الهوية الطباعية المناسبة.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
          <a
            href="https://t.me/drrnour"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FAF9F6] text-[#1A1916] font-sans text-sm font-extrabold px-6 py-3 rounded-full hover:bg-[#FFE500] transition-colors flex items-center gap-2"
          >
            <TelegramIcon className="w-4 h-4" /> @drrnour
          </a>
          <a
            href="mailto:nourmohamedanwar@gmail.com"
            className="border border-[#FAF9F6]/30 text-[#FAF9F6] font-sans text-sm font-bold px-6 py-3 rounded-full hover:bg-[#FAF9F6]/10 transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> راسلني
          </a>
        </div>
      </section>
    </main>
  );
}
