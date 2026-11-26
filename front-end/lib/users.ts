import { getCookie } from "@/utils/cookies";
import { fetchApi } from "./api";
import type { UserData, UserPublic } from "@/types/User";
import { toAbsoluteUrl } from "@/utils/urls";
import { decodeToken } from "@/utils/token";

/**
 * Appelle la liste des utilisateurs
 * @returns liste des utilisateurs
 */
export async function getUsers(): Promise<UserData[]> {
  const response = await fetchApi("/api/users");

  return response;
}

/**
 * Création d'un utilisateur public
 * @param name - nom de l'utilisateur
 * @param picture - lien de l'image de profil (facultative)
 * @param role - rôle de l'utilisateur
 * @returns utilisateur public sans email enregistré
 */
export async function createUser({ name, picture, role }: UserPublic): Promise<UserData> {
  const response = await fetchApi("/api/users", {
    method: "POST",
    body: JSON.stringify({ name, picture, role }),
  });

  return response;
}

/**
 * Récupération du profil d'un utilisateur par son id
 * @param id - id de l'utilisateur à rechercher
 * @returns utilisateur recherché
 */
export async function getUserById(id: number): Promise<UserData> {
  const user: UserData = await fetchApi(`/api/users/${id}`);
  return {
    ...user,
    picture: user.picture ? toAbsoluteUrl(user.picture) : null,
  };
}

/**
 * Mise à jour d'un utilisateur public
 * @param id - id de l'utilisateur à modifier
 * @returns utilisateur modifié
 */
export async function updateUser({ id, name, picture, role }: UserData): Promise<UserData> {
  const response = await fetchApi(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, picture, role }),
  });
  return response;
}

/**
 * Lit l'utilisateur connecté depuis le token
 * @returns les données du token - non vérifié, ou null si pas connecté
 */
export async function getSession() {
  const token = await getCookie("token");
  return token ? decodeToken(token) : null;
}

/**
 * Lit l'id utilisateur depuis le token pour savoir s'il est connecté et s'il est propriétaire
 * @returns l'utilisateur connecté, null si pas de token enregistré en cookie
 */
export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    return await getUserById(session.id);
  } catch {
    return null;
  }
}
