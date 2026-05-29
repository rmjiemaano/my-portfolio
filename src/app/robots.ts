import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // Stops Google from wasting time crawling your OKX route
    },
    sitemap: "https://remejie-maano.vercel.app/sitemap.xml", // Replace with your actual live link
  };
}