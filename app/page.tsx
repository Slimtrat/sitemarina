import { PurchaseDrawer } from "./components/PurchaseDrawer";
import { artworks } from "../lib/artworks";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: artworks.map((artwork, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VisualArtwork",
        name: artwork.title,
        artMedium: artwork.medium,
        width: artwork.dimensions,
        image: artwork.image,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: artwork.price / 100,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Marina, retour en haut">
          MARINA
        </a>
        <nav aria-label="Navigation principale">
          <a href="#oeuvres">Œuvres</a>
          <a href="#artiste">L’artiste</a>
          <a href="#journal">Journal</a>
          <a className="nav-accent" href="#contact">Écrire</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src="/art/portrait-editorial.png"
          alt="Artiste masquée portant une toile colorée, les pieds nus dans un studio minéral"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Peintures originales · Pièces uniques</p>
          <h1 id="hero-title">
            Des mondes à
            <br />
            <em>habiter.</em>
          </h1>
        </div>
        <a className="hero-link" href="#oeuvres">
          Découvrir les œuvres <span aria-hidden="true">↓</span>
        </a>
        <p className="hero-index" aria-hidden="true">
          ÉDITION 01 — 2026
        </p>
      </section>

      <section className="manifesto" aria-label="Manifeste">
        <p className="eyebrow">Un langage instinctif</p>
        <p className="manifesto-text">
          Je peins des territoires où les êtres, les plantes et les signes se
          rencontrent. <em>La couleur ouvre la porte.</em>
        </p>
        <p className="manifesto-signature">— Marina</p>
      </section>

      <section className="works" id="oeuvres" aria-labelledby="works-title">
        <div className="section-heading">
          <p className="eyebrow">Œuvres disponibles · 01—03</p>
          <h2 id="works-title">Chaque toile est un passage.</h2>
        </div>

        <div className="works-grid">
          {artworks.map((artwork, index) => (
            <article
              className={`work-card work-card-${index + 1}`}
              key={artwork.id}
            >
              <div className="work-image-wrap">
                <img src={artwork.image} alt={artwork.imageAlt} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="work-card-heading">
                <div>
                  <p>{artwork.year}</p>
                  <h3>{artwork.title}</h3>
                </div>
                <strong>{artwork.priceLabel}</strong>
              </div>
              <p className="work-medium">
                {artwork.medium} · {artwork.dimensions}
              </p>
              <PurchaseDrawer artwork={artwork} />
            </article>
          ))}
        </div>
      </section>

      <section className="detail-break" aria-label="Détail d’une œuvre">
        <div className="detail-image">
          <img
            src="/art/le-songe.png"
            alt="Détail de la peinture Le Songe, visage et formes colorées"
          />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Regarder de près</p>
          <blockquote>
            « Je commence sans croquis. Une forme appelle la suivante, jusqu’à
            ce que le monde trouve son équilibre. »
          </blockquote>
          <p>
            Les traits restent visibles. Les rencontres de couleurs, les gestes
            et les accidents font partie de l’œuvre.
          </p>
        </div>
      </section>

      <section className="artist" id="artiste" aria-labelledby="artist-title">
        <div className="artist-title-wrap">
          <p className="eyebrow">Dans l’atelier</p>
          <h2 id="artist-title">Peindre pour faire apparaître.</h2>
        </div>
        <div className="artist-body">
          <p className="artist-lead">
            Marina construit une peinture foisonnante, peuplée de figures
            libres, de récits minuscules et de signes qui semblent venir d’un
            alphabet intime.
          </p>
          <p>
            Chaque toile est réalisée lentement, sans répétition ni tirage. Elle
            porte les traces du geste, les changements de direction et les
            couches qui ont permis à l’image d’émerger.
          </p>
          <a href="mailto:bonjour@ateliermarina.fr">
            Parler avec l’artiste <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="campaign" id="journal" aria-labelledby="campaign-title">
        <div className="campaign-photo">
          <img
            src="/art/portrait-editorial.png"
            alt="Portrait éditorial de l’artiste portant son œuvre"
          />
        </div>
        <div className="campaign-copy">
          <p className="eyebrow">Le journal d’une œuvre</p>
          <h2 id="campaign-title">Un même décor. Un masque. Une œuvre portée.</h2>
          <p>
            Sur Instagram, chaque création apparaît en trois gestes : le portrait
            éditorial, le regard rapproché, puis son histoire. Un rituel visuel
            pour reconnaître l’univers avant même de lire le nom.
          </p>
          <a href="#contact">Suivre les prochaines apparitions ↗</a>
        </div>
      </section>

      <section className="acquisition" aria-labelledby="acquisition-title">
        <div>
          <p className="eyebrow">Acquérir une œuvre</p>
          <h2 id="acquisition-title">Une pièce unique, accompagnée jusqu’à vous.</h2>
        </div>
        <div className="acquisition-points">
          <div>
            <span>01</span>
            <h3>Authenticité</h3>
            <p>Œuvre signée et certificat original remis avec la toile.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Paiement</h3>
            <p>Règlement sécurisé par carte, directement sur le site.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Livraison</h3>
            <p>Emballage adapté et solution de transport validée ensemble.</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-invitation">
          <p className="eyebrow">Une question, une visite, une œuvre</p>
          <a href="mailto:bonjour@ateliermarina.fr">
            Écrivez-moi
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Marina</p>
          <div>
            <a href="#top">Instagram</a>
            <a href="mailto:bonjour@ateliermarina.fr">E-mail</a>
            <a href="#top">Mentions légales</a>
          </div>
          <a href="#top">Retour en haut ↑</a>
        </div>
      </footer>
    </main>
  );
}
