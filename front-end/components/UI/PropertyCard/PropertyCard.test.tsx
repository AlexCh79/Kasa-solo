import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PropertyCard from "./PropertyCard";
import type { PropertyBase } from "@/types/Property";
import { FavoritesProvider } from "@/context/FavoritesContext";

const propertyMock: PropertyBase = {
  id: "1",
  slug: "1",
  title: "Logement",
  cover: "http://images/photo.jpg",
  location: "79 - Deux-Sèvres",
  pricePerNight: 80,
  description: "Description du logement",
  ratingAvg: 4,
  ratingCount: 3,
  host: { id: 1, name: "Alice", picture: "" },
};

function renderCard(props: Partial<PropertyBase> = {}) {
  return render(
    <FavoritesProvider>
      <PropertyCard property={{ ...propertyMock, ...props }} />
    </FavoritesProvider>,
  );
}

/**
 * Tests d'affichage de la carte de logement
 */
describe("PropertyCard", () => {
  // Rendu dans le navigateur avec l'affichage des données de la propriété
  it("should render without crashing", () => {
    renderCard();
    const card = screen.getByRole("article");
    expect(card).toBeInTheDocument();
    // Le titre s'affiche
    expect(screen.getByRole("heading", { level: 2, name: "Logement" })).toBeInTheDocument();
    // La localisation s'affiche
    expect(screen.getByText("79 - Deux-Sèvres")).toBeInTheDocument();
    // Le prix s'affiche
    expect(screen.getByText("80€")).toBeInTheDocument();
    // L'unité de prix s'affiche
    expect(screen.getByText("par nuit")).toBeInTheDocument();
    // Le bouton favoris est présent
    expect(
      screen.getByRole("button", { name: "Ajouter le logement Logement aux favoris" }),
    ).toBeInTheDocument();
  });

  // Si la localisation est vide, rien ne s'affiche
  it("should render without location if it's null", () => {
    renderCard({ location: null });
    expect(screen.queryByText("79 - Deux-Sèvres")).not.toBeInTheDocument();
  });

  // Le lien de la carte mène à la page individuelle du logement
  it("should link to the property page", () => {
    renderCard();
    expect(screen.getByRole("link", { name: /Logement/ })).toHaveAttribute("href", "/properties/1");
  });
});
