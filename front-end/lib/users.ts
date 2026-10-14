import { fetchApi } from "./api";
import type { UserData, UserPublic } from "@/types/User";

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
  const response = await fetchApi(`/api/users/${id}`);
  return response;
}

/**
 * Mise à jour d'un utilisateur public
 * @param id - id de l'utilisateur à modifier
 * @returns utilisateur modifié
 */
export async function updateUser({ id, name, picture, role }: UserData): Promise<UserPublic> {
  const response = await fetchApi(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, picture, role }),
  });
  return response;
}
