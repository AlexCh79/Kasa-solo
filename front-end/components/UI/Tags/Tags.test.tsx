import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tag from "./Tags";

const handleClick = vi.fn();

function renderTag() {
  return render(<Tag label="catégorie" />);
}

function renderEditTag() {
  return render(<Tag label="catégorie" edit onClick={handleClick} />);
}

/**
 * Tests sur les tags (catégories)
 */
describe("Tag", () => {
  // Rendu dans le navigateur avec son label - non éditable
  it("should render without crashing and with label", () => {
    renderTag();
    const tag = screen.getByText("catégorie");
    expect(tag).toBeInTheDocument();
    // non éditable donc pas de bouton pour retirer le tag
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Rendu dans le navigateur avec le label - éditable
  it("should render without crashing and with label, editable", async () => {
    renderEditTag();
    const tag = screen.getByText("catégorie");
    const button = screen.getByRole("button", { name: "Supprimer le tag catégorie" });
    // Editable, le bouton de retrait s'affiche
    expect(tag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    // L'utilisateur clique sur le bouton de retrait, onClick est appelé 1 fois
    const user = userEvent.setup();
    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
