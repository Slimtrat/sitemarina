export type Artwork = {
  id: string;
  title: string;
  year: number;
  image: string;
  imageAlt: string;
  dimensions: string;
  medium: string;
  price: number;
  priceLabel: string;
  description: string;
  status: "available" | "sold";
};

export const artworks: Artwork[] = [
  {
    id: "monde-interieur",
    title: "Le Monde intérieur",
    year: 2026,
    image: "/art/monde-interieur.png",
    imageAlt:
      "Grande peinture aux formes organiques cyan, rose, jaune et bleu, photographiée dans l’atelier",
    dimensions: "120 × 100 cm",
    medium: "Acrylique et encre sur toile",
    price: 280000,
    priceLabel: "2 800 €",
    description:
      "Une cartographie libre où visages, plantes et créatures se croisent sans hiérarchie. La toile se regarde comme on explore un territoire.",
    status: "available",
  },
  {
    id: "le-songe",
    title: "Le Songe",
    year: 2025,
    image: "/art/le-songe.png",
    imageAlt:
      "Peinture colorée composée de silhouettes, de feuilles et de formes géométriques entrelacées",
    dimensions: "100 × 80 cm",
    medium: "Acrylique sur toile",
    price: 220000,
    priceLabel: "2 200 €",
    description:
      "Des formes s’assemblent comme les fragments d’un rêve au réveil. Une scène dense, traversée par un visage qui relie les différents récits.",
    status: "available",
  },
  {
    id: "jardin-des-formes",
    title: "Jardin des formes",
    year: 2025,
    image: "/art/jardin-des-formes.png",
    imageAlt:
      "Peinture panoramique foisonnante de personnages, d’animaux et de végétaux aux couleurs franches",
    dimensions: "100 × 70 cm",
    medium: "Acrylique et feutre sur toile",
    price: 190000,
    priceLabel: "1 900 €",
    description:
      "Un paysage sans horizon où chaque détail ouvre une histoire. Les personnages et les plantes s’y répondent dans un mouvement continu.",
    status: "available",
  },
];

export function getArtwork(id: string) {
  return artworks.find((artwork) => artwork.id === id);
}
