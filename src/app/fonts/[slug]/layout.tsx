import type { Metadata } from "next";

interface FontInfo {
  nameAr: string;
  nameEn: string;
  category: string;
  description: string;
  bgClass: string;
}

const fontData: Record<string, FontInfo> = {
  talheen: {
    nameAr: "تَلْحِين",
    nameEn: "Talheen",
    category: "خط يدوي عَفْوي",
    description: "خطٌّ يدويٌّ عربيٌّ يعكس العفوية والحركيّة الخطّيّة بنكهة الشَّخابيط المعاصرة.",
    bgClass: "#FCD34D",
  },
  waraqa: {
    nameAr: "وَرَقَة",
    nameEn: "Waraqa",
    category: "خط هندسي معاصر",
    description: "عائلة طباعية هندسية مرنة ثنائية اللغة صُممت للمجلات والهويات البصرية المعاصرة.",
    bgClass: "#D6CECE",
  },
  "khatt-nour": {
    nameAr: "خَط نُور",
    nameEn: "Khatt Nour",
    category: "كوفي حديث للعناوين",
    description: "الخط التوقيعي للمصمم نور محمد؛ يستند إلى التراث الكوفي بأسلوب حديث ورشيق.",
    bgClass: "#6EE7B7",
  },
  majd: {
    nameAr: "مَجْد",
    nameEn: "Majd",
    category: "خط نسخي متغيّر",
    description: "خط عربي ذكي متعدد الأوزان مناسب للنصوص الطويلة والشاشات الرقمية العالية الدقة.",
    bgClass: "#FCA5A5",
  },
  rawaa: {
    nameAr: "رَوْعَة",
    nameEn: "Rawaa",
    category: "خط علامات تجارية",
    description: "خط تعبيري قوي صُمم خصيصاً للشعارات وحملات الإعلانات ثنائية اللغة.",
    bgClass: "#D4FF00",
  },
  "naskh-modern": {
    nameAr: "نَسْخ",
    nameEn: "Naskh Modern",
    category: "خط أصيل متطور",
    description: "قراءة معاصرة لقواعد خط النسخ العربي الشريف مخصص للكتب والمنشورات الثقافية.",
    bgClass: "#E9D5FF",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const font = fontData[params.slug];

  if (!font) {
    return {
      title: "الخط غير موجود",
      description: "عذراً، الخط المطلوب غير متاح في المكتبة.",
    };
  }

  const title = `خط ${font.nameAr} (${font.nameEn}) — ${font.category}`;
  const description = `${font.description} تصفّح واختبر أوزان وتراخيص عائلة خط ${font.nameAr} من تصميم نور محمد.`;

  return {
    title,
    description,
    keywords: [
      font.nameAr,
      font.nameEn,
      `خط ${font.nameAr}`,
      font.category,
      "خطوط عربية",
      "نور محمد",
      "Arabic Font",
      "Typeface",
    ],
    alternates: {
      canonical: `/fonts/${params.slug}`,
    },
    openGraph: {
      title: `خط ${font.nameAr} (${font.nameEn}) | نور محمد`,
      description,
      url: `https://nourmohamed.com/fonts/${params.slug}`,
      type: "website",
      locale: "ar_SA",
      siteName: "مسبك نور محمد للخطوط",
      images: [
        {
          url: `https://nourmohamed.com/og-font-${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `خط ${font.nameAr} — نور محمد`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | نور محمد`,
      description,
      creator: "@drrnour",
    },
  };
}

export default function FontDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const font = fontData[params.slug];

  const fontJsonLd = font
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `خط ${font.nameAr} (${font.nameEn})`,
        description: font.description,
        category: font.category,
        brand: {
          "@type": "Brand",
          name: "نور محمد للخطوط الرقمية",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "79",
          highPrice: "149",
          offerCount: "3",
          offers: [
            {
              "@type": "Offer",
              name: "المكتبي Desktop",
              price: "79",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "مواقع الويب Webfont",
              price: "99",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "التطبيقات App/ePub",
              price: "149",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          ],
        },
      }
    : null;

  return (
    <>
      {fontJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fontJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
