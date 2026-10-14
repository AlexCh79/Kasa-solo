import { cookies } from "next/headers";

/**
 * Ecriture d'un cookie
 * @param name - nom du cookie à stocker
 * @param value - valeur à stocker
 */
export async function setCookie(name: string, value: string) {
  (await cookies()).set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 60 * 60 * 24,
  });
}
