"use client";

import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useTransitionNav } from "@/components/TransitionProvider";

interface FontDetailProps {
  font: {
    id: string;
    nameAr: string;
    nameEn: string;
    category: string;
    stylesAr: string;
    stylesEn: string;
    description: string;
    bgClass: string;
    fontFamily: string;
    weights: { nameAr: string; nameEn: string; weight: number }[];
  } | null;
  slug: string;
}

export default function FontDetailClient({ font, slug }: FontDetailProps) {
  const { navigateTo } = useTransitionNav();

  if (!font) {
    return (
      <main className="min-h-screen pt-32 sm:pt-40 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-4">الخط غير موجود</h1>
        <button onClick={() => navigateTo("/fonts")} className="underline font-sans text-base sm:text-lg">
          العودة لقائمة الخطوط
        </button>
      </main>
    );
  }

  const [fontSize, setFontSize] = useState(56);
  const [sampleText, setSampleText] = useState(
    "اللُّغَةُ العَرَبِيَّةُ فَنٌّ وَتَرَاثٌ خَالِدٌ عَبْرَ العُصُور"
  );
  const [selectedLicense, setSelectedLicense] = useState("desktop");

  const glyphs = [
    "أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"
  ];

  return (
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 md:pb-32 px-4 sm:px-8 md:px-12 max-w-[1350px] mx-auto w-full box-border">
      {/* Back Link */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigateTo("/fonts")}
          className="inline-flex items-center gap-2 text-black/60 hover:text-black font-sans text-sm sm:text-base font-semibold transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>العودة لمكتبة الخطوط</span>
        </button>
      </div>

      {/* Specimen Banner Header */}
      <div className={`rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-14 lg:p-16 mb-12 sm:mb-16 ${font.bgClass} flex flex-col justify-between min-h-[380px] sm:min-h-[440px] gap-8 shadow-sm`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
          <span className="w-full sm:w-auto text-center px-4 sm:px-5 py-2 rounded-full border border-black/80 font-sans font-semibold text-xs sm:text-sm bg-[#FAF9F6]/50 backdrop-blur-xs">
            {font.category}
          </span>
          <span className="w-full sm:w-auto text-center px-4 sm:px-5 py-2 rounded-full border border-black/80 font-sans font-semibold text-xs sm:text-sm bg-[#FAF9F6]/50 backdrop-blur-xs">
            {font.stylesAr} • {font.stylesEn}
          </span>
        </div>

        <div className="text-center my-4 sm:my-8 px-2">
          <h1 style={{ fontFamily: font.fontFamily }} className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-black mb-3 sm:mb-5 tracking-tight leading-tight break-words text-center">
            {font.nameAr}
          </h1>
          <p className="font-sans text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-black/80 max-w-2xl mx-auto leading-relaxed text-center">
            {font.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
          <a href="#workbench" className="w-full sm:w-auto text-center bg-[#1A1916] text-[#FAF9F6] px-6 sm:px-8 py-3.5 rounded-full font-bold font-sans text-sm sm:text-base hover:opacity-85 transition-opacity shadow-sm">
            تجربة الخط التفاعلية
          </a>
          <a href="#licensing" className="w-full sm:w-auto text-center bg-[#FAF9F6] text-[#1A1916] px-6 sm:px-8 py-3.5 rounded-full font-bold font-sans text-sm sm:text-base border border-[#1A1916] hover:bg-[#1A1916] hover:text-[#FAF9F6] transition-colors shadow-sm">
            شراء وطلب الترخيص
          </a>
        </div>
      </div>

      {/* Interactive Workbench */}
      <section id="workbench" className="mb-16 sm:mb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold">مختبر التجربة المباشرة</h2>
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto bg-black/5 sm:bg-transparent p-3 sm:p-0 rounded-xl">
            <span className="text-xs sm:text-sm font-semibold text-black/70 whitespace-nowrap">الحجم: {fontSize}px</span>
            <input
              type="range"
              min={20}
              max={100}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full sm:w-36 md:w-44 accent-black cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-offwhite border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 mb-8 sm:mb-12">
          <textarea
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            style={{ 
              fontFamily: font.fontFamily, 
              fontSize: `clamp(18px, ${fontSize * 0.75}px, ${fontSize}px)` 
            }}
            className="w-full bg-transparent border-none outline-none font-bold text-black min-h-[120px] sm:min-h-[160px] resize-y dir-rtl text-right break-words leading-relaxed"
          />
        </div>
      </section>

      {/* Style Weights Comparison Stack */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 sm:mb-8">أوزان وأنماط عائلة {font.nameAr}</h2>
        <div className="flex flex-col gap-6 sm:gap-8 border-t border-black/10 pt-6 sm:pt-8">
          {font.weights.map((w) => (
            <div key={w.nameEn} className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-black/10">
              <div className="w-full lg:w-48 shrink-0 font-sans text-xs sm:text-sm font-bold text-black/60">
                {w.nameAr} — {w.nameEn} ({w.weight})
              </div>
              <div style={{ fontFamily: font.fontFamily, fontWeight: w.weight }} className="text-2xl sm:text-4xl md:text-5xl text-black flex-1 break-words leading-tight sm:leading-snug">
                نُورُ المَعْرِفَةِ يُضِيءُ الدَّرْبَ
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Character Matrix */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6">الحروف والأشكال الخطّيّة</h2>
        <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-2 sm:gap-3">
          {glyphs.map((gl, i) => (
            <div
              key={i}
              style={{ fontFamily: font.fontFamily }}
              className="aspect-square border border-black/15 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
            >
              {gl}
            </div>
          ))}
        </div>
      </section>

      {/* Font Licensing & Order Section */}
      <section id="licensing" className="bg-[#F0EDE8] border border-black/10 rounded-2xl sm:rounded-[36px] p-5 sm:p-10 md:p-14 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">ترخيص عائلة {font.nameAr}</h2>
          <p className="font-sans text-xs sm:text-base md:text-lg text-black/65 mb-6 sm:mb-10">
            اختر نوع الترخيص المناسب لمشروعك التجاري أو المؤسسي
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 text-right">
            <div
              onClick={() => setSelectedLicense("desktop")}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${
                selectedLicense === "desktop" ? "border-black bg-offwhite shadow-md" : "border-black/10 bg-transparent"
              }`}
            >
              <div className="font-bold text-base sm:text-lg md:text-xl mb-1">المكتبي Desktop</div>
              <div className="text-xs sm:text-sm text-black/60 mb-3 sm:mb-4">للتصاميم المطبوعة والمستندات</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">$79</div>
            </div>

            <div
              onClick={() => setSelectedLicense("web")}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${
                selectedLicense === "web" ? "border-black bg-offwhite shadow-md" : "border-black/10 bg-transparent"
              }`}
            >
              <div className="font-bold text-base sm:text-lg md:text-xl mb-1">مواقع الويب Webfont</div>
              <div className="text-xs sm:text-sm text-black/60 mb-3 sm:mb-4">حتى 500,000 مشاهدة شهرياً</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">$99</div>
            </div>

            <div
              onClick={() => setSelectedLicense("app")}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${
                selectedLicense === "app" ? "border-black bg-offwhite shadow-md" : "border-black/10 bg-transparent"
              }`}
            >
              <div className="font-bold text-base sm:text-lg md:text-xl mb-1">التطبيقات App/ePub</div>
              <div className="text-xs sm:text-sm text-black/60 mb-3 sm:mb-4">تطبيق جوال واحد أو كتاب رقمي</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">$149</div>
            </div>
          </div>

          <button className="w-full sm:w-auto bg-[#1A1916] text-[#FAF9F6] px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-bold font-sans text-sm sm:text-base md:text-lg flex items-center justify-center gap-3 mx-auto hover:opacity-85 transition-opacity shadow-sm">
            <ShoppingBag className="w-5 h-5" />
            <span>طلب الخط والترخيص الآن</span>
          </button>
        </div>
      </section>

      {/* Other Fonts */}
      <section>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 sm:mb-8">خطوط أخرى قد تعجبك</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries({
            "talheen": { nameAr: "تَلْحِين", bgClass: "bg-[#E8C87A]", fontFamily: "'Aref Ruqaa', serif" },
            "waraqa": { nameAr: "وَرَقَة", bgClass: "bg-[#D4C5B8]", fontFamily: "'Cairo', sans-serif" },
            "khatt-nour": { nameAr: "خَط نُور", bgClass: "bg-[#96B5A4]", fontFamily: "'Reem Kufi', sans-serif" },
            "majd": { nameAr: "مَجْد", bgClass: "bg-[#D4907A]", fontFamily: "'Tajawal', sans-serif" },
            "rawaa": { nameAr: "رَوْعَة", bgClass: "bg-[#C8BF8A]", fontFamily: "'Readex Pro', sans-serif" },
            "naskh-modern": { nameAr: "نَسْخ", bgClass: "bg-[#C9BECC]", fontFamily: "'Amiri', serif" },
          } as Record<string, { nameAr: string; bgClass: string; fontFamily: string }>)
            .filter(([key]) => key !== slug)
            .slice(0, 3)
            .map(([relatedKey, other]) => {
              return (
                <button
                  key={relatedKey}
                  onClick={() => navigateTo(`/fonts/${relatedKey}`)}
                  className={`${other.bgClass} rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between min-h-[120px] sm:min-h-[160px] hover:shadow-lg transition-shadow text-right w-full`}
                >
                  <span style={{ fontFamily: other.fontFamily }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black break-words">
                    {other.nameAr}
                  </span>
                </button>
              );
            })}
        </div>
      </section>
    </main>
  );
}
