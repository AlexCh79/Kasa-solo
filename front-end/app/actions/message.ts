"use server";
import { sendMessage } from "@/lib/messages";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/users";
import { getText } from "@/utils/format";

export interface MessageState {
  error: string | null;
}

/**
 * Server Action gérant l'ajout d'un message
 * @param _prevState - Etat précédent
 * @param formData - Données envoyées par le formulaire
 */
export default async function messageAction(
  _prevState: MessageState,
  formData: FormData,
): Promise<MessageState> {
  const session = await getSession();
  if (!session) redirect("/login");

  // Récupération des données
  const conversationId = Number(formData.get("conversationId"));

  const content = getText(formData, "content");

  // Vérification du format l'id de la conversation
  if (!Number.isInteger(conversationId) || conversationId < 1) {
    return { error: "Erreur dans la récupération de la conversation." };
  }
  // Vérification que le message n'est pas vide
  if (!content) return { error: "Votre message est vide et ne peut pas être envoyé." };

  try {
    await sendMessage(conversationId, content);
  } catch {
    return { error: "Erreur dans l'envoi du message, veuillez-réessayer plus tard." };
  }

  redirect(`/messenger/${conversationId}`);
}
