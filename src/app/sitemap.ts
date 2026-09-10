import type { MetadataRoute } from "next";
import { loadEssays, loadProjects } from "@/lib/content/load";

const BASE = "https://maxallaire.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/thesis", "/work", "/resume"].map((p) => ({ url: `${BASE}${p}` }));
  const essays = loadEssays().map((e) => ({ url: `${BASE}/thesis/${e.slug}`, lastModified: e.updated }));
  const projects = loadProjects().map((p) => ({ url: `${BASE}/work/${p.slug}` }));
  return [...staticRoutes, ...essays, ...projects];
}
