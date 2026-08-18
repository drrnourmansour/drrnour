"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Do not render Footer on the main landing homepage '/'
  if (pathname === "/") return null;

  const navLinks = [
    { nameAr: "خطوط", nameEn: "Fonts", href: "/fonts" },
    { nameAr: "فرش", nameEn: "Brushes", href: "/brushes" },
    { nameAr: "المدونة", nameEn: "Journal", href: "/journal" },
    { nameAr: "عنّي", nameEn: "About", href: "/about" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#EAE6DF] border-t border-black/10 mt-auto py-12 sm:py-16 px-6 sm:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-10">
        
        {/* Top: Newsletter / Stay Updated */}
        <div className="flex flex-col items-center text-center max-w-md w-full">
          <h4
            style={{ fontFamily: "'Arsenica', serif" }}
            className="text-2xl font-bold text-black mb-2"
          >
            اشترك في النشرة البريدية
          </h4>
          <p className="font-sans text-xs text-black/60 mb-6">
            كن أول من يعلم عن إصدارات الخطوط الجديدة والفرش الحصرية والمقالات.
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-sm gap-2">
            <input
              type="email"
              placeholder="بريدك الإلكتروني..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-white/80 border border-black/15 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
              dir="rtl"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-black text-white font-sans text-xs font-bold hover:bg-black/80 transition-colors shrink-0"
            >
              {subscribed ? "تم الاشتراك!" : "اشتراك"}
            </button>
          </form>
        </div>

        {/* Center Column: Social Icons & Navigation Links */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 text-center w-full">
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-black">
            <a
              href="https://instagram.com/drrnour"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center"
              title="انستغرام (@drrnour)"
            >
              <Image src="/ICONS/Instagram.png" alt="Instagram" width={22} height={22} quality={100} className="w-[18px] h-[18px] object-contain icon-crisp" />
            </a>
            
            {/* Behance Monogram */}
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-0.5 inline-block font-sans text-sm font-black tracking-tighter"
              title="بيهانس"
            >
              Bē
            </a>

            <a
              href="mailto:nourmohamedanwar@gmail.com"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center"
              title="البريد الإلكتروني"
            >
              <Image src="/ICONS/Mail.png" alt="Email" width={22} height={22} quality={100} className="w-[18px] h-[18px] object-contain icon-crisp" />
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
                      className="block text-sm font-medium h-[26px] leading-[26px] text-black text-center"
                    >
                      {link.nameAr}
                    </span>
                    <span className="block font-sans text-[10px] font-bold tracking-widest h-[26px] leading-[26px] text-black/75 uppercase text-center">
                      {link.nameEn}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Left Column: Copyright Notice (RTL Column 3) */}
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left text-xs font-sans text-black/60 w-full">
          <p>جميع الحقوق محفوظة. يمنع الاستخدام أو التوزيع دون إذن كتابي.</p>
          <p className="tracking-wide">All rights reserved. No use or distribution without permission.</p>
        </div>

      </div>
    </footer>
  );
}
