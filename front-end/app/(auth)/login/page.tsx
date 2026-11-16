import type { Metadata } from "next";
import LoginForm from "@/components/Templates/Login/LoginForm";

export const metadata: Metadata = {
  title: "Connexion | Kasa",
};

export default async function Login({ searchParams }: PageProps<"/login">) {
  const { updated } = await searchParams;
  const info =
    updated === "1" ? "Votre profil a bien été mis à jour. Reconnectez-vous pour continuer." : null;
  return <LoginForm info={info} />;
}
