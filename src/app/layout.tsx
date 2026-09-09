import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { loadSite } from "@/lib/content/load";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const site = loadSite();

export const metadata: Metadata = {
  metadataBase: new URL("https://maxallaire.com"),
  title: { default: `${site.name} — crypto × AI, researched and prototyped`, template: `%s — ${site.name}` },
  description: site.headline,
  openGraph: {
    title: site.name,
    description: site.headline,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Nav name={site.name} resumePdf={site.resumePdf} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer site={site} />
        <Reveal />
      </body>
    </html>
  );
}
