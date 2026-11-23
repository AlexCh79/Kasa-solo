import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

function renderFooter() {
  return render(<Footer />);
}

/**
 * Tests sur l'affichage des éléments du footer
 */
describe("Footer", () => {
  // Le footer s'affiche avec le logo de Kasa et le copyright
  it("should display with logo and copyright text", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Kasa" })).toBeInTheDocument();
    expect(screen.getByText(/© 2026 Kasa. Tous droits réservés/)).toBeInTheDocument();
  });
});
