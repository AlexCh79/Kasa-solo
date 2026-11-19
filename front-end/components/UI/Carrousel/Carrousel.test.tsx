import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Carrousel from "./Carrousel";
import userEvent from "@testing-library/user-event";

/**
 * Jeux de photos pour tester avec une ou plusieurs photos
 */
const fivePictures = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];
const threePictures = ["/1.jpg", "/2.jpg", "/3.jpg"];
const onePicture = ["/1.jpg"];

/**
 * Tests unitaires pour le module du carrousel d'images
 */
describe("Carrousel", () => {
  // Le Carrousel se compile correctement dans le navigateur et le texte alternatif correspondant
  // 1 seule photo, affiche seulement la photo principale, sans vignette
  it("should render without crashing", () => {
    render(<Carrousel title="Titre" images={onePicture} />);
    const carrousel = screen.getByAltText("Titre, photo 1 sur 1");
    expect(carrousel).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  // 3 photos : Après la dernière photo, on revient à la première
  it("should loop back to the first picture after the last one - 3 pictures", async () => {
    const user = userEvent.setup();
    render(<Carrousel title="Titre" images={threePictures} />);

    // 3 photos, on arrive à la dernière photo après 2 clics
    // 1 photo principale + 2 vignettes
    for (let i = 0; i < threePictures.length - 1; i++) {
      await user.click(screen.getAllByRole("button")[0]);
    }
    expect(screen.getByRole("img", { name: "Titre, photo 3 sur 3" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")[0]).toHaveAccessibleName("Afficher la photo 1 sur 3");

    // 1 clic de plus, on revient à la 1ère photo
    await user.click(screen.getAllByRole("button")[0]);
    expect(screen.getByRole("img", { name: "Titre, photo 1 sur 3" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  // 5 photos : Après la dernière photo, on revient à la première
  // 1 photo principale + 4 vignettes
  it("should loop back to the first picture after the last one - 5 pictures", async () => {
    const user = userEvent.setup();
    render(<Carrousel title="Titre" images={fivePictures} />);
    expect(screen.getByText("Photo 1 sur 5")).toBeInTheDocument();

    // 5 photos, on arrive à la dernière photo après 4 clics
    for (let i = 0; i < fivePictures.length - 1; i++) {
      await user.click(screen.getAllByRole("button")[0]);
    }
    expect(screen.getByRole("img", { name: "Titre, photo 5 sur 5" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")[0]).toHaveAccessibleName("Afficher la photo 1 sur 5");

    // 1 clic de plus, on revient à la 1ère photo
    await user.click(screen.getAllByRole("button")[0]);
    expect(screen.getByRole("img", { name: "Titre, photo 1 sur 5" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  // Aucune photo - pas d'image et texte alternatif correspondant, photo de couverture par défaut
  it("should be empty if there is no picture", () => {
    render(<Carrousel title="Titre" images={[]} />);
    expect(screen.getByAltText("Aucune photo du logement n'est disponible")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  // Clic sur la 3e vignette pour afficher la photo 4
  it("should display the 4th picture on click on 3nd thumbnail", async () => {
    render(<Carrousel title="Titre" images={fivePictures} />);
    const user = userEvent.setup();
    await user.click(screen.getAllByRole("button")[2]);
    expect(screen.getByRole("img")).toHaveAccessibleName("Titre, photo 4 sur 5");
  });
});
