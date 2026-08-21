"use client";

import { useEffect, useId, useState } from "react";
import type { Artwork } from "../../lib/artworks";

export function ArtworkDrawer({ artwork }: { artwork: Artwork }) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const requestAcquisition = () => {
    const subject = encodeURIComponent(`Acquisition — ${artwork.title}`);
    const body = encodeURIComponent(
      `Bonjour Marina,\n\nJe souhaite échanger avec vous au sujet de « ${artwork.title} » (${artwork.dimensions}, ${artwork.priceLabel}).\n\nMerci,`,
    );
    window.location.href = `mailto:bonjour@ateliermarina.fr?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <button
        className="acquire-button"
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={artwork.status === "sold"}
      >
        {artwork.status === "sold" ? "Œuvre vendue" : "Voir et acquérir"}
        <span aria-hidden="true">↗</span>
      </button>
      {isOpen ? (
        <div className="drawer-shell">
          <button className="drawer-backdrop" type="button" aria-label="Fermer le panneau d’acquisition" onClick={() => setIsOpen(false)} />
          <aside className="purchase-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div className="drawer-topbar">
              <p>Œuvre disponible</p>
              <button className="drawer-close" type="button" onClick={() => setIsOpen(false)} aria-label="Fermer">×</button>
            </div>
            <div className="drawer-content">
              <img src={artwork.image} alt={artwork.imageAlt} />
              <div className="drawer-title-row">
                <div>
                  <p className="eyebrow">Pièce unique · {artwork.year}</p>
                  <h2 id={titleId}>{artwork.title}</h2>
                </div>
                <strong>{artwork.priceLabel}</strong>
              </div>
              <p className="drawer-description">{artwork.description}</p>
              <dl className="drawer-specs">
                <div><dt>Disponibilité</dt><dd>Pièce unique · Disponible</dd></div>
                <div><dt>Format</dt><dd>{artwork.dimensions}</dd></div>
                <div><dt>Technique</dt><dd>{artwork.medium}</dd></div>
                <div><dt>Inclus</dt><dd>Certificat d’authenticité</dd></div>
              </dl>
              <button className="checkout-button" type="button" onClick={requestAcquisition}>Demander à l’acquérir</button>
              <p className="checkout-note">
                Votre message ouvre un échange direct avec l’artiste. La disponibilité, le transport et le règlement sont confirmés ensemble avant toute décision.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
