import { fetchApi } from "./api";
import type { AuthResponse, PasswordReset } from "@/types/AuthUser";
import { UserPublic } from "@/types/User";
import { setCookie } from "@/utils/cookies";

/**
 * Connexion d'un utilisateur enregistré
 * @param email - email de l'utilisateur
 * @param password - mot de passe de l'utilisateur
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  await setCookie("token", response.token);
  return response;
}

/**
 * Enregistrement d'un nouvel utilisateur
 * @param email - email de l'utilisateur
 * @param password - mot de passe de l'utilisateur en clair (haché par le back-end)
 * @param name - nom de l'utilisateur
 * @param role - rôle de l'utilisateur
 * @param picture - facultatif, photo de profil de l'utilisateur
 * @returns nouvel utilisateur avec un token dans un cookie
 */
export async function register(
  email: string,
  password: string,
  { name, picture, role }: UserPublic,
): Promise<AuthResponse> {
  const response = await fetchApi("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, picture, password, role }),
  });
  await setCookie("token", response.token);
  return response;
}

/**
 * Demande un token pour réinitialiser un mot de passe
 * Encore en développement côté back-end
 * @param email - email du compte dont le mot de passe doit être réinitialisé
 * @returns lien de réinitialisation de mot de passe avec un token pour le suivi
 */
export async function requestPassword(email: string): Promise<PasswordReset> {
  const response = await fetchApi("/auth/request-reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return response;
}

/**
 * Réinitialisation du mot de passe
 * @param token - token de l'utilisateur
 * @param password - nouveau mot de passe de l'utilisateur
 * @returns true si appel réussi
 */
export async function resetPassword(token: string, password: string) {
  const response = await fetchApi("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });

  return response;
}
