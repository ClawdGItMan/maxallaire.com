import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ZodType } from "zod";
import {
  ProjectSchema,
  EssayFrontmatter,
  SiteSchema,
  type Project,
  type Essay,
  type Site,
  type Band,
} from "./schema";

const contentDir = () => path.join(process.cwd(), "content");
const publicDir = () => path.join(process.cwd(), "public");

export const PLACEHOLDER_SCREENSHOT = "/screenshots/_placeholder.png";

const BAND_RANK: Record<Band, number> = { headliner: 0, shipped: 1, experiment: 2 };

/** Validate `data` against `schema`; on failure throw an error naming the offending file. */
function parseOrThrow<T>(schema: ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const issues = result.error.issues
    .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid content in ${file}:\n${issues}`);
}

function readJson(file: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    throw new Error(`Could not read JSON from ${file}: ${(err as Error).message}`);
  }
}

/**
 * YAML parses an unquoted `2026-09-09` as a Date. Authors should not have to quote dates,
 * so turn any Date in frontmatter back into a plain YYYY-MM-DD string before validation.
 */
function normaliseDates(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = v instanceof Date ? v.toISOString().slice(0, 10) : v;
  }
  return out;
}

/** List files in a content subdirectory with the given extension; [] if the directory is absent. */
function listFiles(subdir: string, ext: string): string[] {
  const dir = path.join(contentDir(), subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(ext) && !f.startsWith("."))
    .sort()
    .map((f) => path.join(dir, f));
}

export function loadProjects(): Project[] {
  const projects = listFiles("projects", ".json").map((file) =>
    parseOrThrow(ProjectSchema, readJson(file), file),
  );
  const seen = new Map<string, number>();
  for (const p of projects) seen.set(p.slug, (seen.get(p.slug) ?? 0) + 1);
  const dupes = [...seen].filter(([, n]) => n > 1).map(([s]) => s);
  if (dupes.length) throw new Error(`Duplicate project slugs in content/projects: ${dupes.join(", ")}`);
  return projects.sort(
    (a, b) => BAND_RANK[a.band] - BAND_RANK[b.band] || a.order - b.order || a.slug.localeCompare(b.slug),
  );
}

export function loadProject(slug: string): Project | undefined {
  return loadProjects().find((p) => p.slug === slug);
}

export function loadEssays(): Essay[] {
  const essays = listFiles("thesis", ".md").map((file) => {
    let parsed: matter.GrayMatterFile<string>;
    try {
      parsed = matter(fs.readFileSync(file, "utf8"));
    } catch (err) {
      throw new Error(`Could not parse frontmatter in ${file}: ${(err as Error).message}`);
    }
    const fm = parseOrThrow(EssayFrontmatter, normaliseDates(parsed.data), file);
    const body = parsed.content.trim();
    if (!body) throw new Error(`Essay ${file} has no body`);
    return { ...fm, body };
  });
  const seen = new Set<string>();
  for (const e of essays) {
    if (seen.has(e.slug)) throw new Error(`Duplicate essay slug "${e.slug}" in content/thesis`);
    seen.add(e.slug);
  }
  return essays.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function loadEssay(slug: string): Essay | undefined {
  return loadEssays().find((e) => e.slug === slug);
}

export function loadSite(): Site {
  const file = path.join(contentDir(), "site.json");
  return parseOrThrow(SiteSchema, readJson(file), file);
}

/** Read an optional markdown document from content/ (e.g. "how-i-work.md"); undefined if absent. */
export function loadMarkdown(name: string): string | undefined {
  const file = path.join(contentDir(), name);
  if (!fs.existsSync(file)) return undefined;
  return fs.readFileSync(file, "utf8").trim();
}

/**
 * Return `src` if that file exists under public/, otherwise the placeholder.
 * Lets project entries reference screenshots that another stream has not produced yet.
 */
export function resolveScreenshot(src: string): string {
  if (!src.startsWith("/")) return PLACEHOLDER_SCREENSHOT;
  const root = publicDir();
  const onDisk = path.join(root, src);
  if (!onDisk.startsWith(root)) return PLACEHOLDER_SCREENSHOT;
  return fs.existsSync(onDisk) ? src : PLACEHOLDER_SCREENSHOT;
}
