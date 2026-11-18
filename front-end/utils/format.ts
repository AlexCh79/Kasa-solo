/**
 * Nettoyage d'un texte
 * @param formData - données de formulaire à nettoyer
 * @param key - nom du champ contenant le texte à nettoyer
 * @returns la chaine de caractère nettoyée ou vide si le champ est vide
 */
export function getText(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/**
 * Vérification du format d'un fichier
 * @param formData - données de formulaire où se situe le fichier
 * @param key - nom du champ contenant le fichier à vérifier
 * @returns le fichier vérifié ou vide
 */
export function getFile(formData: FormData, key: string): File | undefined {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : undefined;
}
