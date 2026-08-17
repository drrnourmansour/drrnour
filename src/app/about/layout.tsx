import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عنّي — مصمم خطوط عربية ولاتينية",
  description: "تعرّف على نور محمد، مصمم متخصص في صناعة الخطوط العربية واللاتينية والهندسة الطباعية الرقمية.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
