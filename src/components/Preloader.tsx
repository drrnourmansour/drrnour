"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center w-full h-full select-none"
        >
          {/* Ambient Soft Radial Glow Aura */}
          <motion.div
            animate={{
              scale: [0.85, 1.25, 0.85],
              opacity: [0.12, 0.3, 0.12],
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-amber-200 via-lime-200 to-teal-200 blur-2xl pointer-events-none"
          />

          {/* Logo with Smooth Floating & Pulse Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.94, 1.06, 0.94],
              opacity: [0.85, 1, 0.85],
              y: [0, -5, 0],
            }}
            transition={{
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <img
              src="/logo.png"
              alt="نور محمد"
              className="h-20 sm:h-28 w-auto object-contain drop-shadow-sm"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
