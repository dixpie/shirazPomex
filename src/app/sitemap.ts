import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getProducts, getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const [products, posts] = await Promise.all([
      getProducts(),
      getPosts(),
    ]);

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${siteConfig.url}/products/${p.fa.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
