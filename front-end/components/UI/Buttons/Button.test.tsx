import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import styles from "./Button.module.scss";
import userEvent from "@testing-library/user-event";

/**
 * Tests unitaires pour le composant Button
 */
describe("Button", () => {
  // Le bouton apparait dans le navigateur avec son label
  it("should render without crashing", () => {
    render(<Button label="Click me" variant="primary" />);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  // Le style du bouton est bien appliqué selon le variant qu'on lui passe
  it("should apply the primary variant if variant='primary'", () => {
    render(<Button label="Mon bouton" variant="primary" />);
    const button = screen.getByRole("button", { name: "Mon bouton" });
    expect(button).toHaveClass(styles.primary);
    expect(button).not.toHaveClass(styles.secondary);
  });

  // Le style du bouton est le variant secondaire si précisé
  it("should apply the secondary variant if variant='secondary'", () => {
    render(<Button variant="secondary" label="Mon Bouton" />);
    const button = screen.getByRole("button", { name: "Mon Bouton" });
    expect(button).toHaveClass(styles.secondary);
    expect(button).not.toHaveClass(styles.primary);
  });

  // Le bouton doit devenir un lien si on lui passe un "href"
  it("should be a link when 'href' is specified", () => {
    render(<Button href="/" variant="primary" label="lien" />);
    const link = screen.getByRole("link", { name: "lien" });
    expect(link).toHaveAttribute("href", "/");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Le bouton est désactivé si précisé
  it("should be disabled if specified", () => {
    render(<Button disabled variant="primary" label="Mon bouton" />);
    const button = screen.getByRole("button", { name: "Mon bouton" });
    expect(button).toBeDisabled();
  });

  // Le bouton appelle la fonction onClick au clic
  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick} label="Mon Bouton" variant="primary" />);
    await user.click(screen.getByRole("button", { name: "Mon Bouton" }));
    expect(handleClick).toHaveBeenCalled();
  });

  // Le bouton n'appelle rien s'il est désactivé
  it("should not call onClick if disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={handleClick} label="Mon Bouton" variant="primary" />);
    await user.click(screen.getByRole("button", { name: "Mon Bouton" }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
