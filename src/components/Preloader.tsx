"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 950);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-offwhite dark:bg-[#141311] flex flex-col items-center justify-center w-full h-full select-none"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Masked upward logo reveal */}
            <div className="overflow-hidden py-1">
              <motion.img
                src="/logo.png"
                alt="نور منصور"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="h-20 sm:h-24 w-auto object-contain dark:invert"
              />
            </div>

            {/* Subtle editorial wordmark */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              className="text-[10px] font-semibold tracking-[0.35em] uppercase text-ink/45 dark:text-offwhite/45"
            >
              NOUR MANSOUR
            </motion.span>

            {/* Hairline 1px progress bar */}
            <div
              dir="ltr"
              className="w-28 sm:w-36 h-[1px] bg-black/10 dark:bg-white/10 overflow-hidden"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-ink dark:bg-offwhite origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
