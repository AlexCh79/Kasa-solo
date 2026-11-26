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

/**
 * Conversion d'une date SQLite en heure, cycle de 12 heures pour intégrer le format AM/PM de la maquette
 * @param date - date à formater
 * @returns heure au format "HH:MM am", fuseau horaire de Paris
 */
export function toHours(date: string): string {
  return new Date(date)
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h12",
      timeZone: "Europe/Paris",
    })
    .toLocaleLowerCase();
}
