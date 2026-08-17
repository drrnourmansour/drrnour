"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { useTransitionNav } from "@/components/TransitionProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { navigateTo } = useTransitionNav();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const navLinks = [
    { nameAr: "خطوط", nameEn: "Fonts", href: "/fonts" },
    { nameAr: "فرش", nameEn: "Brushes", href: "/brushes" },
    { nameAr: "المدونة", nameEn: "Journal", href: "/journal" },
    { nameAr: "عنّي", nameEn: "About", href: "/about" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-3 sm:py-4 flex items-center justify-between bg-transparent transition-colors duration-400">
        {/* Right: Brand Logo */}
        <button
          onClick={() => navigateTo("/")}
          className="inline-block select-none cursor-pointer"
          title="نور محمد"
        >
          <img src="/logo.png" alt="نور محمد" className="h-10 sm:h-14 w-auto object-contain" />
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
                          className={`block text-[1.1rem] h-[28px] leading-[28px] text-black text-center transition-colors ${
                            isActive ? "font-bold border-b-[2px] border-black opacity-100" : "font-medium opacity-85"
                          }`}
                        >
                          {link.nameAr}
                        </span>
                        <span className="block font-sans text-xs font-semibold tracking-widest h-[28px] leading-[28px] text-black/80 uppercase text-center">
                          {link.nameEn}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Social Icons (Mail & Instagram) — Always visible on homepage, desktop-only on subpages */}
          <div className={`flex items-center gap-4 ${!isHome ? "hidden md:flex" : "flex"}`}>
            {/* Mail Icon */}
            <a
              href="mailto:nourmohamedanwar@gmail.com"
              className="relative block overflow-hidden h-[28px] w-[28px] group shrink-0"
              title="البريد الإلكتروني"
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[28px]">
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.25]" />
                </div>
                <div className="h-[28px] w-[28px] flex items-center justify-center text-black/70 shrink-0">
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
                <div className="h-[28px] w-[28px] flex items-center justify-center shrink-0">
                  <img src="/ICONS/Instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                </div>
                <div className="h-[28px] w-[28px] flex items-center justify-center opacity-70 shrink-0">
                  <img src="/ICONS/Instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                </div>
              </div>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button (Subpages Only) */}
          {!isHome && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black hover:opacity-70 transition-opacity z-50 focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 stroke-[2]" />
              ) : (
                <Menu className="w-7 h-7 stroke-[2]" />
              )}
            </button>
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
            className="fixed inset-0 z-40 bg-offwhite flex flex-col justify-between px-8 pt-28 pb-12 md:hidden"
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
                    className="flex items-center justify-between border-b border-black/10 pb-4 w-full group"
                  >
                    {/* Arabic — right side (first child in RTL flex) */}
                    <span
                      style={{ fontFamily: "'Arsenica', serif" }}
                      className={`text-4xl font-bold text-black transition-colors ${
                        isActive ? "text-black border-b-2 border-black" : ""
                      }`}
                    >
                      {link.nameAr}
                    </span>
                    {/* English label — left side (second child in RTL flex) */}
                    <span className="font-sans text-xs font-bold tracking-widest text-black/40 uppercase">
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
                  className="text-black hover:opacity-50 transition-opacity flex items-center justify-center"
                  title="@drrnour"
                >
                  <img src="/ICONS/Instagram.png" alt="Instagram" className="w-6 h-6 object-contain" />
                </a>
                <a
                  href="mailto:nourmohamedanwar@gmail.com"
                  className="text-black hover:opacity-50 transition-opacity"
                  title="البريد الإلكتروني"
                >
                  <Mail className="w-6 h-6 stroke-[1.75]" />
                </a>
              </div>

              <p className="font-sans text-xs text-black/50">
                نور محمد — مصمم وأخصائي خطوط عربية ولاتينية
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
