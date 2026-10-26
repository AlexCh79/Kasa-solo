import type { PropertyBase } from "@/types/Property";
import { toProperty, type ApiProperty } from "./properties";
import { fetchApi } from "./api";

/**
 * Définit un logement en favori
 * @param id - id du logement à ajouter en favoris
 */
export async function addFavorite(id: string) {
  await fetchApi(`/api/properties/${id}/favorite`, {
    method: "POST",
  });
}

/**
 * Retire un logement des favoris
 * @param id - id du logement à supprimer des favoris
 */
export async function removeFavorite(id: string) {
  await fetchApi(`/api/properties/${id}/favorite`, {
    method: "DELETE",
  });
}

/**
 * Récupère la liste des favoris de l'utilisateur depuis l'API
 * @param userId - id de l'utilisateur connecté
 * @returns la liste des favoris enregistrés de l'utilisateur connecté
 */
export async function getFavoritesApi(userId: number): Promise<PropertyBase[]> {
  const response: ApiProperty[] = await fetchApi(`/api/users/${userId}/favorites`);
  return response.map(toProperty);
}
