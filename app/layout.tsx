import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Marina — Peintures originales",
    template: "%s — Marina",
  },
  description:
    "Peintures originales et pièces uniques de Marina. Découvrez un univers organique, libre et intensément coloré.",
  keywords: [
    "art contemporain",
    "peinture originale",
    "artiste peintre",
    "œuvre unique",
    "peinture colorée",
  ],
  authors: [{ name: "Marina" }],
  creator: "Marina",
  icons: {
    icon: "/art/le-songe.png",
    shortcut: "/art/le-songe.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Marina",
    title: "Marina — Des mondes à habiter",
    description:
      "Peintures originales, formes vivantes et pièces uniques à découvrir.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marina — Des mondes à habiter",
    description:
      "Peintures originales, formes vivantes et pièces uniques à découvrir.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f1ebdf",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
