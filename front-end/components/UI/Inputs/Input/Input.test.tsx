import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";
import type { ComponentProps } from "react";

function renderInput(props: Partial<ComponentProps<typeof Input>> = {}) {
  return render(<Input id="pseudo" label="Nom" {...props} />);
}

const handleChange = vi.fn();

/**
 * Tests sur l'input personnalisé
 */
describe("Input", () => {
  // Rendu de l'input dans le navigateur avec son texte indice si spécifié
  it("should render with hint if specified", () => {
    renderInput({ hint: "Votre nom" });
    const input = screen.getByRole("textbox", { name: "Nom" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAccessibleDescription("Votre nom");
  });

  // Rendu de l'input sans le paragraphe indice si le hint n'est pas spécifié
  it("should render without hint if not specified", () => {
    renderInput();
    const input = screen.getByRole("textbox", { name: "Nom" });
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAccessibleDescription();
  });

  // Si désactivé, l'input ne doit pas recevoir le focus ou de saisie et aucune fonction ne doit être appelée
  it("should be disabled if specified", async () => {
    renderInput({ disabled: true, onChange: handleChange });
    const user = userEvent.setup();
    const input = screen.getByRole("textbox", { name: "Nom" });
    await user.type(input, "Mon logement");
    expect(input).toBeDisabled();
    expect(input).toHaveValue("");
    expect(handleChange).not.toHaveBeenCalled();
  });

  // L'utilisateur peut écrire dans l'input qui peut appeler onChange
  it("should be able to call onChange function when user types", async () => {
    renderInput({ onChange: handleChange });
    const input = screen.getByRole("textbox", { name: "Nom" });
    const user = userEvent.setup();
    // Avant d'écrire, l'input est vide si on ne lui passe pas de valeur par défaut
    expect(input).toHaveValue("");
    // L'utilisateur saisit son texte
    await user.type(input, "Mon Logement");
    // onChange a été appelé et le texte de l'utilisateur est conservé
    expect(input).toHaveValue("Mon Logement");
    expect(handleChange).toHaveBeenCalledTimes(12); // "Mon Logement" = 12 caractères
  });

  // La valeur par défaut est affichée si renseignée
  it("should render with default value if specified", () => {
    renderInput({ defaultValue: "Logement" });
    const input = screen.getByRole("textbox", { name: "Nom" });
    expect(input).toHaveValue("Logement");
  });
});
