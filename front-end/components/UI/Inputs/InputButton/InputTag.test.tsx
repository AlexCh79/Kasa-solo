import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps, SubmitEvent } from "react";
import { InputTag } from "./InputTag";

const handleAdd = vi.fn();

function renderInputTag(props: Partial<ComponentProps<typeof InputTag>> = {}) {
  return render(<InputTag id="tag" label="sofa" onAdd={handleAdd} {...props} />);
}

/**
 * Tests pour le champ personnalisé input des catégories (tags)
 */
describe("InputTag", () => {
  beforeEach(() => {
    // Nettoyage de la fonction appelée
    handleAdd.mockClear();
  });
  // Rendu dans le navigateur avec le label correspondant
  it("should render without crashing and with its label", () => {
    renderInputTag();
    const tag = screen.getByRole("textbox", { name: "sofa" });
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveValue("");
  });

  // Au clic sur le bouton, la fonction liée est appelée
  it("should call onAdd on click", async () => {
    renderInputTag();
    const input = screen.getByRole("textbox", { name: "sofa" });
    const button = screen.getByRole("button", { name: "Ajouter : sofa" });
    const user = userEvent.setup();
    // L'utilisateur renseigne sa catégorie et clique sur le bouton pour ajouter
    await user.type(input, "Sofa");
    await user.click(button);
    // La valeur saisie est envoyée vers handleAdd et l'input se vide
    expect(handleAdd).toHaveBeenCalledWith("Sofa");
    expect(input).toHaveValue("");
  });

  // Si le champ est rempli d'espaces, l'input n'envoie rien
  it("should not call onAdd if user types only spaces", async () => {
    renderInputTag();
    const input = screen.getByRole("textbox", { name: "sofa" });
    const button = screen.getByRole("button", { name: "Ajouter : sofa" });
    const user = userEvent.setup();
    // L'utilisateur renseigne uniquement des espaces
    await user.type(input, "           ");
    await user.click(button);
    expect(handleAdd).not.toHaveBeenCalled();
  });

  // Si le champ est vide, l'input n'envoie rien
  it("should not call handleAdd if is empty", async () => {
    renderInputTag();
    const user = userEvent.setup();
    const input = screen.getByRole("textbox", { name: "sofa" });
    const button = screen.getByRole("button", { name: "Ajouter : sofa" });
    expect(input).toHaveValue("");
    await user.click(button);
    expect(handleAdd).not.toHaveBeenCalled();
  });

  // Utiliser la touche Entrée envoie la valeur de l'input (même effet que le clic sur le bouton)
  it("should call onAdd if user presses Enter", async () => {
    renderInputTag();
    const user = userEvent.setup();
    const input = screen.getByRole("textbox", { name: "sofa" });
    await user.type(input, "    Mon Logement{Enter}");
    expect(handleAdd).toHaveBeenCalledWith("Mon Logement");
    expect(input).toHaveValue("");
  });

  // Appuyer sur la touche Entrée envoie la valeur de l'input mais pas les données du formulaire parent
  it("should call onAdd if user presses Enter but not handleSubmit", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <InputTag id="tag" label="sofa" onAdd={handleAdd} />
      </form>,
    );
    const input = screen.getByRole("textbox", { name: "sofa" });
    // L'utilisateur saisit une catégorie et appuie sur Entrée
    await user.type(input, "Catégorie{Enter}");
    expect(handleAdd).toHaveBeenCalledWith("Catégorie");
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
