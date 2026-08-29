import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.fullName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0073bc",
    lang: "fa",
    dir: "rtl",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
