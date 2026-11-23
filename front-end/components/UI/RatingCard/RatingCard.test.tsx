import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingCard from "./RatingCard";
import type { Rating } from "@/types/Rating";

const ratingMock: Rating = {
  id: 1,
  score: 4,
  comment: "Super séjour",
  createdAt: "2026-10-26T12:00:00Z",
  user: { id: 1, name: "Alice", picture: "" },
};

function renderRating(props: Partial<Rating> = {}) {
  return render(<RatingCard rating={{ ...ratingMock, ...props }} />);
}

/**
 * Tests pour l'affichage de la carte d'avis
 */
describe("RatingCard", () => {
  // Rendu dans le navigateur avec l'ensemble des données de l'avis
  it("should render without crashing", () => {
    renderRating();
    const rating = screen.getByRole("article");
    expect(rating).toBeInTheDocument();
    // La note et le commentaire s'affichent
    expect(screen.getByText("4/5")).toBeInTheDocument();
    expect(screen.getByText("Super séjour")).toBeInTheDocument();
    // Le nom de l'utilisateur et la date s'affiche dans le titre
    expect(
      screen.getByRole("heading", { level: 2, name: "Alice - 26 octobre 2026" }),
    ).toBeInTheDocument();
    // La date est convertie en format local
    expect(screen.getByText("26 octobre 2026")).toHaveAttribute("dateTime", "2026-10-26T12:00:00Z");
  });

  // Si pas de commentaire, le paragraphe affiche le texte par défaut
  it("should render default text when rating has no comment", () => {
    renderRating({ comment: null });
    expect(screen.getByText("Avis sans commentaire")).toBeInTheDocument();
  });
});
