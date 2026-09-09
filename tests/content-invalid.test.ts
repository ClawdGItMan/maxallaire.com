import { describe, it, expect, vi, afterEach } from "vitest";
import path from "node:path";
import { loadProjects, loadEssays } from "@/lib/content/load";

const fixture = (name: string) => path.join(import.meta.dirname, "fixtures", name);

describe("loaders on bad or empty content", () => {
  afterEach(() => vi.restoreAllMocks());

  it("throw an error that names the offending file and field", () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixture("bad"));
    expect(() => loadProjects()).toThrowError(/content\/projects\/bad\.json[\s\S]*slug/);
  });

  it("return [] when content/projects or content/thesis is missing", () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixture("empty"));
    expect(loadProjects()).toEqual([]);
    expect(loadEssays()).toEqual([]);
  });
});
