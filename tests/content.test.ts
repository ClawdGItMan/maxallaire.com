import { describe, it, expect } from "vitest";
import {
  loadProjects,
  loadProject,
  loadEssays,
  loadEssay,
  loadSite,
  resolveScreenshot,
} from "@/lib/content/load";

describe("content", () => {
  it("every project validates and has unique slugs", () => {
    const p = loadProjects();
    expect(new Set(p.map((x) => x.slug)).size).toBe(p.length);
  });

  it("projects are sorted by band (headliner → shipped → experiment) then order", () => {
    const p = loadProjects();
    const rank = { headliner: 0, shipped: 1, experiment: 2 } as const;
    for (let i = 1; i < p.length; i++) {
      const a = p[i - 1];
      const b = p[i];
      const ok =
        rank[a.band] < rank[b.band] ||
        (rank[a.band] === rank[b.band] && a.order <= b.order);
      expect(ok, `${a.slug} should sort before ${b.slug}`).toBe(true);
    }
  });

  it("loadProject finds by slug and returns undefined for unknown", () => {
    const p = loadProjects();
    if (p.length > 0) expect(loadProject(p[0].slug)?.slug).toBe(p[0].slug);
    expect(loadProject("definitely-not-a-project")).toBeUndefined();
  });

  it("essays validate and are sorted by order", () => {
    const e = loadEssays();
    expect(Array.isArray(e)).toBe(true);
    for (let i = 1; i < e.length; i++) expect(e[i - 1].order <= e[i].order).toBe(true);
    if (e.length > 0) {
      expect(typeof e[0].body).toBe("string");
      expect(loadEssay(e[0].slug)?.slug).toBe(e[0].slug);
    }
    expect(loadEssay("definitely-not-an-essay")).toBeUndefined();
  });


  it("site config validates", () => {
    expect(loadSite().name).toBeTruthy();
  });

  it("resolveScreenshot falls back to the placeholder when the file is missing", () => {
    expect(resolveScreenshot("/screenshots/nope/missing.png")).toBe("/screenshots/_placeholder.png");
    expect(resolveScreenshot("/screenshots/_placeholder.png")).toBe("/screenshots/_placeholder.png");
  });
});
