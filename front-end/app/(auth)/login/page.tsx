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
 * @param searchParams - si "updated=1", affiche le message de confirmation après la mise à jour du profil
 */
export default async function Login({ searchParams }: PageProps<"/login">) {
  const { updated } = await searchParams;
  const info =
    updated === "1" ? "Votre profil a bien été mis à jour. Reconnectez-vous pour continuer." : null;
  return <LoginForm info={info} />;
}
