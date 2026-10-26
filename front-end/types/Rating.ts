import type { PropertyHost } from "./Property";

/**
 * Typage de notes de logement
 */

export interface Rating {
  id: number;
  score: number;
  comment: string | null;
  createdAt: string;
  user: PropertyHost;
}

/**
 * Typage d'une note à sa création
 */
export interface RatingCreate {
  userId: number;
  score: number;
  comment?: string;
}

/**
 * Typage du résumé des notes
 */
export interface RatingsSummary {
  ratingAvg: number;
  ratingsCount: number;
  ratings: Rating[];
}
