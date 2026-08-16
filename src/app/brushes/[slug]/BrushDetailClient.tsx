"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  PenTool,
  RotateCcw,
  Eye,
  FileDown,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { useTransitionNav } from "@/components/TransitionProvider";
import { BrushDetailData } from "@/app/brushes/brushData";

interface BrushDetailClientProps {
  brush: BrushDetailData | null;
  slug: string;
}

const sampleWatermarks = [
  { id: "none", label: "لوحة فارغة", text: "" },
  { id: "nour", label: "نُور", text: "نُور" },
  { id: "qalam", label: "والقَلَم", text: "وَالقَلَمِ" },
  { id: "khatt", label: "خَطّ", text: "خَطّ" },
];

export default function BrushDetailClient({ brush, slug }: BrushDetailClientProps) {
  const { navigateTo } = useTransitionNav();

  // Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number; time: number; width: number } | null>(null);

  const [baseWidth, setBaseWidth] = useState(28);
  const [selectedColor, setSelectedColor] = useState("#1A1916");
  const [showGuides, setShowGuides] = useState(true);
  const [activeWatermark, setActiveWatermark] = useState<string>("nour");
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = [
    { name: "حبر أسود شرقي", hex: "#1A1916" },
    { name: "حبر قرمزي كلاسيكي", hex: "#C4735A" },
    { name: "حبر زعفراني مذهب", hex: "#D4907A" },
    { name: "حبر أزرق نيلي", hex: "#3A3D8A" },
    { name: "حبر سيلادون زيتي", hex: "#96B5A4" },
  ];

  // Initialize Canvas DPI & Size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!brush) {
    return (
      <main className="min-h-screen pt-32 sm:pt-40 text-center px-4 sm:px-6">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          الفرشاة غير موجودة
        </h1>
        <button
          onClick={() => navigateTo("/brushes")}
          className="underline font-sans text-base sm:text-lg"
        >
          العودة لجميع الفُرَش
        </button>
      </main>
    );
  }

  // Brush Segment Rendering
  const drawSegment = (
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    calculatedWidth: number
  ) => {
    const rad = (brush.angle * Math.PI) / 180;
    const halfWidth = calculatedWidth / 2;
    const dx = Math.cos(rad) * halfWidth;
    const dy = Math.sin(rad) * halfWidth;

    ctx.save();
    ctx.globalAlpha = brush.inkOpacity;
    ctx.fillStyle = selectedColor;

    ctx.beginPath();
    ctx.moveTo(p1.x - dx, p1.y + dy);
    ctx.lineTo(p1.x + dx, p1.y - dy);
    ctx.lineTo(p2.x + dx, p2.y - dy);
    ctx.lineTo(p2.x - dx, p2.y + dy);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p2.x, p2.y, calculatedWidth * 0.05, 0, Math.PI * 2);
    ctx.fill();

    if (brush.inkBleed) {
      ctx.globalAlpha = brush.inkOpacity * 0.25;
      ctx.beginPath();
      ctx.arc(p2.x + (Math.random() - 0.5) * 3, p2.y + (Math.random() - 0.5) * 3, calculatedWidth * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawNuqtaStamp = (ctx: CanvasRenderingContext2D, center: { x: number; y: number }, size: number) => {
    const half = size * 0.75;
    ctx.save();
    ctx.fillStyle = selectedColor;
    ctx.translate(center.x, center.y);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillRect(-half / 2, -half / 2, half, half);
    ctx.restore();
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    setHasDrawn(true);
    const coords = getCanvasCoords(e);
    const now = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (brush.isNuqtaStamp) {
      drawNuqtaStamp(ctx, coords, baseWidth * 1.3);
    } else {
      drawSegment(ctx, coords, coords, baseWidth);
    }

    lastPointRef.current = {
      x: coords.x,
      y: coords.y,
      time: now,
      width: baseWidth,
    };
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const coords = getCanvasCoords(e);
    const now = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (brush.isNuqtaStamp) {
      const dist = Math.hypot(coords.x - lastPointRef.current.x, coords.y - lastPointRef.current.y);
      if (dist > baseWidth * 1.2) {
        drawNuqtaStamp(ctx, coords, baseWidth * 1.3);
        lastPointRef.current = { x: coords.x, y: coords.y, time: now, width: baseWidth };
      }
      return;
    }

    const last = lastPointRef.current;
    const dist = Math.hypot(coords.x - last.x, coords.y - last.y);
    const dt = Math.max(now - last.time, 1);

    const strokeAngle = Math.atan2(coords.y - last.y, coords.x - last.x);
    const bladeAngleRad = (brush.angle * Math.PI) / 180;
    const angleDiff = Math.abs(Math.sin(strokeAngle - bladeAngleRad));

    const targetWidth = Math.max(
      baseWidth * (brush.minWidthRatio + angleDiff * (brush.maxWidthRatio - brush.minWidthRatio)),
      4
    );

    const interpolatedWidth = last.width * 0.6 + targetWidth * 0.4;
    const steps = Math.max(Math.floor(dist / 2), 1);

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const interpPoint = {
        x: last.x + (coords.x - last.x) * t,
        y: last.y + (coords.y - last.y) * t,
      };
      const curW = last.width + (interpolatedWidth - last.width) * t;
      drawSegment(ctx, last, interpPoint, curW);
    }

    lastPointRef.current = {
      x: coords.x,
      y: coords.y,
      time: now,
      width: interpolatedWidth,
    };
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleDownloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `لوحة-${brush.nameAr}_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const selectedWatermarkObj = sampleWatermarks.find((w) => w.id === activeWatermark);

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-24 px-4 sm:px-12 max-w-[1250px] mx-auto text-ink">
      {/* ── Back Link ── */}
      <div className="mb-8">
        <button
          onClick={() => navigateTo("/brushes")}
          className="inline-flex items-center gap-2 text-sm font-bold text-black/60 hover:text-black transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة الفُرَش</span>
        </button>
      </div>

      {/* ── Hero Banner ── */}
      <section
        className="rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 mb-14 sm:mb-20 shadow-xs relative overflow-hidden text-right"
        style={{ backgroundColor: brush.bg }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold border"
                style={{
                  color: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
                  borderColor: brush.textColor === "dark" ? "rgba(26,25,22,0.25)" : "rgba(250,249,246,0.25)",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {brush.fileFormat} {brush.fileSize ? `• ${brush.fileSize}` : ""}
              </span>
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold border"
                style={{
                  color: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
                  borderColor: brush.textColor === "dark" ? "rgba(26,25,22,0.25)" : "rgba(250,249,246,0.25)",
                }}
              >
                زاوية القلم {brush.angle}°
              </span>
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold border"
                style={{
                  color: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
                  borderColor: brush.textColor === "dark" ? "rgba(26,25,22,0.25)" : "rgba(250,249,246,0.25)",
                }}
              >
                {brush.category}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-7xl font-black mb-2 leading-tight"
              style={{
                fontFamily: "'Arsenica', serif",
                color: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
              }}
            >
              {brush.nameAr}
            </h1>

            <p
              className="text-base sm:text-xl font-semibold uppercase tracking-wider mb-4"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: brush.textColor === "dark" ? "rgba(26,25,22,0.65)" : "rgba(250,249,246,0.65)",
              }}
            >
              {brush.nameEn}
            </p>

            <p
              className="text-base sm:text-lg max-w-2xl leading-relaxed"
              style={{
                color: brush.textColor === "dark" ? "rgba(26,25,22,0.85)" : "rgba(250,249,246,0.85)",
              }}
            >
              {brush.description}
            </p>
          </div>

          {/* Download CTA in Hero */}
          <div className="shrink-0 w-full md:w-auto">
            {!brush.soon && brush.downloadUrl ? (
              <a
                href={brush.downloadUrl}
                download={brush.downloadName}
                className="w-full md:w-auto px-8 py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95 transition-all"
                style={{
                  backgroundColor: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
                  color: brush.textColor === "dark" ? "#FAF9F6" : "#1A1916",
                }}
              >
                <Download className="w-5 h-5" />
                <span>تحميل الفرشاة مجاناً</span>
              </a>
            ) : (
              <div
                className="px-6 py-3 rounded-full text-sm font-bold border tracking-wider text-center"
                style={{
                  color: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
                  borderColor: brush.textColor === "dark" ? "rgba(26,25,22,0.3)" : "rgba(250,249,246,0.3)",
                }}
              >
                قريباً للتحميل
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LIVE INDIVIDUAL BRUSH STUDIO ── */}
      <section className="mb-16 sm:mb-24">
        <div className="bg-[#FAF9F6] border border-black/10 rounded-[28px] sm:rounded-[44px] p-5 sm:p-10 shadow-sm overflow-hidden">
          {/* Studio Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#1A1916] text-[#FAF9F6] flex items-center justify-center shadow-xs">
                <PenTool className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h3
                  className="text-lg sm:text-2xl font-black text-black"
                  style={{ fontFamily: "'Arsenica', serif" }}
                >
                  مِخْبَر تَجْرِبَة {brush.nameAr}
                </h3>
                <p className="text-xs text-black/55 font-sans">
                  مضبوطة بفيزياء زاوية {brush.angle}° وانسيابية الحبر الخاصة بها
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowGuides(!showGuides)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  showGuides ? "bg-[#1A1916] text-[#FAF9F6]" : "bg-black/5 text-black/60 hover:bg-black/10"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>ميزان الخط</span>
              </button>

              <button
                onClick={handleClear}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/5 hover:bg-black/10 text-black/70 transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>مسح</span>
              </button>

              {hasDrawn && (
                <button
                  onClick={handleDownloadArtwork}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E8C87A] text-[#1A1916] hover:opacity-85 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>تصدير اللوحة</span>
                </button>
              )}
            </div>
          </div>

          {/* Stroke Customizer Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-black/5 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-black/40">سُمك القَطّة ({baseWidth}px):</span>
              <input
                type="range"
                min={10}
                max={54}
                value={baseWidth}
                onChange={(e) => setBaseWidth(Number(e.target.value))}
                className="w-28 sm:w-36 accent-[#1A1916] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-black/40 ml-1">قالب المحاكاة:</span>
              {sampleWatermarks.map((wm) => (
                <button
                  key={wm.id}
                  onClick={() => setActiveWatermark(wm.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    activeWatermark === wm.id
                      ? "bg-[#1A1916] text-[#FAF9F6]"
                      : "bg-black/5 text-black/60 hover:bg-black/10"
                  }`}
                >
                  {wm.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-black/40 ml-1">الحبر:</span>
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    selectedColor === c.hex
                      ? "scale-125 ring-2 ring-offset-2 ring-black"
                      : "hover:scale-110 opacity-80"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Main Drawing Canvas */}
          <div className="relative w-full h-[380px] sm:h-[480px] bg-white rounded-3xl overflow-hidden mt-4 cursor-crosshair border border-black/8 select-none touch-none shadow-inner">
            {showGuides && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 opacity-25">
                <div className="border-b border-dashed border-red-500/50 flex items-center justify-between text-[10px] text-red-500 font-sans">
                  <span>خط القمة (Ascender)</span>
                  <span>{brush.angle}° زاوية القلم</span>
                </div>
                <div className="border-b border-dashed border-blue-500/50 flex items-center justify-between text-[10px] text-blue-500 font-sans">
                  <span>خط الوسط (X-Height)</span>
                  <span>ميزان الحروف</span>
                </div>
                <div className="border-b-2 border-solid border-black/40 flex items-center justify-between text-[10px] text-black font-bold font-sans">
                  <span>خط الأساس (Baseline)</span>
                  <span>نقطة الارتكاز</span>
                </div>
                <div className="border-b border-dashed border-red-500/50 flex items-center justify-between text-[10px] text-red-500 font-sans">
                  <span>خط القاع (Descender)</span>
                  <span>كؤوس النون والراء</span>
                </div>
              </div>
            )}

            {selectedWatermarkObj && selectedWatermarkObj.text && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span
                  className="text-[120px] sm:text-[220px] font-extrabold text-black/[0.04] leading-none"
                  style={{ fontFamily: "'Arsenica', serif" }}
                >
                  {selectedWatermarkObj.text}
                </span>
              </div>
            )}

            {!hasDrawn && (
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center pointer-events-none">
                <span className="px-4 py-1.5 rounded-full bg-black/5 text-black/40 text-xs font-sans">
                  اكتب أو ارسم هنا لتجربة {brush.nameAr} الحية
                </span>
              </div>
            )}

            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="w-full h-full block"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES & BREAKDOWN ── */}
      <section className="mb-16 sm:mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
        {/* Features list */}
        <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-2xs">
          <h3
            className="text-2xl font-bold mb-6 text-black"
            style={{ fontFamily: "'Arsenica', serif" }}
          >
            خصائص ومميزات الفرشاة
          </h3>
          <ul className="flex flex-col gap-4">
            {brush.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-black/75 leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#1A1916] mt-2 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sub-brushes or Specimen info */}
        <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-2xs">
          <h3
            className="text-2xl font-bold mb-6 text-black"
            style={{ fontFamily: "'Arsenica', serif" }}
          >
            {brush.subBrushes ? "الأدوات المتضمنة في الحزمة" : "الاستخدام المثالي"}
          </h3>

          {brush.subBrushes ? (
            <div className="flex flex-col gap-3">
              {brush.subBrushes.map((sub, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-black/[0.03] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-black block">{sub.name}</span>
                    <span className="text-xs text-black/55">{sub.desc}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-xs font-bold text-black/70 border border-black/5">
                    {sub.angle}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-black/[0.03] text-sm text-black/70 leading-relaxed">
              <p className="mb-3 font-semibold text-black">
                نموذج العبارة التايبوغرافية:
              </p>
              <p
                className="text-2xl font-bold text-black mb-2"
                style={{ fontFamily: "'Arsenica', serif" }}
              >
                {brush.specimenAr}
              </p>
              <p
                className="text-xs font-medium text-black/50"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {brush.specimenEn}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── INSTALLATION INSTRUCTIONS ── */}
      <section className="mb-16 sm:mb-24 p-8 sm:p-12 rounded-[28px] sm:rounded-[40px] bg-black/[0.03] border border-black/8 text-right">
        <h3
          className="text-2xl sm:text-3xl font-extrabold text-black mb-2"
          style={{ fontFamily: "'Arsenica', serif" }}
        >
          كيفية تثبيت ملف ({brush.fileFormat})
        </h3>
        <p className="text-sm text-black/60 mb-6 font-sans">
          خطوات سريعة لتثبيت واستخدام الفرشاة على جهازك
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-2xs">
            <span className="w-7 h-7 rounded-full bg-[#1A1916] text-[#FAF9F6] flex items-center justify-center font-bold text-xs mb-3">
              ١
            </span>
            <h4 className="font-bold text-sm text-black mb-1">تحميل الملف</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              اضغط على زر التحميل لحفظ ملف الفرشاة على جهازك.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-2xs">
            <span className="w-7 h-7 rounded-full bg-[#1A1916] text-[#FAF9F6] flex items-center justify-center font-bold text-xs mb-3">
              ٢
            </span>
            <h4 className="font-bold text-sm text-black mb-1">استيراد الفرشاة</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              افتح تطبيق الرسم أو الخط واختر "استيراد فرشاة" (Import).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-2xs">
            <span className="w-7 h-7 rounded-full bg-[#1A1916] text-[#FAF9F6] flex items-center justify-center font-bold text-xs mb-3">
              ٣
            </span>
            <h4 className="font-bold text-sm text-black mb-1">الكتابة والإبداع</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              ستظهر الفرشاة مباشرة مع إعدادات الانسيابية والضغط التلقائية.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER DOWNLOAD CTA ── */}
      {!brush.soon && brush.downloadUrl && (
        <section
          className="rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 text-center relative overflow-hidden shadow-md"
          style={{ backgroundColor: brush.bg }}
        >
          <h2
            className="text-3xl sm:text-5xl font-black mb-3 leading-tight"
            style={{
              fontFamily: "'Arsenica', serif",
              color: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
            }}
          >
            حمّل {brush.nameAr} الآن
          </h2>
          <p
            className="text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed"
            style={{
              color: brush.textColor === "dark" ? "rgba(26,25,22,0.75)" : "rgba(250,249,246,0.75)",
            }}
          >
            استمتع بدقة الخط العربي وانسيابية القصبة الطبيعية على أجهزتك الرقمية.
          </p>

          <a
            href={brush.downloadUrl}
            download={brush.downloadName}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
            style={{
              backgroundColor: brush.textColor === "dark" ? "#1A1916" : "#FAF9F6",
              color: brush.textColor === "dark" ? "#FAF9F6" : "#1A1916",
            }}
          >
            <Download className="w-5 h-5" />
            <span>تحميل ملف {brush.fileFormat}</span>
          </a>
        </section>
      )}
    </main>
  );
}
