import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import TransitionProvider from "@/components/TransitionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://nourmohamed.com"),
  title: {
    default: "نور محمد | مصمم وأخصائي خطوط عربية ولاتينية",
    template: "%s | نور محمد",
  },
  description:
    "موقع ومسبك نور محمد المتخصص في تصميم ونحت الخطوط العربية واللاتينية المعاصرة والخطوط المتغيرة والهندسة الطباعية الرقمية.",
  keywords: [
    "نور محمد",
    "خطوط عربية",
    "خطوط لاتينية",
    "مسبك خطوط",
    "خطوط متغيرة",
    "تصميم خطوط",
    "Arabic fonts",
    "Type Foundry",
    "Variable Fonts",
    "Typography",
    "Nour Mohamed",
    "خط تلحين",
    "خط ورقة",
    "خط نور",
    "خط مجد",
    "خط روعة",
    "خط نسخ",
  ],
  authors: [{ name: "نور محمد", url: "https://nourmohamed.com" }],
  creator: "نور محمد",
  publisher: "مسبك نور محمد للخطوط الرقمية",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "نور محمد | مصمم وأخصائي خطوط عربية ولاتينية",
    description:
      "مسبك خطوط عربية ولاتينية معاصرة بتصميم مبتكر وهندسة طباعية رقمية فائقة الجودة بقلم المصمم نور محمد.",
    url: "https://nourmohamed.com",
    siteName: "نور محمد للخطوط الرقمية",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://nourmohamed.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "نور محمد — خطوط عربية ولاتينية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نور محمد | مصمم وأخصائي خطوط عربية ولاتينية",
    description: "مسبك خطوط عربية ولاتينية معاصرة وهندسة طباعية رقمية من تصميم نور محمد.",
    creator: "@drrnour",
    images: ["https://nourmohamed.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nourmohamed.com/#person",
      name: "نور محمد",
      alternateName: "Nour Mohamed",
      jobTitle: "مصمم خطوط وأخصائي هندسة طباعية",
      url: "https://nourmohamed.com",
      sameAs: [
        "https://instagram.com/drrnour",
        "https://behance.net",
      ],
      knowsAbout: [
        "Arabic Type Design",
        "Latin Type Design",
        "Variable Fonts",
        "Typography",
        "Branding",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://nourmohamed.com/#website",
      url: "https://nourmohamed.com",
      name: "نور محمد | مصمم خطوط عربية ولاتينية",
      description: "مسبك خطوط رقمية عربية ولاتينية معاصرة من تصميم نور محمد.",
      inLanguage: "ar",
      publisher: {
        "@id": "https://nourmohamed.com/#person",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://nourmohamed.com/#organization",
      name: "مسبك نور محمد للخطوط الرقمية",
      url: "https://nourmohamed.com",
      logo: "https://nourmohamed.com/logo.png",
      founder: {
        "@id": "https://nourmohamed.com/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-black font-sans antialiased selection:bg-black selection:text-white flex flex-col min-h-screen">
        <TransitionProvider>
          <Preloader />
          <Navbar />
          <PageTransition>
            <div className="flex-1">{children}</div>
            <Footer />
          </PageTransition>
        </TransitionProvider>
      </body>
    </html>
  );
}
