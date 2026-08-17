"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTransitionNav } from "@/components/TransitionProvider";

export default function Home() {
  const [bgColor, setBgColor] = useState<string>("#FAF9F6");
  const { navigateTo } = useTransitionNav();

  const menuItems = [
    { title: "خطوط", subtitle: "Fonts", href: "/fonts", color: "#E8C87A" },
    { title: "فرش", subtitle: "Brushes", href: "/brushes", color: "#7ABCE8" },
    { title: "المدوّنة", subtitle: "Journal", href: "/journal", color: "#9BAF8A" },
    { title: "عنّي", subtitle: "About", href: "/about", color: "#C4735A" },
  ];

  return (
    <motion.main
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 transition-colors duration-500 ease-out"
      animate={{ backgroundColor: bgColor }}
    >
      <h1 className="sr-only">نور محمد — مسبك خطوط عربية ولاتينية وهندسة طباعية رقمية</h1>
      <div className="flex flex-col items-center justify-center gap-7 sm:gap-9 text-center py-12">
        {menuItems.map((item) => (
          <motion.div
            key={item.href}
            onMouseEnter={() => setBgColor(item.color)}
            className="flex flex-col items-center justify-center cursor-pointer group select-none"
            onClick={() => navigateTo(item.href)}
          >
            <span
              style={{ fontFamily: "'Arsenica', serif", fontWeight: 700 }}
              className="text-[clamp(2.4rem,5vw,3.5rem)] font-bold leading-tight text-ink block transition-colors"
            >
              {item.title}
            </span>
            <span
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              className="text-sm sm:text-base font-medium text-[#1A1916]/60 tracking-normal block mt-1 transition-all duration-200 group-hover:font-bold group-hover:text-[#1A1916] group-hover:tracking-wider"
            >
              {item.subtitle}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
