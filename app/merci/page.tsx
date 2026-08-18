export const metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="thank-you">
      <a className="wordmark" href="/">
        MARINA
      </a>
      <div>
        <p className="eyebrow">Acquisition confirmée</p>
        <h1>Merci de faire entrer cette œuvre dans votre histoire.</h1>
        <p>
          Vous allez recevoir la confirmation et le certificat d’acquisition par
          e-mail. Marina vous écrira personnellement pour organiser la livraison.
        </p>
        <a className="text-button" href="/">
          ← Retourner à la collection
        </a>
      </div>
    </main>
  );
}
