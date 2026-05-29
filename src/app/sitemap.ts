import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://remejie-maano.vercel.app", // Replace with your actual live link
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}