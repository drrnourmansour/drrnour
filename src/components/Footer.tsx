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
    <footer className="w-full pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-12 border-t border-black/10 bg-transparent transition-colors duration-400 mt-auto">
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-center md:items-end justify-between">
        
        {/* Right Column: Newsletter Subscription (RTL Column 1) */}
        <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-right w-full">
          <h3 className="font-serif text-base sm:text-lg font-bold text-black">
            استقبل تحديثات في البريد الإلكتروني
          </h3>
          
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-sm mt-1">
            <input
              type="email"
              required
              placeholder="بريدك الإلكتروني..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-black/30 px-2 py-1.5 text-sm font-sans text-black placeholder:text-black/40 focus:outline-none focus:border-black flex-1 transition-colors"
            />
            <button
              type="submit"
              className="font-sans text-sm font-bold text-black hover:opacity-60 transition-opacity border-b border-black pb-0.5 whitespace-nowrap"
            >
              {subscribed ? "تم الاشتراك ✓" : "اشترك"}
            </button>
          </form>

          <p className="font-sans text-xs text-black/60 leading-relaxed max-w-sm">
            نستخدم بريدك الإلكتروني لإرسال تحديثات حول المدونة/الخطوط فقط.
          </p>
        </div>

        {/* Center Column: Social Icons & Navigation Links */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 text-center w-full">
          {/* Social Icons */}
          <div className="flex items-center gap-5 text-black">
            <a
              href="https://instagram.com/drrnour"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-1 inline-block"
              title="انستغرام (@drrnour)"
            >
              <Instagram className="w-5 h-5 stroke-[1.75]" />
            </a>
            
            {/* Behance Monogram */}
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-all duration-300 hover:-translate-y-1 inline-block font-sans text-base font-black tracking-tighter"
              title="بيهانس"
            >
              Bē
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
