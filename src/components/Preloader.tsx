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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center w-full h-full"
        >
          <motion.div
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ fontFamily: "'Aref Ruqaa', 'Amiri', serif", fontWeight: 700 }}
            className="text-7xl sm:text-8xl text-black select-none tracking-tight"
          >
            نور
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
