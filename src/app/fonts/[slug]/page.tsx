import FontDetailClient from "./FontDetailClient";

interface FontDetail {
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
}

const fontData: Record<string, FontDetail> = {
  "talheen": {
    id: "talheen",
    nameAr: "تلحين",
    nameEn: "Talheen",
    category: "خط يدوي عفوي",
    stylesAr: "٣ أنماط",
    stylesEn: "3 Styles",
    description: "خطّ يدويّ عربيّ يعكس العفوية والحركيّة الخطّيّة بنكهة الشّخابيط المعاصرة.",
    bgClass: "bg-[#E8C87A]",
    fontFamily: "'Aref Ruqaa', serif",
    weights: [
      { nameAr: "عادي", nameEn: "Regular", weight: 400 },
      { nameAr: "عريض", nameEn: "Bold", weight: 700 },
    ],
  },
  "waraqa": {
    id: "waraqa",
    nameAr: "ورقة",
    nameEn: "Waraqa",
    category: "خط هندسي معاصر",
    stylesAr: "٦ أنماط، متغير",
    stylesEn: "6 Styles, Variable",
    description: "عائلة طباعية هندسية مرنة ثنائية اللغة صممت للمجلات والهويات البصرية المعاصرة.",
    bgClass: "bg-[#D4C5B8]",
    fontFamily: "'Cairo', sans-serif",
    weights: [
      { nameAr: "خفيف", nameEn: "Light", weight: 300 },
      { nameAr: "عادي", nameEn: "Regular", weight: 400 },
      { nameAr: "متوسط", nameEn: "Medium", weight: 500 },
      { nameAr: "عريض", nameEn: "Bold", weight: 700 },
      { nameAr: "ثقيل", nameEn: "Black", weight: 900 },
    ],
  },
  "khatt-nour": {
    id: "khatt-nour",
    nameAr: "خط نور",
    nameEn: "Khatt Nour",
    category: "كوفي حديث للعناوين",
    stylesAr: "٦ أنماط، متغير",
    stylesEn: "6 Styles, Variable",
    description: "الخط التوقيعي للمصمم نور محمد؛ يستند إلى التراث الكوفي بأسلوب حديث ورشيق.",
    bgClass: "bg-[#96B5A4]",
    fontFamily: "'Reem Kufi', sans-serif",
    weights: [
      { nameAr: "عادي", nameEn: "Regular", weight: 400 },
      { nameAr: "متوسط", nameEn: "Medium", weight: 600 },
      { nameAr: "عريض", nameEn: "Bold", weight: 800 },
    ],
  },
  "majd": {
    id: "majd",
    nameAr: "مجد",
    nameEn: "Majd",
    category: "خط نسخي متغيّر",
    stylesAr: "٧ أنماط، متغير",
    stylesEn: "7 Styles, Variable",
    description: "خط عربي ذكي متعدد الأوزان مناسب للنصوص الطويلة والشاشات الرقمية العالية الدقة.",
    bgClass: "bg-[#D4907A]",
    fontFamily: "'Tajawal', sans-serif",
    weights: [
      { nameAr: "رفيع", nameEn: "Thin", weight: 300 },
      { nameAr: "عادي", nameEn: "Regular", weight: 400 },
      { nameAr: "بارز", nameEn: "Bold", weight: 700 },
      { nameAr: "ثقيل", nameEn: "Extra Bold", weight: 800 },
    ],
  },
  "rawaa": {
    id: "rawaa",
    nameAr: "روعة",
    nameEn: "Rawaa",
    category: "خط علامات تجارية",
    stylesAr: "٨ أنماط",
    stylesEn: "8 Styles",
    description: "خط تعبيري قوي صمم خصيصا للشعارات وحملات الإعلانات ثنائية اللغة.",
    bgClass: "bg-[#C8BF8A]",
    fontFamily: "'Readex Pro', sans-serif",
    weights: [
      { nameAr: "خفيف", nameEn: "Light", weight: 300 },
      { nameAr: "عادي", nameEn: "Regular", weight: 400 },
      { nameAr: "عريض", nameEn: "Bold", weight: 700 },
    ],
  },
  "naskh-modern": {
    id: "naskh-modern",
    nameAr: "نسخ",
    nameEn: "Naskh Modern",
    category: "خط أصيل متطور",
    stylesAr: "٤ أنماط",
    stylesEn: "4 Styles",
    description: "قراءة معاصرة لقواعد خط النسخ العربي الشريف مخصص للكتب والمنشورات الثقافية.",
    bgClass: "bg-[#C9BECC]",
    fontFamily: "'Amiri', serif",
    weights: [
      { nameAr: "عادي", nameEn: "Regular", weight: 400 },
      { nameAr: "عريض", nameEn: "Bold", weight: 700 },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(fontData).map((slug) => ({ slug }));
}

export default function FontDetailPage({ params }: { params: { slug: string } }) {
  const font = fontData[params.slug] || null;
  return <FontDetailClient font={font} slug={params.slug} />;
}
