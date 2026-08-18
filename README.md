# Marina — galerie éditoriale

![Portrait éditorial de Marina portant une œuvre](public/art/portrait-editorial.png)

Une première version volontairement nette : une galerie d’artiste statique,
rapide, SEO-friendly et déployée automatiquement sur
[`sitemarina.pages.dev`](https://sitemarina.pages.dev).

> Les titres, dimensions, textes et prix actuels sont des contenus de démonstration
> à valider avec l’artiste avant la publication officielle.

## Périmètre produit

### V1 — la Page actuelle

- direction artistique et récit de marque ;
- collection de trois œuvres ;
- fiches d’acquisition en panneau latéral ;
- demande de réservation préremplie par e-mail ;
- SEO : métadonnées, sitemap, robots et données structurées `VisualArtwork` ;
- export 100 % statique vers Cloudflare Pages ;
- CI, versioning et déploiement automatiques.

### V2 — le Worker commerce

- Stripe Embedded Checkout dans le panneau du site ;
- inventaire D1 et réservation temporaire anti-double-vente ;
- webhook signé pour confirmer ou libérer l’œuvre ;
- administration des disponibilités et commandes.

Le découpage est volontaire : la V1 n’embarque aucun serveur, aucune base et aucun
secret de paiement. Le Worker n’arrive que lorsque l’artiste ouvre réellement les
ventes. Une base de travail V2 est conservée hors build dans `archive/worker-v2/`.

## Site et Instagram

Le rythme ternaire appartient à Instagram, pas à la navigation du site :

1. portrait en pied — masque, œuvre portée, pieds nus, décor fixe ;
2. détail rapproché de la toile ;
3. histoire et informations de l’œuvre.

Le site reste plus libre et plus calme. Le masque éditorial possède désormais une
langue sculpturale corail à pointe bleue, signe mémorable de cette première série.

## Stack

- Next App Router via **vinext**
- React 19, TypeScript et CSS éditorial sur mesure
- génération du bundle avec Vite
- script d’export statique dans `scripts/export-static.mjs`
- Cloudflare Pages pour la production V1
- GitHub Actions pour CI/CD

`vinext build` produit normalement une application Worker. Pour conserver la même
base Next tout en livrant une Page V1, le script d’export rend les routes publiques,
copie les assets optimisés et génère le dossier `out/` attendu par Cloudflare Pages.

## Lancer le projet

Prérequis : Node.js 24 et npm.

```bash
npm ci
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Construire la Page statique

```bash
npm run build:static
```

Le résultat déployable est généré dans `out/` :

```text
out/
├── index.html
├── merci/index.html
├── robots.txt
├── sitemap.xml
├── art/
└── _next/
```

## Catalogue

Les œuvres sont définies dans `lib/artworks.ts`. Pour chaque pièce, valider le
titre, l’année, les dimensions, la technique, le prix, l’image, le texte alternatif,
la description et la disponibilité.

Avant le vrai lancement, remplacer `bonjour@ateliermarina.fr` et les liens sociaux.

## CI/CD autonome

Le pipeline reprend le fonctionnement de `site-agathe` :

1. `.github/workflows/ci.yml` exécute lint, build statique et tests ;
2. une CI verte sur `main` déclenche `release-deploy.yml` ;
3. le workflow vérifie que le commit validé est toujours la tête de `main` ;
4. il incrémente la version patch et crée un tag Git ;
5. il déploie automatiquement `out/` sur Cloudflare Pages.

### Bootstrap Cloudflare — une seule fois

Le nom du projet est **`sitemarina`** et son URL est
**`https://sitemarina.pages.dev`**.

Si le projet Pages n’existe pas encore :

```bash
npx wrangler pages project create sitemarina --production-branch=main
```

Secrets GitHub nécessaires :

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

`NEXT_PUBLIC_SITE_URL` est facultatif ; le workflow utilise
`https://sitemarina.pages.dev` par défaut. Le `GITHUB_TOKEN` natif suffit pour le
commit de version et le tag.

## Commandes de qualité

```bash
npm run lint
npm test
npm run build:static
```

## Avant publication officielle

- valider les vrais titres, formats, techniques et prix ;
- remplacer e-mail et Instagram ;
- rédiger mentions légales et politique de confidentialité ;
- convertir les visuels finaux en WebP/AVIF ;
- tester la navigation mobile ;
- lancer une release manuelle de contrôle.

## V2 commerce — décision retenue

Stripe reste le choix recommandé pour le paiement intégré : pas d’abonnement fixe
sur l’offre standard et une expérience embarquée dans la DA du site. Shopify devient
pertinent si la gestion catalogue, la logistique et le back-office prennent le dessus.

Références : [tarification Stripe](https://stripe.com/fr/pricing),
[Checkout embarqué](https://docs.stripe.com/payments/checkout-sessions),
[panier headless Shopify](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).

## Crédits et droits

Les œuvres restent la propriété intellectuelle de l’artiste. Les visuels de la
démo ne doivent pas être réutilisés hors de ce projet sans son accord.
