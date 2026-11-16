import type { UserRole } from "@/types/User";

export interface SessionUser {
  id: number;
  role: UserRole;
  name: string | null;
  email: string | null;
}

/**
 * Décode le token JWT
 * @param token - token JWT de l'API
 * @returns les données de l'utilisateur connecté, ou null si token illisible
 */
export function decodeToken(token: string): SessionUser | null {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
  } catch {
    return null;
  }
}
