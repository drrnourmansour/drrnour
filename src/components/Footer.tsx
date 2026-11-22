"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Do not render Footer on the main landing homepage '/'
  if (pathname === "/") return null;

  const navLinks = [
    { nameAr: "عنّي", nameEn: "About", href: "/about" },
    { nameAr: "المدوّنة", nameEn: "Journal", href: "/journal" },
    { nameAr: "أعمالي", nameEn: "Works", href: "/works" },
    { nameAr: "الفرش", nameEn: "Brushes", href: "/brushes" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#EAE6DF] dark:bg-[#1C1B18] border-t border-black/10 dark:border-white/10 mt-auto py-12 sm:py-16 px-6 sm:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-10">

        {/* Top: Newsletter / Stay Updated */}
        <div className="flex flex-col items-center text-center max-w-md w-full">
          <h4
            style={{ fontFamily: "'Arsenica', serif" }}
            className="text-2xl font-bold text-black dark:text-offwhite mb-2"
          >
            اشترك في النشرة البريدية
          </h4>
          <p className="font-sans text-xs text-black/60 dark:text-offwhite/60 mb-6">
            كن أول من يعلم عن إصدارات الخطوط الجديدة والفرش الحصرية والمقالات.
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-sm gap-2">
            <input
              id="footer-newsletter-email"
              name="email"
              type="email"
              placeholder="بريدك الإلكتروني..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-white/80 dark:bg-white/10 border border-black/15 dark:border-white/15 text-sm text-black dark:text-offwhite placeholder:text-black/40 dark:placeholder:text-offwhite/40 focus:outline-none focus:border-black dark:focus:border-offwhite transition-colors"
              dir="rtl"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-black dark:bg-offwhite text-white dark:text-ink font-sans text-xs font-bold hover:bg-black/80 dark:hover:bg-offwhite/85 transition-colors shrink-0"
            >
              {subscribed ? "تم الاشتراك!" : "اشتراك"}
            </button>
          </form>
        </div>

        {/* Center Column: Social Icons & Navigation Links */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 text-center w-full">
          {/* Social Icons */}
          <div className="flex items-center gap-5 text-black dark:text-offwhite">
            <a
              href="https://instagram.com/drrnour"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-1 inline-block"
              title="انستغرام (@drrnour)"
            >
              <Instagram className="w-5 h-5 stroke-[1.75]" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/drrnour"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-1 inline-flex items-center"
              title="تيليغرام (@drrnour)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M21.94 4.66a1.5 1.5 0 0 0-1.6-.24L2.97 11.42a1.3 1.3 0 0 0 .06 2.43l4.38 1.46 1.68 5.26a1 1 0 0 0 1.67.4l2.45-2.46 4.44 3.28a1.45 1.45 0 0 0 2.28-.88l2.53-14.6a1.5 1.5 0 0 0-.52-1.65ZM9.85 15.16l-.65 3.1-.96-3.02 9.48-6.66-7.87 6.58Z" />
              </svg>
            </a>

            <a
              href="mailto:nourmohamedanwar@gmail.com"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-1 inline-block"
              title="البريد الإلكتروني"
            >
              <Mail className="w-5 h-5 stroke-[1.75]" />
            </a>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-5 sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative block overflow-hidden h-[26px] group px-1"
                >
                  <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[26px]">
                    <span
                      style={{ fontFamily: "'Arsenica', serif" }}
                      className="block text-sm font-medium h-[26px] leading-[26px] text-black dark:text-offwhite text-center"
                    >
                      {link.nameAr}
                    </span>
                    <span className="block font-sans text-[10px] font-bold tracking-widest h-[26px] leading-[26px] text-black/75 dark:text-offwhite/75 uppercase text-center">
                      {link.nameEn}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Left Column: Copyright Notice (RTL Column 3) */}
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left text-xs font-sans text-black/60 dark:text-offwhite/60 w-full">
          <p>جميع الحقوق محفوظة. يمنع الاستخدام أو التوزيع دون إذن كتابي.</p>
          <p className="tracking-wide">All rights reserved. No use or distribution without permission.</p>
        </div>

      </div>
    </footer>
  );
}
