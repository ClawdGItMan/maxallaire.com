import { ImageResponse } from "next/og";
import { loadSite, loadProjects } from "@/lib/content/load";

export const alt = "Max Allaire — crypto × AI, researched and prototyped";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const site = loadSite();
  const projects = loadProjects();
  const live = projects.filter((p) => p.status === "live").length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0a0b0e 0%, #14161c 100%)",
          color: "#ede8dd",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a9a49a", fontFamily: "monospace", letterSpacing: 2 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ff7a45" }} />
          {site.name.toUpperCase()} · MAXALLAIRE.COM
        </div>
        <div style={{ display: "flex", fontSize: 66, lineHeight: 1.04, letterSpacing: -2, maxWidth: 1000 }}>{site.headline}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 22, color: "#a9a49a", fontFamily: "monospace" }}>
          <div style={{ display: "flex" }}>{projects.length} PROJECTS · {live} LIVE · CRYPTO × AI</div>
          <div style={{ display: "flex", color: "#ffb490" }}>Thesis · Work · How I Work · Resume</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
