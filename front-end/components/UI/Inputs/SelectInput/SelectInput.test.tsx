import SelectInput, { type SelectOption } from "./SelectInput";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";

const roles: SelectOption[] = [
  {
    value: "client",
    label: "Client",
  },
  {
    value: "owner",
    label: "Propriétaire",
  },
];

function renderSelect(props: Partial<ComponentProps<typeof SelectInput>> = {}) {
  return render(<SelectInput id="select" label="Liste" options={roles} {...props} />);
}

/**
 * Tests sur le champ personnalisé de liste déroulante
 */
describe("SelectInput", () => {
  // Rendu dans le navigateur avec les 2 options
  it("should render without crashing", () => {
    renderSelect();
    const select = screen.getByRole("combobox", { name: "Liste" });
    // Le select est présent
    expect(select).toBeInTheDocument();
    // Les options définies sont présentes
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByRole("option", { name: "Propriétaire" })).toHaveAttribute("value", "owner");
    expect(screen.getByRole("option", { name: "Client" })).toHaveAttribute("value", "client");
    // Par défaut, la première option est sélectionnée (client)
    expect(select).toHaveValue("client");
    expect(select).toHaveDisplayValue("Client");
  });

  // Une valeur par défaut passée au select sélectionne cette option directement
  it("should display the default value if specified", () => {
    renderSelect({ defaultValue: "owner" });
    const select = screen.getByRole("combobox", { name: "Liste" });
    expect(select).toHaveValue("owner");
    expect(select).toHaveDisplayValue("Propriétaire");
  });

  // L'option sélectionnée dans la liste change selon la sélection de l'utilisateur
  it("should update value when the user chooses a new option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    // Rendu du select sans valeur par défaut, s'affiche la première option (client)
    renderSelect({ onChange: handleChange });
    const select = screen.getByRole("combobox", { name: "Liste" });
    expect(select).toHaveValue("client");
    expect(select).toHaveDisplayValue("Client");
    // L'utilisateur choisit l'option 2 (propriétaire)
    await user.selectOptions(select, "owner");
    // La fonction onChange est appelée et la liste affiche la nouvelle option
    expect(handleChange).toHaveBeenCalledOnce();
    expect(select).toHaveValue("owner");
    expect(select).toHaveDisplayValue("Propriétaire");
  });
});
