import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drrnour.com";

  const fontSlugs = [
    "talheen",
    "waraqa",
    "khatt-nour",
    "majd",
    "rawaa",
    "naskh-modern",
  ];

  const journalSlugs = [
    "poetic-house",
    "talheen-story",
    "variable-fonts",
    "bilingual-harmony",
    "kufi-revival",
  ];

  const brushSlugs = [
    "nour-signature",
    "thuluth-reed",
    "ruqah-sharp",
    "tashkeel-master",
  ];

  const fontUrls = fontSlugs.map((slug) => ({
    url: `${baseUrl}/fonts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const brushUrls = brushSlugs.map((slug) => ({
    url: `${baseUrl}/brushes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const journalUrls = journalSlugs.map((slug) => ({
    url: `${baseUrl}/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fonts`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/brushes`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    ...fontUrls,
    ...brushUrls,
    ...journalUrls,
  ];
}

