import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoritesList from "./FavoritesList";
import { FavoritesProvider } from "@/context/FavoritesContext";
import type { PropertyBase } from "@/types/Property";

// clé utilisée par utils/favorites pour stocker les favoris dans le localStorage
const STORAGE_KEY = "kasa-favorites";

const baseProperty: PropertyBase = {
  id: "1",
  slug: "logement",
  title: "Logement",
  description: null,
  cover: null,
  location: "79 - Deux-Sèvres",
  pricePerNight: 80,
  ratingAvg: 4,
  ratingCount: 3,
  host: { id: 1, name: "Alice", picture: "" },
};

const mockProperties: PropertyBase[] = [
  {
    ...baseProperty,
    id: "1",
    title: "Logement 1",
  },
  {
    ...baseProperty,
    id: "2",
    title: "Logement 2",
  },
  {
    ...baseProperty,
    id: "3",
    title: "Logement 3",
  },
];

function renderList(favorites: string[] = [], list: PropertyBase[] = mockProperties) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return render(
    <FavoritesProvider>
      <FavoritesList properties={list} />
    </FavoritesProvider>,
  );
}

/**
 * Tests de l'affichage de la liste des favoris
 */
describe("FavoritesList", () => {
  // Nettoyage du stockage local avant chaque test
  beforeEach(() => localStorage.clear());

  // Rendu de la liste dans le navigateur - liste non vide
  it("should display only favorite properties", () => {
    renderList(["1", "3"]);
    // Le titre de la page s'affiche
    expect(screen.getByRole("heading", { level: 1, name: "Vos favoris" })).toBeInTheDocument();
    // Les cartes des 2 favoris préchargés s'affichent
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  // Rendu de la liste dans le navigateur - vide
  it("should display empty list if there are no favorites", () => {
    renderList();
    // Le titre de la page s'affiche toujours
    expect(screen.getByRole("heading", { level: 1, name: "Vos favoris" })).toBeInTheDocument();
    // Le corps de la page précise qu'aucun favori n'est enregistré
    expect(screen.getByText(/aucun favori/)).toBeInTheDocument();
    // Le lien vers la page des logements est présent
    expect(screen.getByRole("link", { name: "Voir les logements" })).toHaveAttribute(
      "href",
      "/properties",
    );
    // Aucune carte ne s'affiche
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  // Un favori dont l'id ne correspond à aucun logement n'affiche rien
  it("should be empty if favorite's id doesn't exist", () => {
    renderList(["99"]);
    expect(screen.getByText(/aucun favori/)).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  // Retirer le logement des favoris fait disparaître sa carte
  it("should disappear if user removes property from favorites", async () => {
    const user = userEvent.setup();
    renderList(["1", "2", "3"]);
    // On a passé 3 favoris, 3 cartes s'affichent
    expect(screen.getAllByRole("article")).toHaveLength(3);
    // La carte du logement 2 est présente dans la page
    expect(screen.getByRole("heading", { level: 2, name: "Logement 2" })).toBeInTheDocument();
    // L'utilisateur retire le logement 2 de ses favoris
    await user.click(
      screen.getByRole("button", { name: "Retirer le logement Logement 2 des favoris" }),
    );
    // Il ne reste que 2 cartes affichées
    expect(screen.getAllByRole("article")).toHaveLength(2);
    // La carte du logement n'apparait plus
    expect(screen.queryByRole("heading", { level: 2, name: "Logement 2" })).not.toBeInTheDocument();
  });

  // Retirer le dernier logement des favoris revient à aucun favori
  it("should be empty if the last favorite is removed", async () => {
    const user = userEvent.setup();
    renderList(["1"]);
    // La carte du favori apparait
    expect(screen.getByRole("heading", { level: 2, name: "Logement 1" })).toBeInTheDocument();
    // L'utilisateur retire le seul favori de la liste
    await user.click(
      screen.getByRole("button", { name: "Retirer le logement Logement 1 des favoris" }),
    );
    // Plus de carte dans la page
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
    // Le texte précisant qu'il n'y a aucun favori s'affiche
    expect(screen.getByText(/aucun favori/)).toBeInTheDocument();
    // Le lien pointant vers la liste des logements est présent
    expect(screen.getByRole("link", { name: "Voir les logements" })).toBeInTheDocument();
  });
});
