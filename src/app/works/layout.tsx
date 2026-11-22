import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أعمالي | Works",
  description: "مختارات من أعمال نور منصور في تصميم الخطوط العربية واللاتينية والهندسة الطباعية والهويات البصرية.",
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
