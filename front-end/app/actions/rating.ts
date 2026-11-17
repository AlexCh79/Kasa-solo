"use server";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/users";
import { addRating } from "@/lib/ratings";

export interface RatingState {
  error: string | null;
}

/**
 * Server Action pour ajouter un avis
 * @param id - id du logement sur lequel l'utilisateur dépose son avis
 * @param _prevState - état précédent
 * @param formData - données du formulaire d'ajout d'un avis
 */
export default async function ratingAction(
  id: string,
  _prevState: RatingState,
  formData: FormData,
): Promise<RatingState> {
  const user = await getSession();
  if (!user) redirect("/login");

  const trimmed = formData.get("comment")?.toString().trim();
  const comment = trimmed ? trimmed : undefined;
  const note = Number(formData.get("note"));

  // Vérification des champs
  if (!Number.isInteger(note) || note < 1 || note > 5) {
    return { error: "La note doit être comprise entre 1 et 5." };
  }

  // Envoi de l'avis
  try {
    await addRating(id, { userId: user.id, score: note, comment: comment });
  } catch {
    return {
      error: "Impossible d'enregistrer votre avis, veuillez réessayer plus tard.",
    };
  }

  redirect(`/properties/${id}/ratings?added=1`);
}
