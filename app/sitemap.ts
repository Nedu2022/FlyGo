import type { MetadataRoute } from "next";
import { STAYS } from "@/lib/liteapi";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "daily"),
    page("/flights", 0.9, "daily"),
    page("/hotels", 0.9, "daily"),
    page("/hotels/search", 0.8, "daily"),
    page("/hotels/search?type=apartments", 0.8, "daily"),
    page("/private-jets", 0.8),
    page("/host", 0.7),
    page("/about", 0.4, "monthly"),
    page("/contact", 0.5, "monthly"),
    page("/terms", 0.2, "monthly"),
    page("/privacy", 0.2, "monthly"),
    ...STAYS.map((h) => page(`/hotels/${h.id}`, 0.6)),
  ];
}
