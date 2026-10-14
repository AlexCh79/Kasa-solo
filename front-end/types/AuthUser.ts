import { UserData } from "./User";

/**
 * Type de données de l'utilisateur authentifié
 * L'email n'est pas prévu dans l'utilisateur public mais est obligatoire pour se connecter
 */
export interface AuthUser extends UserData {
  email: string;
}

/**
 * Réponse de l'API avec le token utilisateur
 */
export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/**
 * Préparation du typage pour la réinitialisation de mot de passe
 * L'API le prévoit mais le développement n'est pas complet pour l'envoi du mail de réinitialisation
 */
export interface PasswordReset {
  ok: boolean;
  message: string;
  token?: string;
}
