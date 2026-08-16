import BrushDetailClient from "./BrushDetailClient";
import { brushDataMap } from "@/app/brushes/brushData";

export function generateStaticParams() {
  return Object.keys(brushDataMap).map((slug) => ({ slug }));
}

export default function BrushSlugPage({ params }: { params: { slug: string } }) {
  const brush = brushDataMap[params.slug] || null;
  return <BrushDetailClient brush={brush} slug={params.slug} />;
}
