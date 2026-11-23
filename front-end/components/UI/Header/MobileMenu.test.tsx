import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import MobileMenu from "./MobileMenu";

function renderMenu(props: Partial<ComponentProps<typeof MobileMenu>> = {}) {
  return render(<MobileMenu isLoggedIn={false} {...props} />);
}

/**
 * Tests sur le menu mobile / tablette
 */
describe("MobileMenu", () => {
  // Rendu dans le navigateur et ouverture / fermeture du menu au clic
  it("should open and close the menu when clicking the toggle button", async () => {
    renderMenu();
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Ouvrir le menu" });

    // Par défaut, le menu est fermé
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    // L'utilisateur clique sur le bouton, il s'ouvre
    await user.click(button);
    expect(screen.getByRole("button", { name: "Fermer le menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Nouveau clic utilisateur sur le bouton du menu, le menu se referme
    await user.click(screen.getByRole("button", { name: "Fermer le menu" }));
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  // Si l'utilisateur clique sur un lien, le menu se referme
  it("should close menu when user clicks on a link", async () => {
    renderMenu();
    const user = userEvent.setup();
    // Par défaut, le menu est fermé, l'utilisateur l'ouvre
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    // L'utilisateur clique sur un lien dans le menu ouvert
    await user.click(screen.getByRole("link", { name: "Messagerie" }));
    // Le menu est fermé
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  // L'utilisateur est connecté, le menu affiche le lien "Se déconnecter"
  it("should display profile link and logout button when user is logged in", async () => {
    renderMenu({ isLoggedIn: true });
    const user = userEvent.setup();

    // L'utilisateur ouvre le menu
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    // Le bouton déconnexion et le lien vers le profil s'affichent
    expect(screen.getByRole("button", { name: "Déconnexion" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profil" })).toHaveAttribute("href", "/profile");
    // Le lien de connexion est absent
    expect(screen.queryByRole("link", { name: "Se connecter" })).not.toBeInTheDocument();
  });

  // L'utilisateur est déconnecté, le menu affiche le lien de connexion
  it("should display login link if user is not logged in", async () => {
    renderMenu();
    const user = userEvent.setup();
    // L'utilisateur ouvre le menu
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    // Le lien vers la page de connexion doit s'afficher
    expect(screen.getByRole("link", { name: "Se connecter" })).toHaveAttribute("href", "/login");
    // Le lien vers le profil et le bouton Déconnexion sont absents
    expect(screen.queryByRole("button", { name: "Déconnexion" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Profil" })).not.toBeInTheDocument();
  });
});
