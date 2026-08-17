import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فرش نوريّة | حزمة فرش الخط العربي الرقمي",
  description:
    "حمّل حزمة فرش نوريّة الاحترافية للخط العربي والرسم الرقمي (.gobrushes). صممت لمحاكاة قصبة الخط الطبيعية وانسيابية الحبر بجودة فائقة من تصميم نور محمد.",
  keywords: [
    "فرش نوريّة",
    "فرش خط عربي",
    "gobrushes",
    "فرش برو كريت",
    "فرش كاليجرافي",
    "خط عربي رقمي",
    "نور محمد",
    "Arabic Calligraphy Brushes",
    "Digital Calligraphy",
  ],
  openGraph: {
    title: "فرش نوريّة | حزمة فرش الخط العربي الرقمي — نور محمد",
    description:
      "حزمة فرش احترافية للخط العربي والرسم الرقمي بدقة استثنائية وانسيابية حبر واقعية بصيغة .gobrushes.",
    url: "https://drrnour.com/brushes",
  },
};

export default function BrushesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
