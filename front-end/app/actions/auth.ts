"use server";

import { redirect } from "next/navigation";
import { login, register } from "@/lib/authUsers";

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

export interface RegisterState {
  error: string | null;
  values?: {
    lastName: string;
    firstName: string;
    email: string;
  };
}

/**
 * Server Action gérant l'inscription d'un nouvel utilisateur
 * @param _prevState - état précédent
 * @param formData - champs du formulaire d'enregistrement
 * @returns message d'erreur si l'inscription échoue
 */
export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const email = formData.get("email");
  const password = formData.get("password");
  const cgu = formData.get("cgu");

  // Vérification des champs renseignés
  if (
    typeof lastName !== "string" ||
    !lastName.trim() ||
    typeof firstName !== "string" ||
    !firstName.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return { error: "Tous les champs doivent être renseignés pour vous inscrire." };
  }

  const values = {
    lastName: lastName.trim(),
    firstName: firstName.trim(),
    email: email.trim(),
  };

  if (password.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères.", values };
  }

  if (cgu !== "on") {
    return {
      error: "Vous devez accepter les conditions d'utilisation pour continuer l'inscription.",
      values,
    };
  }

  // Conversion du nom et prénom
  const name = `${values.firstName} ${values.lastName}`;

  // Inscription
  try {
    await register(values.email, password, { name, role: "client" });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Inscription impossible.", values };
  }
  redirect("/");
}
