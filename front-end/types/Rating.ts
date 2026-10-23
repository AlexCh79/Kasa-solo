import type { PropertyHost } from "./Property";

/**
 * Typage de notes de logement
 */

export interface Rating {
  id: number;
  score: number;
  comment: string | null;
  created_at: string;
  user: PropertyHost;
}

/**
 * Typage d'une note à sa création
 */
export interface RatingCreate {
  user_id: number;
  score: number;
  comment?: string;
}

/**
 * Typage du résumé des notes
 */
export interface RatingsSummary {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
}
