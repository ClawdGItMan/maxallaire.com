import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import { loadSite } from "@/lib/content/load";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

const site = loadSite();

export const metadata: Metadata = {
  metadataBase: new URL("https://maxallaire.com"),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.headline,
  openGraph: {
    title: site.name,
    description: site.headline,
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Nav name={site.name} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
