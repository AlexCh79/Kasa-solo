"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/authUsers";

export interface LoginState {
  error: string | null;
}

/**
 * Serveur action gérant la connexion utilisateur
 * @param _prevState - état précédent (fourni par useActionState, non utilisé)
 * @param formData - données du formulaire
 * @returns un message d'erreur si la connexion échoue
 */
export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Vérification des champs renseignés
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return { error: "Veuillez remplir tous les champs du formulaire." };
  }

  // Connexion
  try {
    await login(email, password);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Connexion impossible." };
  }
  redirect("/");
}
