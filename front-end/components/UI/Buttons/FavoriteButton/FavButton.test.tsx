import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FavButton from "./FavButton";
import styles from "./FavButton.module.scss";
import userEvent from "@testing-library/user-event";
import { FavoritesProvider } from "@/context/FavoritesContext";

/**
 * Factorisation du boutton à tester avec son Provider
 */
function renderFav() {
  return render(<FavButton propertyId="1" propertyTitle="Titre" />, { wrapper: FavoritesProvider });
}

/**
 * Tests unitaires sur le bouton d'ajout / suppression des favoris
 */
describe("FavButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  // Le bouton apparait dans le navigateur
  it("should render without crashing", () => {
    renderFav();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // Le bouton est pressé (inactif vers actif) au clic, son label change (titre) et le favori est stocké dans le localStorage
  it("should add property to favorites on click", async () => {
    const user = userEvent.setup();
    renderFav();
    const button = screen.getByRole("button", { name: "Ajouter le logement Titre aux favoris" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).not.toHaveClass(styles.active);

    await user.click(button);

    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAccessibleName("Retirer le logement Titre des favoris");
    expect(button).toHaveClass(styles.active);
    expect(JSON.parse(localStorage.getItem("kasa-favorites") ?? "[]")).toContain("1");
  });

  // Le bouton est pressé (actif vers inactif) au clic, son label change et le favoris est retiré du localStorage
  it("should remove property from favorites on click", async () => {
    const user = userEvent.setup();
    localStorage.setItem("kasa-favorites", JSON.stringify(["1"]));
    renderFav();
    const button = screen.getByRole("button", { name: "Retirer le logement Titre des favoris" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveClass(styles.active);
    await user.click(button);

    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAccessibleName("Ajouter le logement Titre aux favoris");
    expect(button).not.toHaveClass(styles.active);
    expect(JSON.parse(localStorage.getItem("kasa-favorites") ?? "[]")).not.toContain("1");
  });
});
