import type { Metadata } from "next";
import { getSession } from "@/lib/users";
import { redirect } from "next/navigation";
import MessengerPage from "@/components/Templates/MessengerPage/MessengerPage";
import { getConversations } from "@/lib/messages";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Messagerie | Kasa",
};

/**
 * Messagerie utilisateur
 * Redirection vers la page de connexion si l'utilisateur n'est pas connecté
 */
export default async function Messenger() {
  const userId = await getSession();
  if (!userId) redirect("/login");

  const conversations = await getConversations();
  return <MessengerPage conversations={conversations} />;
}
