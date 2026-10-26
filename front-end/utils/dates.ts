/**
 * Conversion de la date de création en fuseau local
 * @param date - date à formater au format string
 * @returns date complète au format string - ex : 26 octobre 2026
 */
export function toLocalDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
