"use client";
import Button from "@/components/UI/Buttons/Button";

interface ErrorPageProps {
  retry: () => void;
}

/**
 * Page d'erreur
 */
export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <div className="error">
      <title>Erreur | Kasa</title>
      <div className="error__titleContainer">
        <h1 className="error__title">Oups</h1>
        <p className="error__subtitle">Une erreur s&apos;est produite.</p>
      </div>
      <div className="error__actions">
        <Button onClick={retry} label="Réessayer" variant="primary" />
        <Button href="/" label="Accueil" variant="primary" />
      </div>
    </div>
  );
}
