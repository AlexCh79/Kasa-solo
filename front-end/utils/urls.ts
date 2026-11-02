/**
 * Transforme une URL relative du back en URL absolue
 * @param url - URL à transformer en URL absolue
 * @returns URL absolue - celles déjà complètes (S3) sont renvoyées telles quelles
 */
export function toAbsoluteUrl(url: string): string {
  return url.startsWith("/") ? new URL(url, process.env.API_URL).toString() : url;
}
