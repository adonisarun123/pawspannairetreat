import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] =
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/sessions", priority: 0.95, changeFrequency: "weekly" },
    { path: "/the-park", priority: 0.9, changeFrequency: "monthly" },
    { path: "/the-park/bone-pool", priority: 0.8, changeFrequency: "monthly" },
    { path: "/the-park/farm-walks", priority: 0.7, changeFrequency: "monthly" },
    { path: "/parties-and-training", priority: 0.85, changeFrequency: "monthly" },
    {
      path: "/parties-and-training/birthday-parties",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/stay-at-bsf", priority: 0.85, changeFrequency: "monthly" },
    { path: "/our-story", priority: 0.7, changeFrequency: "yearly" },
    { path: "/our-story/the-wider-farm", priority: 0.6, changeFrequency: "yearly" },
    { path: "/plan-your-visit", priority: 0.9, changeFrequency: "monthly" },
    { path: "/plan-your-visit/faq", priority: 0.85, changeFrequency: "monthly" },
    { path: "/plan-your-visit/park-rules", priority: 0.7, changeFrequency: "monthly" },
    { path: "/plan-your-visit/getting-here", priority: 0.85, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/policies", priority: 0.3, changeFrequency: "yearly" },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
