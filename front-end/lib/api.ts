import { cookies } from "next/headers";

/**
 * Erreur de l'API avec son code de statut HTTP
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

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
  if (!(request?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

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

  // Renvoi avant lecture de la response pour ne pas renvoyer de body vide
  if (response.status === 204) {
    return;
  }

  // Message d'erreur par défaut selon le statut
  if (response.status === 400) {
    throw new ApiError("Des données sont manquantes pour continuer.", response.status);
  }
  if (response.status === 401) {
    throw new ApiError(
      "Vous devez être connecté pour accéder à cette fonctionnalité.",
      response.status,
    );
  }
  if (response.status === 403) {
    throw new ApiError(
      "Accès interdit ! Vous devez être administrateur pour continuer.",
      response.status,
    );
  }
  if (response.status === 404) {
    throw new ApiError("Aucune donnée trouvée.", response.status);
  }
  if (response.status === 409) {
    throw new ApiError("La donnée que vous souhaitez enregistrer existe déjà.", response.status);
  }

  // Message d'erreur si pas de réponse (ou statut de l'erreur non prévu)
  if (!response.ok) {
    throw new ApiError(
      "Oups, une erreur est survenue dans la liaison avec le serveur.",
      response.status,
    );
  }

  const body = await response.json();

  return body;
};
