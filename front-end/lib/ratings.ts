import { fetchApi } from "./api";
import type { Rating, RatingCreate, RatingsSummary } from "@/types/Rating";

/**
 * Liste des notes d'une propriété
 * @param id - id du logement dont on veut afficher les notes
 * @returns la liste des notes
 */
export async function getRatings(id: string): Promise<Rating[]> {
  const response = await fetchApi(`/api/properties/${id}/ratings`);
  return response;
}

/**
 * Création d'une note par un utilisateur
 * @param id - id du logement à noter
 * @param data - Données du formulaire de la note à ajouter
 * @returns les notes du logement mis à jour
 */
export async function addRating(id: string, data: RatingCreate): Promise<RatingsSummary> {
  const response = await fetchApi(`/api/properties/${id}/ratings`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}
