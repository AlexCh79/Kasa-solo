import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";
import MessengerPage from "@/components/Templates/MessengerPage/MessengerPage";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Messagerie",
};

/**
 * Messagerie utilisateur
 * Redirection vers la page de connexion si l'utilisateur n'est pas connecté
 */
export default async function Messenger() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <MessengerPage />;
}
