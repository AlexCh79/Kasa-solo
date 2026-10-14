/**
 * Type de données User selon doc API
 */

/**
 * Rôles possibles pour chaque utilisateur
 */
export type UserRole = "owner" | "client" | "admin";

/**
 * Utilisateur pour création ou mise à jour
 */
export interface UserPublic {
  name: string;
  picture?: string | null;
  role: UserRole;
}

/**
 * Utilisateur public renvoyé par l'API avec son ID
 */
export interface UserData extends UserPublic {
  id: number;
}
