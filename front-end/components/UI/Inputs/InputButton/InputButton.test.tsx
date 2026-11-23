import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import InputButton from "./InputButton";

const handleChange = vi.fn();

function renderInput(props: Partial<ComponentProps<typeof InputButton>> = {}) {
  return render(<InputButton id="image" label="Photo" {...props} />);
}

/**
 * Tests du champ input personnalisé pour l'ajout et le retrait de photos
 */
describe("InputButton", () => {
  beforeEach(() => {
    // Nettoyage de la fonction appelée
    handleChange.mockClear();
    // Mock pour l'ajout des URL des photos
    URL.createObjectURL = vi.fn(() => "blob:apercu");
    // Mock pour supprimer un URL de photo
    URL.revokeObjectURL = vi.fn();
  });

  // Rendu correctement dans le navigateur, le label servant de titre
  it("should render without crashing and with its label", () => {
    renderInput();
    const input = screen.getByLabelText("Photo");
    expect(input).toBeInTheDocument();
  });

  // Pas d'aperçu "preview" des images et pas de bouton de retrait si pas de fichier chargé
  it("should display only the add button before any upload", () => {
    renderInput();
    const img = screen.queryByRole("img");
    const button = screen.queryByRole("button", { name: /Retirer le fichier/ });
    const add = screen.getByRole("button", { name: "Choisir: Photo" });
    expect(img).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
    expect(add).toBeInTheDocument();
  });

  // Le choix du fichier appelle onChange, charge l'aperçu et affiche le bouton de retrait
  it("should call onChange and display file name, preview and remove button after upload", async () => {
    const user = userEvent.setup();
    const file = new File(["contenu"], "photo.jpg", { type: "image/jpeg" });
    renderInput({ onChange: handleChange });

    // L'utilisateur charge un fichier
    await user.upload(screen.getByLabelText("Photo"), file);

    // Le nom du fichier apparait
    expect(screen.getByText("photo.jpg")).toBeInTheDocument();
    // Le bouton de retrait apparait
    expect(
      screen.getByRole("button", { name: "Retirer le fichier photo.jpg" }),
    ).toBeInTheDocument();
    // Le bouton d'ajout n'apparait plus
    expect(screen.queryByRole("button", { name: "Choisir: Photo" })).not.toBeInTheDocument();
    // L'aperçu de l'image s'affiche
    expect(screen.getByRole("img", { name: "Aperçu : Photo" })).toBeInTheDocument();
    // L'URL de l'image s'est créée
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    // La fonction onChange a été appelée
    expect(handleChange).toHaveBeenCalledOnce();
  });

  // Cliquer sur le bouton de retrait remet à zéro
  it("should reset when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const file = new File(["contenu"], "photo.jpg", { type: "image/jpeg" });
    renderInput({ onChange: handleChange });
    // Le fichier est uploadé par l'utilisateur
    await user.upload(screen.getByLabelText("Photo"), file);
    expect(screen.getByText("photo.jpg")).toBeInTheDocument();
    // L'utilisateur clique sur le bouton de retrait
    await user.click(screen.getByRole("button", { name: "Retirer le fichier photo.jpg" }));
    // Le fichier et l'aperçu sont remis à zéro
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Retirer le fichier photo.jpg" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Choisir: Photo" })).toBeInTheDocument();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:apercu");
  });

  // Cliquer sur le bouton d'ajout ouvre le sélecteur de fichiers
  it("should open file selector on click on add button", async () => {
    renderInput();
    const input = screen.getByLabelText("Photo");
    const clickSpy = vi.spyOn(input, "click");
    const user = userEvent.setup();
    // L'utilisateur clique sur le bouton d'ajout
    await user.click(screen.getByRole("button", { name: "Choisir: Photo" }));
    // Le sélecteur s'ouvre
    expect(clickSpy).toHaveBeenCalledOnce();
  });
});
