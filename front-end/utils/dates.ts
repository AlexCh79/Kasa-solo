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

/**
 * Conversion d'une date SQLite (UTC sans fuseau) au format ISO 8601
 * @param date - date au format "AAAA-MM-JJ HH:MM:SS"
 * @returns date au format "AAAA-MM-JJTHH:MM:SSZ"
 */
export function toIsoUtc(date: string): string {
  return `${date.replace(" ", "T")}Z`;
}
