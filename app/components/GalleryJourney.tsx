"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Artwork } from "../../lib/artworks";
import styles from "./GalleryJourney.module.css";

const roomAccents = ["#d9ff36", "#f06449", "#ef87bb"];
const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function GalleryJourney({ artworks }: { artworks: Artwork[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track || artworks.length === 0) return;
      const rect = track.getBoundingClientRect();
      const raw = clamp(
        -rect.top / window.innerHeight,
        0,
        artworks.length - 0.001,
      );
      const nextIndex = Math.min(artworks.length - 1, Math.floor(raw));
      setActiveIndex(nextIndex);
      setLocalProgress(raw - nextIndex);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [artworks.length]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewerIndex(null);
      if (event.key === "ArrowLeft") {
        setViewerIndex((current) =>
          current === null
            ? null
            : (current - 1 + artworks.length) % artworks.length,
        );
      }
      if (event.key === "ArrowRight") {
        setViewerIndex((current) =>
          current === null ? null : (current + 1) % artworks.length,
        );
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [viewerIndex, artworks.length]);

  if (artworks.length === 0) return null;

  const artwork = artworks[activeIndex];
  const revealIn = clamp((localProgress - 0.03) / 0.2);
  const revealOut =
    activeIndex === artworks.length - 1
      ? 1
      : clamp((1 - localProgress) / 0.1);
  const infoReveal = revealIn * revealOut;
  const overallProgress =
    (activeIndex + localProgress) / Math.max(1, artworks.length);
  const trackStyle = {
    "--gallery-count": artworks.length,
  } as CSSProperties;
  const stageStyle = {
    "--art-zoom": 0.985 + localProgress * 0.055,
    "--info-reveal": infoReveal,
    "--journey-progress": overallProgress,
    "--room-accent": roomAccents[activeIndex % roomAccents.length],
  } as CSSProperties;

  const jumpTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top;
    window.scrollTo({
      top: top + index * window.innerHeight,
      behavior: "smooth",
    });
  };

  const requestAcquisition = (selected: Artwork) => {
    const subject = encodeURIComponent(`Acquisition — ${selected.title}`);
    const body = encodeURIComponent(
      `Bonjour Marina,\n\nJe souhaite échanger avec vous au sujet de « ${selected.title} » (${selected.dimensions}, ${selected.priceLabel}).\n\nMerci,`,
    );
    window.location.href = `mailto:bonjour@ateliermarina.fr?subject=${subject}&body=${body}`;
  };

  const viewerArtwork = viewerIndex === null ? null : artworks[viewerIndex];

  return (
    <section className={styles.gallery} id="oeuvres" aria-labelledby="gallery-title">
      <div className={styles.prelude}>
        <div className={styles.preludeMeta}>
          <p className="eyebrow">La collection · {artworks.length} pièces uniques</p>
          <p>Catalogue complet · Édition 01 — 2026</p>
        </div>
        <h2 id="gallery-title">
          Prendre le temps
          <br />
          <em>de regarder.</em>
        </h2>
        <div className={styles.preludeNote}>
          <span aria-hidden="true">↓</span>
          <p>Une toile à la fois. Le scroll révèle son histoire, le clic ouvre sa matière.</p>
        </div>
      </div>

      <div className={styles.track} ref={trackRef} style={trackStyle}>
        <div className={styles.stage} style={stageStyle}>
          <div className={styles.progress} aria-hidden="true"><i /></div>
          <p className={styles.stageLabel}>Marina · Peintures originales</p>

          <nav className={styles.anchors} aria-label="Choisir une œuvre">
            {artworks.map((item, index) => (
              <button
                className={index === activeIndex ? styles.activeAnchor : ""}
                type="button"
                key={item.id}
                onClick={() => jumpTo(index)}
                aria-label={`Aller à ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </button>
            ))}
          </nav>

          <div className={styles.stageCount} aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(artworks.length).padStart(2, "0")}</span>
          </div>

          <div className={styles.colorWall} aria-hidden="true" />
          <p className={styles.backdropTitle} aria-hidden="true">{artwork.title}</p>

          <button
            className={styles.artworkButton}
            type="button"
            key={artwork.id}
            onClick={() => setViewerIndex(activeIndex)}
            aria-label={`Ouvrir l’œuvre ${artwork.title} en grand`}
          >
            <img src={artwork.image} alt={artwork.imageAlt} />
            <span>Voir en grand <i aria-hidden="true">＋</i></span>
          </button>

          <aside className={styles.cartel} aria-live="polite">
            <div className={styles.cartelTopline}>
              <p>{String(activeIndex + 1).padStart(2, "0")}</p>
              <i />
              <p>{artwork.status === "available" ? "Disponible" : "Vendue"}</p>
            </div>
            <h3>{artwork.title}</h3>
            <div className={styles.specs}>
              <p>{artwork.medium}</p>
              <p>{artwork.dimensions} · {artwork.year}</p>
            </div>
            <p className={styles.description}>{artwork.description}</p>
            <div className={styles.cartelBottom}>
              <strong>{artwork.priceLabel}</strong>
              <button type="button" onClick={() => requestAcquisition(artwork)}>
                Acquérir cette œuvre <span aria-hidden="true">↗</span>
              </button>
            </div>
          </aside>

          <p className={styles.scrollCue} aria-hidden="true">
            {activeIndex < artworks.length - 1 ? "Œuvre suivante" : "Quitter la galerie"}
            <span>↓</span>
          </p>
        </div>
      </div>

      <div className={styles.handoff}>
        <p className="eyebrow">Au-delà de l’image</p>
        <p className={styles.handoffStatement}>
          La peinture garde
          <br />
          <em>la trace du geste.</em>
        </p>
        <a href="#matiere">Descendre dans la matière <span aria-hidden="true">↓</span></a>
      </div>

      {viewerArtwork && viewerIndex !== null ? (
        <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={`${viewerArtwork.title}, vue agrandie`}>
          <button className={styles.viewerClose} type="button" onClick={() => setViewerIndex(null)} aria-label="Fermer la vue agrandie">
            Fermer <span aria-hidden="true">×</span>
          </button>
          <div className={styles.viewerImage} key={viewerArtwork.id}>
            <img src={viewerArtwork.image} alt={viewerArtwork.imageAlt} />
          </div>
          <aside className={styles.viewerInfo}>
            <p>{String(viewerIndex + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}</p>
            <h2>{viewerArtwork.title}</h2>
            <dl>
              <div><dt>Format</dt><dd>{viewerArtwork.dimensions}</dd></div>
              <div><dt>Technique</dt><dd>{viewerArtwork.medium}</dd></div>
              <div><dt>Année</dt><dd>{viewerArtwork.year}</dd></div>
              <div><dt>Prix</dt><dd>{viewerArtwork.priceLabel}</dd></div>
            </dl>
            <button type="button" onClick={() => requestAcquisition(viewerArtwork)}>
              Demander à l’acquérir <span aria-hidden="true">↗</span>
            </button>
          </aside>
          <div className={styles.viewerNav}>
            <button type="button" onClick={() => setViewerIndex((viewerIndex - 1 + artworks.length) % artworks.length)} aria-label="Œuvre précédente">←</button>
            <button type="button" onClick={() => setViewerIndex((viewerIndex + 1) % artworks.length)} aria-label="Œuvre suivante">→</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
