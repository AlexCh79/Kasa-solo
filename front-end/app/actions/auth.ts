"use server";
import type { PasswordReset } from "@/types/AuthUser";
import { redirect } from "next/navigation";
import { login, register, requestPassword, resetPassword } from "@/lib/authUsers";
import { deleteCookie } from "@/utils/cookies";
import { getCurrentUser, updateUser } from "@/lib/users";
import type { UserRole } from "@/types/User";
import { addImage } from "@/lib/uploads";

interface ProfileValues {
  name: string;
  role: UserRole;
}

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

/**
 * Server Action gérant la demande de lien sécurisé pour un nouveau mot de passe
 * @param _prevState - état précédent (fourni par useActionState) - le type LoginState est conservé pour éviter un doublon
 * @param formData - données du formulaire
 * @returns un message d'erreur si la requête échoue
 */
export async function forgotAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");

  // Vérification de la donnée
  if (typeof email !== "string" || !email) {
    return { error: "Veuillez renseigner une adresse email valide." };
  }

  // Appel de l'API
  let result: PasswordReset;

  try {
    result = await requestPassword(email);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Envoi impossible." };
  }

  // Info si le résultat revient sans le token
  if (!result.token) {
    return { error: "La réinitialisation du mot de passe n'est pas encore disponible." };
  }

  // Renvoi direct vers le lien incluant le token qui est normalement envoyé dans un email
  redirect(`/reset-password?token=${result.token}`);
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

/**
 * Server Action gérant la déconnexion utilisateur
 */
export async function logoutAction() {
  await deleteCookie("token");
  redirect("/");
}

interface UpdateState {
  error: string | null;
  values?: ProfileValues;
}

/**
 * Server Action gérant la mise à jour des données utilisateur
 */
export async function updateAction(
  _prevState: UpdateState,
  formData: FormData,
): Promise<UpdateState> {
  const user = await getCurrentUser();
  // Si utilisateur non connecté, redirection vers la page de connexion
  if (!user) redirect("/login");

  const name = formData.get("name");
  const file = formData.get("picture");
  const role = formData.get("role");
  let picture: string | undefined;

  if (typeof name !== "string" || !name.trim() || !role) {
    return { error: "Erreur dans le format des données des champs renseignés." };
  }

  if (role !== "client" && role !== "owner") {
    return { error: "Rôle invalide." };
  }

  const values: ProfileValues = {
    name: name.trim(),
    role,
  };

  // Mise à jour utilisateur
  try {
    if (user.role === "owner" && file instanceof File && file.size > 0) {
      picture = await addImage(file, "user-picture");
    }
    await updateUser({
      id: user.id,
      name: values.name,
      picture,
      role: values.role,
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Mise à jour impossible.", values };
  }

  await deleteCookie("token");
  redirect("/login?updated=1");
}
