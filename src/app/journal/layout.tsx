import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدوّنة",
  description: "كرّسة أفكار متفرّقة عن التصميم الطباعي، الخطوط العربية، والهندسة الحرفية المعاصرة.",
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
