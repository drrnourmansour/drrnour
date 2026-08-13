import type { Metadata } from "next";

interface ArticleMeta {
  title: string;
  date: string;
  tag: string;
  excerpt: string;
}

const articlesMeta: Record<string, ArticleMeta> = {
  "poetic-house": {
    title: "البيت الشعريُّ وتصميم الخطِّ العربيِّ",
    date: "2025-11-22",
    tag: "نظريّة",
    excerpt: "الخطُّ العربيُّ ليس مجرَّد أداةٍ تواصليَّة، بل هو حاملٌ للذَّاكرة الثَّقافيَّة ووعاءٌ للهُوِيَّة الحضاريَّة.",
  },
  "talheen-story": {
    title: "تلحين: خطٌّ يدويٌّ بنكهة الشَّخابيط",
    date: "2024-10-31",
    tag: "خطوط",
    excerpt: "بدأت فكرة خطِّ «تلحين» بمجموعةٍ من الشَّخابيط التي كنتُ أرسُمها على هوامش دفاتري خلال اجتماعاتٍ طويلة.",
  },
  "variable-fonts": {
    title: "الخطوط المتغيّرة، وتجارب بصريّة جديدة",
    date: "2023-07-17",
    tag: "تقنية",
    excerpt: "قبل الخطوط المتغيَّرة، كان المصمِّمُ يضطرُّ إلى اختيار ملفٍّ منفصلٍ لكلِّ وزنٍ من أوزان الخطِّ.",
  },
  "bilingual-harmony": {
    title: "الانسجام الطباعيّ بين العربي والرومانيّ",
    date: "2023-03-02",
    tag: "نظريّة",
    excerpt: "حين تُصمِّم نظاماً طباعيَّاً ثنائيَّ اللُّغة، فإنَّك تواجه سؤالاً فلسفيَّاً قبل أن يكون تقنيَّاً.",
  },
  "kufi-revival": {
    title: "الكوفيُّ الحديث: تراثٌ في شكلٍ جديد",
    date: "2022-09-08",
    tag: "تاريخ",
    excerpt: "الخطُّ الكوفيُّ هو أقدمُ الخطوط العربيَّة الممنهَجة، وقد شهد في القرون الأولى للإسلام إبداعاً معماريَّاً راقياً.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articlesMeta[params.slug];

  if (!article) {
    return {
      title: "المقال غير موجود",
      description: "عذراً، المقال المطلوب غير متاح في المدوّنة.",
    };
  }

  const title = article.title;
  const description = article.excerpt;

  return {
    title,
    description,
    keywords: [
      article.tag,
      "تصميم خطوط",
      "الخط العربي",
      "مقالات طباعية",
      "نور محمد",
      "الطباعة العربية",
    ],
    alternates: {
      canonical: `/journal/${params.slug}`,
    },
    openGraph: {
      title: `${title} | مدوّنة نور محمد`,
      description,
      url: `https://nourmohamed.com/journal/${params.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: ["نور محمد"],
      locale: "ar_SA",
      siteName: "مدوّنة نور محمد",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — مدوّنة نور محمد`,
      description,
      creator: "@drrnour",
    },
  };
}

export default function JournalArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const article = articlesMeta[params.slug];

  const articleJsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: {
          "@type": "Person",
          name: "نور محمد",
          url: "https://nourmohamed.com",
        },
        publisher: {
          "@type": "Organization",
          name: "مسبك نور محمد للخطوط الرقمية",
          logo: {
            "@type": "ImageObject",
            url: "https://nourmohamed.com/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://nourmohamed.com/journal/${params.slug}`,
        },
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
