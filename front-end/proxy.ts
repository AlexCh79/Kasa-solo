import { NextResponse, type NextRequest } from "next/server";
import { decodeToken } from "./utils/token";

/**
 * Redirige les visiteurs du site vers la page voulue ou la page d'inscription selon leur statut et rôle
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const session = token ? decodeToken(token) : null;
  const { pathname } = request.nextUrl;
  const isAddProperty = pathname.startsWith("/add-property");

  // Utilisateur non connecté : redirection vers la page d'inscription
  if (!session) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  // Page d'ajout d'une propriété
  // Connecté mais client seulement, on l'invite à modifier son profil pour passer en owner (propriétaire)
  if (isAddProperty && session.role === "client") {
    return NextResponse.redirect(new URL("/profile?invite=owner", request.url));
  }

  return NextResponse.next();
}

/**
 * Pages protégées par le proxy
 */
export const config = {
  matcher: ["/profile", "/messenger/:path*", "/add-property/:path*"],
};
