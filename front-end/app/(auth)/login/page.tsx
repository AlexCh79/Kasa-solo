import type { Metadata } from "next";
import LoginForm from "@/components/Templates/Login/LoginForm";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Connexion | Kasa",
};

/**
 * Page de connexion utilisateur
 * @param searchParams
 * si "updated=1", affiche le message de confirmation après la mise à jour du profil
 * si "reset=1", affiche le message de confirmation de modification du mot de passe
 */
export default async function Login({ searchParams }: PageProps<"/login">) {
  const { updated, reset } = await searchParams;
  const info =
    updated === "1"
      ? "Votre profil a bien été mis à jour. Reconnectez-vous pour continuer."
      : reset === "1"
        ? "Votre mot de passe a bien été modifié. Vous pouvez vous connecter."
        : null;
  return <LoginForm info={info} />;
}
