"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Mail, Menu, X } from "lucide-react";
import { useTransitionNav } from "@/components/TransitionProvider";
import { useTheme } from "@/components/ThemeProvider";

function ThemeHalfCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { navigateTo } = useTransitionNav();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const navLinks = [
    { nameAr: "عنّي", nameEn: "About", href: "/about" },
    { nameAr: "المدوّنة", nameEn: "Journal", href: "/journal" },
    { nameAr: "أعمالي", nameEn: "Works", href: "/works" },
    { nameAr: "الفرش", nameEn: "Brushes", href: "/brushes" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-3 sm:py-4 flex items-center justify-between bg-transparent transition-colors duration-400">
        {/* Right: Brand Logo */}
        <button
          onClick={() => navigateTo("/")}
          className="inline-block select-none cursor-pointer"
          title="نور منصور"
        >
          <img src="/logo.png" alt="نور منصور" className="h-10 sm:h-14 w-auto object-contain dark:invert transition-opacity duration-300 hover:opacity-75" />
        </button>

        {/* Left: Navigation Links + Social Icons */}
        <div className="flex items-center gap-8">
          {/* Text Links (Subpages Only - Hidden on Homepage '/' since categories are centered on screen) */}
          {!isHome && (
            <ul className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => navigateTo(link.href)}
                      className="relative block overflow-hidden h-[28px] group px-1 cursor-pointer"
                    >
                      <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[28px]">
                        <span
                          style={{ fontFamily: "'Arsenica', serif" }}
                          className={`block text-[1.1rem] h-[28px] leading-[28px] text-black dark:text-offwhite text-center transition-colors ${isActive ? "font-bold border-b-[2px] border-black dark:border-offwhite opacity-100" : "font-medium opacity-85"
                            }`}
                        >
                          {link.nameAr}
                        </span>
                        <span className="block font-sans text-xs font-semibold tracking-widest h-[28px] leading-[28px] text-black/80 dark:text-offwhite/80 uppercase text-center">
                          {link.nameEn}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Theme Toggle & Social Icons — Always visible on homepage, desktop-only on subpages */}
          <div className={`flex items-center gap-4 ${!isHome ? "hidden md:flex" : "flex"}`}>
            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative block overflow-hidden h-[28px] w-[28px] group shrink-0 cursor-pointer"
              title={theme === "dark" ? "الوضع الفاتح — Light Mode" : "الوضع الداكن — Dark Mode"}
              aria-label={theme === "dark" ? "تبديل إلى الوضع الفاتح" : "تبديل إلى الوضع الداكن"}
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[28px]">
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black dark:text-offwhite shrink-0">
                  <ThemeHalfCircleIcon className="w-5 h-5" />
                </div>
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black/70 dark:text-offwhite/70 shrink-0">
                  <ThemeHalfCircleIcon className="w-5 h-5 rotate-180 transition-transform duration-300" />
                </div>
              </div>
            </button>

            {/* Mail Icon */}
            <a
              href="mailto:nourmohamedanwar@gmail.com"
              className="relative block overflow-hidden h-[28px] w-[28px] group shrink-0"
              title="البريد الإلكتروني"
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[28px]">
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black dark:text-offwhite shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.25]" />
                </div>
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black/70 dark:text-offwhite/70 shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </a>

            {/* Instagram Icon linking to @drrnour */}
            <a
              href="https://instagram.com/drrnour"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block overflow-hidden h-[28px] w-[28px] group shrink-0"
              title="انستغرام (@drrnour)"
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[28px]">
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black dark:text-offwhite shrink-0">
                  <Instagram className="w-5 h-5 stroke-[2.25]" />
                </div>
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black/70 dark:text-offwhite/70 shrink-0">
                  <Instagram className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </a>
          </div>

          {/* Mobile Controls (Subpages Only): Theme Toggle + Hamburger */}
          {!isHome && (
            <div className="md:hidden flex items-center gap-2 z-50">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 text-black dark:text-offwhite hover:opacity-70 transition-opacity focus:outline-none"
                aria-label={theme === "dark" ? "تبديل إلى الوضع الفاتح" : "تبديل إلى الوضع الداكن"}
                title={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
              >
                <ThemeHalfCircleIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-black dark:text-offwhite hover:opacity-70 transition-opacity focus:outline-none"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? (
                  <X className="w-7 h-7 stroke-[2]" />
                ) : (
                  <Menu className="w-7 h-7 stroke-[2]" />
                )}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay (Subpages Only) */}
      <AnimatePresence>
        {!isHome && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-offwhite dark:bg-[#141311] flex flex-col justify-between px-8 pt-28 pb-12 md:hidden"
          >
            {/* Nav Links Stack */}
            <div className="flex flex-col gap-6 text-right">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo(link.href);
                    }}
                    className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 w-full group"
                  >
                    {/* Arabic — right side (first child in RTL flex) */}
                    <span
                      style={{ fontFamily: "'Arsenica', serif" }}
                      className={`text-4xl font-bold text-black dark:text-offwhite transition-colors ${isActive ? "text-black dark:text-offwhite border-b-2 border-black dark:border-offwhite" : ""
                        }`}
                    >
                      {link.nameAr}
                    </span>
                    {/* English label — left side (second child in RTL flex) */}
                    <span className="font-sans text-xs font-bold tracking-widest text-black/40 dark:text-offwhite/40 uppercase">
                      {link.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer & Socials */}
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="flex items-center gap-6 w-full justify-center">
                <a
                  href="https://instagram.com/drrnour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-offwhite hover:opacity-50 transition-opacity"
                  title="@drrnour"
                >
                  <Instagram className="w-6 h-6 stroke-[1.75]" />
                </a>
                <a
                  href="mailto:nourmohamedanwar@gmail.com"
                  className="text-black dark:text-offwhite hover:opacity-50 transition-opacity"
                  title="البريد الإلكتروني"
                >
                  <Mail className="w-6 h-6 stroke-[1.75]" />
                </a>
              </div>

              <p className="font-sans text-xs text-black/50 dark:text-offwhite/50">
                نور منصور — مصمم وأخصائي خطوط عربية ولاتينية
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
