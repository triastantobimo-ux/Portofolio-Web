import type { MetadataRoute } from "next";
import { getArticleMetas } from "@/lib/articles";

const BASE = "https://bimogt.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticleMetas().map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...articles,
  ];
}
