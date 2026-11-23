import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import TextArea from "./TextArea";

function renderTextarea(props: Partial<ComponentProps<typeof TextArea>> = {}) {
  return render(<TextArea label="Commentaire" id="comment" {...props} />);
}

const handleChange = vi.fn();
const handleSubmit = vi.fn();

/**
 * Tests sur le textarea personnalisé
 */
describe("TextArea", () => {
  // Rendu dans le navigateur avec son label
  it("should render without crashing", () => {
    renderTextarea();
    const textarea = screen.getByRole("textbox", { name: "Commentaire" });
    expect(textarea).toBeInTheDocument();
  });

  // L'utilisateur peut écrire dans le champ, la fonction onChange est appelée
  it("should call onChange when the user types a value", async () => {
    const user = userEvent.setup();
    renderTextarea({ onChange: handleChange });
    const textarea = screen.getByRole("textbox", { name: "Commentaire" });
    // Le champ est vide si pas de valeur par défaut
    expect(textarea).toHaveValue("");
    // L'utilisateur écrit dans le champ
    await user.type(textarea, "Mon commentaire");
    // Le texte saisi est affiché dans le champ
    expect(textarea).toHaveValue("Mon commentaire");
    // onChange est appelé 15 fois pour 15 caractères tapés
    expect(handleChange).toHaveBeenCalledTimes(15);
  });

  // Si une valeur par défaut est renseignée, elle est affichée directement dans le champ
  it("should render with default value if specified", () => {
    renderTextarea({ defaultValue: "Mon Commentaire" });
    const textarea = screen.getByRole("textbox", { name: "Commentaire" });
    expect(textarea).toHaveValue("Mon Commentaire");
  });

  // Si désactivé, le textarea ne reçoit ni focus ni saisie et la fonction onChange n'est pas appelée
  it("should be disabled if specified", async () => {
    const user = userEvent.setup();
    renderTextarea({ disabled: true, onChange: handleChange });
    const textarea = screen.getByRole("textbox", { name: "Commentaire" });
    await user.type(textarea, "Commentaire");
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveValue("");
    expect(handleChange).not.toHaveBeenCalled();
  });

  // La touche Entrée renvoie l'utilisateur à la ligne sans appeler onSubmit du formulaire parent
  it("should go to next line on Enter press and not call onSubmit from parent's form", async () => {
    const user = userEvent.setup();
    render(
      <form onSubmit={handleSubmit}>
        <TextArea id="comment" label="Commentaire" onChange={handleChange} />
      </form>,
    );
    const textarea = screen.getByRole("textbox", { name: "Commentaire" });
    await user.type(textarea, "Première ligne{Enter}Deuxième ligne");
    expect(textarea).toHaveValue("Première ligne\nDeuxième ligne");
    expect(handleChange).toHaveBeenCalled();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
