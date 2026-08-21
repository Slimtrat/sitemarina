import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./stronger.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Marina — Peintures originales",
    template: "%s — Marina",
  },
  description:
    "Peintures originales et commandes sur mesure de Marina. Découvrez les pièces uniques disponibles et entrez dans un univers organique, libre et intensément coloré.",
  keywords: [
    "art contemporain",
    "peinture originale",
    "artiste peintre",
    "œuvre unique",
    "commande peinture sur mesure",
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
      "Peintures originales, pièces uniques disponibles et commandes sur mesure.",
    images: [
      {
        url: "/art/portrait-editorial.png",
        alt: "Marina, artiste masquée portant une œuvre originale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marina — Des mondes à habiter",
    description:
      "Peintures originales, pièces uniques disponibles et commandes sur mesure.",
    images: ["/art/portrait-editorial.png"],
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
