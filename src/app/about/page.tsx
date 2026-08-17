"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: "✦",
    titleAr: "تصميم خطوط عربية مخصصة",
    titleEn: "Custom Arabic Type Design",
    desc: "تطوير عائلات خطوط حصرية تعكس الهوية البصرية للشركة وتمنحها صوتا طباعيا فريدا في كافة الوسائط الرقمية والمطبوعة.",
  },
  {
    icon: "◈",
    titleAr: "الخطوط المتغيرة (Variable Fonts)",
    titleEn: "Variable Font Engineering",
    desc: "برمجة وتجميع تقنيات OpenType وVariable Fonts لتوفير مرونة فائقة في الأوزان والعروض على شاشات الويب والتطبيقات الحديثة.",
  },
  {
    icon: "⬡",
    titleAr: "الملاءمة ثنائية اللغة",
    titleEn: "Arabic–Latin Harmonisation",
    desc: "تصميم الحروف العربية للتناغم التام مع الخطوط اللاتينية العالمية من حيث السمك، الارتفاع، والروح البصرية العامة.",
  },
  {
    icon: "◐",
    titleAr: "تصميم الشعارات والـ Logotypes",
    titleEn: "Logo & Logotype Lettering",
    desc: "صياغة أسماء العلامات التجارية بخط عربي أصيل (ثلث، كوفي، رقعة، ديواني، أو خط حديث) بقواعد هندسية رصينة.",
  },
];

const stats = [
  { value: "٨+", label: "سنوات خبرة" },
  { value: "٤٠+", label: "خط مصمّم" },
  { value: "١٢٠+", label: "عميل حول العالم" },
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
    <main className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-12 max-w-[1100px] mx-auto text-ink">

      {/* ── Hero Header ── */}
      <section className="mb-16 sm:mb-24 text-right">
        {/* Decorative large monogram */}
        <div
          className="text-[120px] sm:text-[220px] font-extrabold leading-none select-none text-black/[0.04] absolute right-4 sm:right-12 top-16 pointer-events-none"
          style={{ fontFamily: "'Arsenica', serif" }}
          aria-hidden
        >
          نور
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-sm font-bold tracking-widest text-black/40 uppercase mb-4"
        >
          About — عنّي
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-serif text-4xl sm:text-7xl font-extrabold mb-6 leading-tight"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          نور محمد
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-sans text-lg sm:text-2xl leading-relaxed text-black/80 max-w-2xl mb-6"
        >
          مصمم وأخصائي متخصص في صناعة الخطوط العربية واللاتينية والهندسة الطباعية الرقمية. أركز في عملي على دمج التراث الخطي العربي الأصيل مع أرقى معايير التقنية المعاصرة والخطوط المتغيرة.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="font-sans text-base sm:text-lg text-black/60 leading-relaxed max-w-xl"
        >
          أقدم حلولا طباعية مخصصة للعلامات التجارية والمؤسسات الثقافية والمجلات العصرية — بدءا من تصميم حروف الشعارات وحتى ابتكار عائلات خطوط كاملة ثنائية اللغة.
        </motion.p>
      </section>

      {/* ── Stats Row ── */}
      <section className="mb-16 sm:mb-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/10 border border-black/10 rounded-3xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-offwhite px-6 sm:px-10 py-8 sm:py-10 text-right"
            >
              <div
                className="text-4xl sm:text-5xl font-extrabold text-black mb-1"
                style={{ fontFamily: "'Arsenica', serif" }}
              >
                {s.value}
              </div>
              <div className="font-sans text-sm text-black/50 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-right border-b border-black/10 pb-4">
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
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="border border-black/8 rounded-3xl p-7 sm:p-9 bg-offwhite hover:bg-[#F0EDE8] hover:shadow-md transition-all duration-300 text-right"
            >
              <div className="text-3xl mb-4 text-black/30">{svc.icon}</div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1 text-black">{svc.titleAr}</h3>
              <p className="font-sans text-xs text-black/40 font-semibold tracking-widest uppercase mb-3">{svc.titleEn}</p>
              <p className="font-sans text-sm sm:text-base text-black/65 leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8 text-right border-b border-black/10 pb-4">
          كيف أعمل
        </h2>
        <div className="flex flex-col gap-0">
          {[
            { n: "٠١", title: "الاستكشاف والبحث", desc: "أبدأ بفهم عميق للمشروع — هويته الثقافية، قيمه البصرية، وجمهوره المستهدف." },
            { n: "٠٢", title: "رسم التصورات والمقترحات", desc: "أبدأ بالرسم اليدوي لاستكشاف الأشكال الخطية قبل الانتقال إلى البيئة الرقمية." },
            { n: "٠٣", title: "بناء الخط رقميا", desc: "تحويل الرسومات إلى خط رقمي متكامل بتقنيات OpenType وVariable axis." },
            { n: "٠٤", title: "الاختبار والصقل", desc: "اختبار مكثف على شاشات مختلفة، أوزان، وأحجام لضمان الجودة والانسجام." },
          ].map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-start gap-6 sm:gap-10 py-7 border-b border-black/10 text-right"
            >
              <div
                className="text-5xl sm:text-6xl font-extrabold text-black/08 shrink-0 leading-none"
                style={{ fontFamily: "'Arsenica', serif" }}
              >
                {step.n}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-black mb-1">{step.title}</h3>
                <p className="font-sans text-sm sm:text-base text-black/60 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A1916] rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="text-right sm:text-right">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-[#FAF9F6]">هل لديك مشروع خط مخصص؟</h2>
          <p className="font-sans text-sm text-[#FAF9F6]/60 max-w-sm">
            تواصل معي لبدء مناقشة تفاصيل المشروع ورسم الهوية الطباعية المناسبة.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
          <a
            href="https://instagram.com/drrnour"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FAF9F6] text-[#1A1916] font-sans text-sm font-extrabold px-6 py-3 rounded-full hover:bg-[#FFE500] transition-colors flex items-center gap-2"
          >
            <img src="/ICONS/Instagram.png" alt="Instagram" className="w-4 h-4 object-contain" /> @drrnour
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
