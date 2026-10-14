import { cookies } from "next/headers";

/**
 * Liaison avec l'API
 * @param path - chemin de la requête
 * @param request - instructions facultatives de la requête
 * @returns réponse de l'API
 * @throws message d'erreur en français
 */
export const fetchApi = async (path: string, request?: RequestInit) => {
  const API_URL = process.env.API_URL;

  const headers = new Headers(request?.headers);
  headers.set("Content-Type", "application/json");

  //Récupération du token
  const token = (await cookies()).get("token")?.value;

  // Stockage du token dans le header s'il existe
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...request,
    headers,
  });

  // Message d'erreur par défaut selon le statut
  if (response.status === 400) {
    throw new Error("Des données sont manquantes pour continuer.");
  }
  if (response.status === 401) {
    throw new Error("Vous devez être connecté pour accéder à cette fonctionnalité.");
  }
  if (response.status === 403) {
    throw new Error("Accès interdit ! Vous devez être administrateur pour continuer.");
  }
  if (response.status === 404) {
    throw new Error("Aucune donnée trouvée.");
  }
  if (response.status === 409) {
    throw new Error("La donnée que vous souhaitez enregistrer existe déjà.");
  }

  // Message d'erreur si pas de réponse (ou statut de l'erreur non prévu)
  if (!response.ok) {
    throw new Error("Oups, une erreur est survenue dans la liaison avec le serveur.");
  }

  const body = await response.json();

  return body;
};
