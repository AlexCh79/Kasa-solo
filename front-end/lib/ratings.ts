import { fetchApi } from "./api";
import { Rating, RatingCreate, RatingsSummary } from "@/types/Rating";
import type { PropertyHost } from "@/types/Property";

/**
 * Typage de notes de logement selon l'API
 */

interface RatingAPI {
  id: number;
  score: number;
  comment: string | null;
  created_at: string;
  user: PropertyHost;
}

/**
 * Typage du résumé des notes version API
 */
interface RatingsSummaryAPI {
  rating_avg: number;
  ratings_count: number;
  ratings: RatingAPI[];
}

/**
 * Type d'une note à sa création version API
 */
interface RatingCreateAPI {
  user_id: number;
  score: number;
  comment?: string;
}

/**
 * Liste des notes d'une propriété
 * @param id - id du logement dont on veut afficher les notes
 * @returns la liste des notes
 */
export async function getRatings(id: string): Promise<Rating[]> {
  const response: RatingAPI[] = await fetchApi(`/api/properties/${id}/ratings`);
  return response.map(toRating);
}

/**
 * Création d'une note par un utilisateur
 * @param id - id du logement à noter
 * @param data - Données du formulaire de la note à ajouter
 * @returns les notes du logement mis à jour
 */
export async function addRating(id: string, data: RatingCreate): Promise<RatingsSummary> {
  const response: RatingsSummaryAPI = await fetchApi(`/api/properties/${id}/ratings`, {
    method: "POST",
    body: JSON.stringify(toRatingCreateAPI(data)),
  });

  return toSummaryRating(response);
}

/**
 * Conversion des données API (snake_case) en version camelCase
 * Précision du fuseau horaire du created_at
 */
function toRating({ created_at, ...rest }: RatingAPI): Rating {
  return {
    ...rest,
    createdAt: created_at.replace(" ", "T") + "Z",
  };
}

/**
 * Conversion des données de résumé d'une note en version API (snake_case) vers du camelCase
 */
function toSummaryRating({
  rating_avg,
  ratings_count,
  ratings,
}: RatingsSummaryAPI): RatingsSummary {
  return {
    ratings: ratings.map(toRating),
    ratingAvg: rating_avg,
    ratingsCount: ratings_count,
  };
}

/**
 * Conversion des données de création d'une note en camelCase vers le snake_case (version API)
 */
function toRatingCreateAPI({ userId, ...rest }: RatingCreate): RatingCreateAPI {
  return {
    ...rest,
    user_id: userId,
  };
}
