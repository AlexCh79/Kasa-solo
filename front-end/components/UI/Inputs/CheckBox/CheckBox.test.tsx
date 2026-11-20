import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckBox from "./CheckBox";
import type { ComponentProps } from "react";

function renderCheckbox(props: Partial<ComponentProps<typeof CheckBox>> = {}) {
  return render(<CheckBox id="cgu" label="Option" {...props} />);
}

/**
 * Tests pour les cases à cocher
 */
describe("CheckBox", () => {
  // Rendu dans le navigateur avec le label et décochée par défaut
  it("should render without crashing", () => {
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", { name: "Option" });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  // La case à cocher est décochée par défaut et est cochée au clic de l'utilisateur
  it("should be checked on click", async () => {
    const user = userEvent.setup();
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", { name: "Option" });
    // Par défaut, la case est décochée
    expect(checkbox).not.toBeChecked();
    // L'utilisateur clique, elle est cochée
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    // L'utilisateur clique à nouveau, elle est décochée
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // La case se coche si l'utilisateur clique sur le texte qui lui est lié (son label)
  it("should be checked after click on label", async () => {
    const user = userEvent.setup();
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", { name: "Option" });
    // Case décochée par défaut
    expect(checkbox).not.toBeChecked();
    // L'utilisateur clique sur le texte
    await user.click(screen.getByText("Option"));
    // La case se coche
    expect(checkbox).toBeChecked();
  });

  // La case prend bien les valeurs par défaut qui lui sont passées
  it("should render with props", () => {
    renderCheckbox({ name: "equipments", value: "microwave", defaultChecked: true });
    const checkbox = screen.getByRole("checkbox", { name: "Option" });
    expect(checkbox).toHaveAttribute("name", "equipments");
    expect(checkbox).toHaveAttribute("value", "microwave");
    expect(checkbox).toBeChecked();
  });

  // Cocher la case appelle l'attribut onChange si spécifié
  it("should call onChange on click if specified", async () => {
    const handleChange = vi.fn();

    renderCheckbox({ onChange: handleChange });
    const checkbox = screen.getByRole("checkbox", { name: "Option" });
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledOnce();
  });

  // La case ne peut pas être cochée ou décochée si on passe l'attribut "disabled" et aucune fonction n'est appelée
  it("should be disabled if specified", async () => {
    const handleChange = vi.fn();
    renderCheckbox({ disabled: true, onChange: handleChange });
    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox", { name: "Option" });
    expect(checkbox).toBeDisabled();
    // L'utilisateur clique
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
