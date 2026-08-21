"use client";

import { FormEvent, useEffect, useId, useState } from "react";

export function CommissionDrawer() {
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

  const prepareRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const format = String(form.get("format") || "À définir ensemble");
    const budget = String(form.get("budget") || "À définir ensemble");
    const project = String(form.get("project") || "");
    const subject = encodeURIComponent(`Commande sur mesure — ${name}`);
    const body = encodeURIComponent(
      `Bonjour Marina,\n\nJe souhaite imaginer une œuvre sur mesure avec vous.\n\nNom : ${name}\nE-mail : ${email}\nFormat envisagé : ${format}\nBudget : ${budget}\n\nMon projet :\n${project}\n\nMerci,`,
    );
    window.location.href = `mailto:bonjour@ateliermarina.fr?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <button className="commission-button" type="button" onClick={() => setIsOpen(true)}>
        Raconter votre projet <span aria-hidden="true">↗</span>
      </button>
      {isOpen ? (
        <div className="drawer-shell">
          <button className="drawer-backdrop" type="button" aria-label="Fermer le formulaire de commande" onClick={() => setIsOpen(false)} />
          <aside className="purchase-drawer commission-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div className="drawer-topbar">
              <p>Commande sur mesure</p>
              <button className="drawer-close" type="button" onClick={() => setIsOpen(false)} aria-label="Fermer">×</button>
            </div>
            <div className="commission-drawer-content">
              <p className="eyebrow">Une pièce qui n’existe pas encore</p>
              <h2 id={titleId}>Commençons par une sensation.</h2>
              <p className="commission-intro">
                Une commande n’est pas la reproduction d’une toile existante. Marina compose une œuvre nouvelle à partir de votre espace, du format et de ce que vous souhaitez ressentir.
              </p>
              <form className="commission-form" onSubmit={prepareRequest}>
                <div className="form-pair">
                  <label>Votre nom<input name="name" type="text" autoComplete="name" required /></label>
                  <label>Votre e-mail<input name="email" type="email" autoComplete="email" required /></label>
                </div>
                <div className="form-pair">
                  <label>Format envisagé<select name="format" defaultValue="À définir ensemble"><option>À définir ensemble</option><option>Petit format — jusqu’à 60 cm</option><option>Format moyen — 60 à 100 cm</option><option>Grand format — plus de 100 cm</option></select></label>
                  <label>Budget indicatif<select name="budget" defaultValue="À définir ensemble"><option>À définir ensemble</option><option>1 500 à 2 500 €</option><option>2 500 à 4 000 €</option><option>Plus de 4 000 €</option></select></label>
                </div>
                <label>Parlez-nous du lieu, de l’envie ou du point de départ<textarea name="project" rows={5} placeholder="Une pièce, une lumière, une couleur, une histoire…" required /></label>
                <button className="checkout-button" type="submit">Préparer ma demande</button>
                <p className="checkout-note">Votre messagerie s’ouvrira avec votre brief déjà composé. L’envoi ne vous engage à rien.</p>
              </form>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
