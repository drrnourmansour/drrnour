"use client";

import { motion } from "framer-motion";
import { useTransitionNav } from "@/components/TransitionProvider";

export default function NotFound() {
  const { navigateTo } = useTransitionNav();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Large decorative 404 */}
      <div
        className="text-[clamp(8rem,25vw,20rem)] font-extrabold leading-none select-none text-black/[0.05] mb-2"
        style={{ fontFamily: "'Aref Ruqaa', 'Amiri', serif" }}
        aria-hidden
      >
        ٤٠٤
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="-mt-12 sm:-mt-20 relative z-10"
      >
        <p className="font-sans text-xs font-bold tracking-widest text-black/40 uppercase mb-4">
          404 — Page Not Found
        </p>
        <h1
          className="font-serif text-3xl sm:text-5xl font-extrabold text-black mb-4 leading-tight"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          الصفحة غير موجودة
        </h1>
        <p className="font-sans text-base sm:text-lg text-black/55 max-w-sm mx-auto mb-10 leading-relaxed">
          يبدو أن الرابط الذي وصلت إليه غير موجود أو تم نقله.
        </p>

        <div className="flex items-center gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigateTo("/")}
            className="bg-black text-white font-sans font-bold text-sm px-7 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            العودة للرئيسية
          </button>
          <button
            onClick={() => navigateTo("/fonts")}
            className="border border-black/20 text-black font-sans font-bold text-sm px-7 py-3 rounded-full hover:bg-black/5 transition-colors"
          >
            تصفّح الخطوط
          </button>
        </div>
      </motion.div>
    </main>
  );
}
