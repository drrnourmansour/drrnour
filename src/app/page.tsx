"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTransitionNav } from "@/components/TransitionProvider";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const { navigateTo } = useTransitionNav();
  const { theme } = useTheme();

  const menuItems = [
    { title: "عنّي", subtitle: "About", href: "/about", color: "#C4735A", darkColor: "#5C3023" },
    { title: "المدوّنة", subtitle: "Journal", href: "/journal", color: "#9BAF8A", darkColor: "#333E2B" },
    { title: "أعمالي", subtitle: "Works", href: "/works", color: "#E8C87A", darkColor: "#57471F" },
    { title: "الفرش", subtitle: "Brushes", href: "/brushes", color: "#7ABCE8", darkColor: "#214257" },
  ];

  const activeItem = menuItems.find((item) => item.href === hoveredHref);
  const bgColor = activeItem
    ? theme === "dark"
      ? activeItem.darkColor
      : activeItem.color
    : theme === "dark"
      ? "#141311"
      : "#FAF9F6";

  return (
    <motion.main
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 transition-colors duration-500 ease-out"
      animate={{ backgroundColor: bgColor }}
      onMouseLeave={() => setHoveredHref(null)}
    >
      <h1 className="sr-only">نور منصور — مسبك خطوط عربية ولاتينية وهندسة طباعية رقمية</h1>
      <div className="flex flex-col items-center justify-center gap-7 sm:gap-9 text-center py-12">
        {menuItems.map((item) => (
          <motion.div
            key={item.href}
            onMouseEnter={() => setHoveredHref(item.href)}
            className="flex flex-col items-center justify-center cursor-pointer group select-none"
            onClick={() => navigateTo(item.href)}
          >
            <span
              style={{ fontFamily: "'Arsenica', serif", fontWeight: 700 }}
              className="text-[clamp(2.4rem,5vw,3.5rem)] font-bold leading-tight text-ink dark:text-offwhite block transition-colors"
            >
              {item.title}
            </span>
            <span
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              className="text-sm sm:text-base font-medium text-[#1A1916]/60 dark:text-[#FAF9F6]/60 tracking-normal block mt-2.5 transition-all duration-200 group-hover:font-bold group-hover:text-[#1A1916] dark:group-hover:text-[#FAF9F6] group-hover:tracking-wider"
            >
              {item.subtitle}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
