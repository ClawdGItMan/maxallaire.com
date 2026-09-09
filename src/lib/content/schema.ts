import { z } from "zod";

export const Band = z.enum(["headliner", "shipped", "experiment"]);
export type Band = z.infer<typeof Band>;

export const Status = z.enum(["live", "demo", "prototype", "case-study", "archived"]);
export type Status = z.infer<typeof Status>;

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  oneLiner: z.string().max(140),
  band: Band,
  status: Status,
  period: z.string(), // "Mar–Sep 2026"
  order: z.number().int(), // sort within band, ascending
  stack: z.array(z.string()),
  links: z.object({
    repo: z.url().optional(),
    live: z.url().optional(),
    demo: z.url().optional(),
  }),
  screenshots: z.array(z.object({ src: z.string(), alt: z.string() })).min(1),
  whatIBuilt: z.string(), // markdown, 1–3 paragraphs
  whatILearned: z.string(), // markdown, 1–3 paragraphs
  solanaRelevance: z.string().optional(),
  builtWithAI: z.string().optional(), // one paragraph: how AI tooling was used
});
export type Project = z.infer<typeof ProjectSchema>;

export const EssayFrontmatter = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  order: z.number().int(),
  updated: z.string(), // ISO date
  thirtySecond: z.string(), // the punchline paragraph
  whatWouldMakeMeWrong: z.array(z.string()).min(1),
});
export type Essay = z.infer<typeof EssayFrontmatter> & { body: string };

export const TimelineEntry = z.object({
  month: z.string(), // "2026-03"
  title: z.string(),
  detail: z.string(),
  projectSlug: z.string().optional(),
});
export const TimelineSchema = z.array(TimelineEntry);
export type Timeline = z.infer<typeof TimelineSchema>;

export const SiteSchema = z.object({
  name: z.string(),
  headline: z.string(),
  sub: z.string(),
  email: z.email(),
  linkedin: z.url(),
  github: z.url(),
  /** X (Twitter) profile, e.g. https://x.com/handle */
  x: z.url().optional(),
  resumePdf: z.string(), // "/resume.pdf"
  /** Short "what I'm doing now" line for the hero and footer. */
  now: z.string().optional(),
  /** Numbers shown in the proof strip: [{ value: "721", label: "commits on Hearth" }] */
  stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});
export type Site = z.infer<typeof SiteSchema>;
