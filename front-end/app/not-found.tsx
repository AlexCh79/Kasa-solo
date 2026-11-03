import Button from "@/components/UI/Buttons/Button";
import type { Metadata } from "next";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Page introuvable | Kasa",
};

/**
 * Page d'erreur 404
 */
export default function NotFound() {
  return (
    <div className="error">
      <div className="error__titleContainer">
        <h1 className="error__title">404</h1>
        <p className="error__subtitle">
          Il semble que la page que vous cherchez ait pris des vacances... ou n&apos;ait jamais
          existé.
        </p>
      </div>
      <div className="error__actions">
        <Button href="/" label="Accueil" variant="primary" />
      </div>
    </div>
  );
}
