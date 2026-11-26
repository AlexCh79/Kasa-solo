"use server";
import { getSession } from "@/lib/users";
import { getConversationWithHost } from "@/lib/messages";
import { redirect } from "next/navigation";

export interface ContactState {
  error: string | null;
}
/**
 * Server Action dédiée à la récupération ou à la création d'une nouvelle conversation avec un hôte
 * @param _prevState - Etat précédent
 * @param formData - Données envoyées par le formulaire
 */
export default async function contactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const hostId = Number(formData.get("hostId"));
  if (!hostId)
    return {
      error:
        "Veuillez sélectionner l'interlocuteur avec qui vous souhaitez converser pour continuer.",
    };
  // Vérification du type de l'id de l'interlocuteur
  if (!Number.isInteger(hostId) || hostId < 1)
    return {
      error: "Erreur dans la récupération de votre interlocuteur, veuillez réessayer plus tard.",
    };

  // Vérification que l'hôte n'est pas aussi l'utilisateur
  if (session.id === hostId) return { error: "Vous ne pouvez pas converser avec vous même." };

  let conversationId: number;
  try {
    conversationId = await getConversationWithHost(hostId);
  } catch {
    return {
      error:
        "Erreur dans la récupération ou la création de la conversation, veuillez réessayer plus tard.",
    };
  }

  redirect(`/messenger/${conversationId}`);
}
