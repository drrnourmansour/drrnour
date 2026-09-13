"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag, X, Check, Mail, Instagram, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const licenseDetails: Record<string, { titleAr: string; titleEn: string; price: string; desc: string }> = {
  desktop: {
    titleAr: "المكتبي",
    titleEn: "Desktop",
    price: "$79",
    desc: "للتصاميم المطبوعة، الهويات البصرية، والمستندات.",
  },
  web: {
    titleAr: "مواقع الويب",
    titleEn: "Webfont",
    price: "$99",
    desc: "حتى 500,000 مشاهدة شهرية للموقع أو المتجر الإلكتروني.",
  },
  app: {
    titleAr: "التطبيقات والمنصات",
    titleEn: "App / ePub",
    price: "$149",
    desc: "لتضمين الخط في تطبيق جوال، لعبة، أو كتاب رقمي.",
  },
};

export default function FontDetailClient({ font, slug }: FontDetailProps) {
  const { navigateTo } = useTransitionNav();

  const [fontSize, setFontSize] = useState(56);
  const [sampleText, setSampleText] = useState(
    "اللّغة العربيّة فنّ وتراث خالد عبر العصور"
  );
  const [selectedLicense, setSelectedLicense] = useState("desktop");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerNotes, setBuyerNotes] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const currentLicense = licenseDetails[selectedLicense] || licenseDetails.desktop;

  const emailSubject = encodeURIComponent("طلب ترخيص خط: " + font.nameAr + " (" + font.nameEn + ") - ترخيص " + currentLicense.titleAr);
  const emailBody = encodeURIComponent(
    "مرحبا نور،\n\n" +
    "أود طلب ترخيص خط عائلة " + font.nameAr + " (" + font.nameEn + ").\n\n" +
    "تفاصيل الطلب:\n" +
    "- اسم الخط: " + font.nameAr + " / " + font.nameEn + "\n" +
    "- نوع الترخيص: " + currentLicense.titleAr + " (" + currentLicense.titleEn + ") - " + currentLicense.price + "\n" +
    "- اسم المشتري / الجهة: " + (buyerName || "غير محدد") + "\n" +
    "- البريد الإلكتروني للتواصل: " + (buyerEmail || "غير محدد") + "\n" +
    (buyerNotes ? "- ملاحظات إضافية: " + buyerNotes + "\n" : "") + "\n" +
    "شكرا لك!"
  );

  const mailtoUrl = "mailto:nourmohamedanwar@gmail.com?subject=" + emailSubject + "&body=" + emailBody;

  const copyInquiryText = () => {
    const text = "طلب ترخيص خط " + font.nameAr + " (" + font.nameEn + ") - ترخيص " + currentLicense.titleAr + " (" + currentLicense.price + ")";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const glyphs = [
    "أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"
  ];

  return (
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 md:pb-32 px-4 sm:px-8 md:px-12 max-w-[1350px] mx-auto w-full box-border">
      {/* Back Link */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigateTo("/fonts")}
          className="inline-flex items-center gap-2 text-black/60 hover:text-black font-sans text-sm sm:text-base font-semibold transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>العودة لمكتبة الخطوط</span>
        </button>
      </div>

      {/* Specimen Banner Header */}
      <div className={"rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-14 lg:p-16 mb-12 sm:mb-16 " + font.bgClass + " flex flex-col justify-between min-h-[380px] sm:min-h-[440px] gap-8 shadow-sm"}>
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
          <a
            href="#licensing"
            className="w-full sm:w-auto text-center bg-[#FAF9F6] text-[#1A1916] px-6 sm:px-8 py-3.5 rounded-full font-bold font-sans text-sm sm:text-base border border-[#1A1916] hover:bg-[#1A1916] hover:text-[#FAF9F6] transition-colors shadow-sm cursor-pointer"
          >
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
              fontSize: "clamp(18px, " + (fontSize * 0.75) + "px, " + fontSize + "px)",
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
                نور المعرفة يضيء الدّرب
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
      <section id="licensing" className="scroll-mt-24 sm:scroll-mt-28 bg-[#F0EDE8] border border-black/10 rounded-2xl sm:rounded-[36px] p-5 sm:p-10 md:p-14 mb-12 sm:mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">ترخيص عائلة {font.nameAr}</h2>
          <p className="font-sans text-xs sm:text-base md:text-lg text-black/65 mb-6 sm:mb-10">
            اختر نوع الترخيص المناسب لمشروعك التجاري أو المؤسسي
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 text-right">
            {Object.entries(licenseDetails).map(([key, lic]) => (
              <div
                key={key}
                onClick={() => setSelectedLicense(key)}
                className={"p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all " +
                  (selectedLicense === key ? "border-black bg-offwhite shadow-md" : "border-black/10 bg-transparent hover:border-black/30")}
              >
                <div className="font-bold text-base sm:text-lg md:text-xl mb-1">{lic.titleAr} {lic.titleEn}</div>
                <div className="text-xs sm:text-sm text-black/60 mb-3 sm:mb-4">{lic.desc}</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">{lic.price}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#1A1916] text-[#FAF9F6] px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-bold font-sans text-sm sm:text-base md:text-lg flex items-center justify-center gap-3 mx-auto hover:opacity-85 transition-opacity shadow-sm cursor-pointer"
          >
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
            "talheen": { nameAr: "تلحين", bgClass: "bg-[#E8C87A]", fontFamily: "'Aref Ruqaa', serif" },
            "waraqa": { nameAr: "ورقة", bgClass: "bg-[#D4C5B8]", fontFamily: "'Cairo', sans-serif" },
            "khatt-nour": { nameAr: "خط نور", bgClass: "bg-[#96B5A4]", fontFamily: "'Reem Kufi', sans-serif" },
            "majd": { nameAr: "مجد", bgClass: "bg-[#D4907A]", fontFamily: "'Tajawal', sans-serif" },
            "rawaa": { nameAr: "روعة", bgClass: "bg-[#C8BF8A]", fontFamily: "'Readex Pro', sans-serif" },
            "naskh-modern": { nameAr: "نسخ", bgClass: "bg-[#C9BECC]", fontFamily: "'Amiri', serif" },
          } as Record<string, { nameAr: string; bgClass: string; fontFamily: string }>)
            .filter(([key]) => key !== slug)
            .slice(0, 3)
            .map(([relatedKey, other]) => {
              return (
                <button
                  key={relatedKey}
                  onClick={() => navigateTo("/fonts/" + relatedKey)}
                  className={other.bgClass + " rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between min-h-[120px] sm:min-h-[160px] hover:shadow-lg transition-shadow text-right w-full cursor-pointer"}
                >
                  <span style={{ fontFamily: other.fontFamily }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black break-words">
                    {other.nameAr}
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      {/* ── Order & License Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-[#FAF9F6] border border-black/10 rounded-3xl p-6 sm:p-9 max-w-lg w-full shadow-2xl text-right z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 left-5 p-2 rounded-full hover:bg-black/5 transition-colors text-black/60 hover:text-black cursor-pointer"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-black/40 font-sans block mb-1">
                  License Inquiry · طلب الترخيص
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-black">
                  طلب عائلة {font.nameAr}
                </h3>
              </div>

              {/* Selected Tier Pill */}
              <div className="bg-[#F0EDE8] border border-black/10 rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div>
                  <div className="font-bold text-base text-black">{currentLicense.titleAr} ({currentLicense.titleEn})</div>
                  <div className="text-xs text-black/60">{currentLicense.desc}</div>
                </div>
                <div className="text-2xl font-extrabold font-sans text-black">{currentLicense.price}</div>
              </div>

              {/* Form fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-black/70 mb-1">الاسم / اسم الشركة</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="مثال: استوديو الإبداع"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-black outline-none focus:border-black transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black/70 mb-1">البريد الإلكتروني للتواصل</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-black outline-none focus:border-black transition-colors text-sm text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black/70 mb-1">ملاحظات أو استخدامات إضافية (اختياري)</label>
                  <textarea
                    rows={2}
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                    placeholder="عدد المستخدمين، المنصات، أو أي ترخيص مخصص..."
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-black outline-none focus:border-black transition-colors text-sm resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={mailtoUrl}
                  className="w-full bg-[#1A1916] text-[#FAF9F6] py-3.5 px-6 rounded-full font-bold font-sans text-sm sm:text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>إرسال الطلب عبر البريد الإلكتروني</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href="https://instagram.com/drrnour"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-black/15 hover:bg-black/5 text-black py-2.5 px-4 rounded-full font-semibold font-sans text-xs flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>مراسلة عبر إنستغرام</span>
                  </a>

                  <button
                    onClick={copyInquiryText}
                    className="flex-1 border border-black/15 hover:bg-black/5 text-black py-2.5 px-4 rounded-full font-semibold font-sans text-xs flex items-center justify-center gap-2 transition-colors text-center cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "تم النسخ بنجاح!" : "نسخ تفاصيل الطلب"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}