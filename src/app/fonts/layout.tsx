import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خطوط عربية ولاتينية",
  description: "مكتبة خطوط عربية ولاتينية متغيرة وحصرية من تصميم نور محمد. تصفّح خطوط تلحين وورقة وخط نور وغيرها.",
};

export default function FontsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
