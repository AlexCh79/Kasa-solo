// Création d'une clé pour le stockage des favoris dans le localStorage
const STORAGE_KEY = "kasa-favorites";

// Tableau vide si aucun favori dans le localStorage
const EMPTY_FAVORITES: string[] = [];

// Fonctions abonnées, envoie un appel pour un nouveau rendu si changement
const listeners = new Set<() => void>();

// Cache à renvoyer si pas de changement de données
let cachedRaw: string | null = null;
let cachedFavorites: string[] = EMPTY_FAVORITES;

/**
 * Lecture des id des logements à stocker en favoris
 * @param raw - ligne contenant les id des logements à stocker en favoris
 * @returns liste des favoris, vide si aucune valeur trouvée
 */
const parseFavorites = (raw: string | null): string[] => {
  if (!raw) return EMPTY_FAVORITES;
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string")
      : EMPTY_FAVORITES;
  } catch {
    return EMPTY_FAVORITES;
  }
};

/**
 * Lit et met à jour la liste des favoris dans le localStorage
 * @returns la liste mise à jour des favoris dans le cache si une modif a eu lieu
 */
export const getFavorites = (): string[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedFavorites = parseFavorites(raw);
  }
  return cachedFavorites;
};

// Tableau vide à utiliser pendant le rendu serveur
export const getServerFavorites = (): string[] => EMPTY_FAVORITES;

/**
 * Abonnement du composant
 * @returns la fonction de désabonnement
 */
export function subscribeFavorite(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/**
 * Enregistrement de la liste des favoris dans le localStorage
 * @param favorites - liste des favoris à enregistrer
 */
export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  listeners.forEach((listener) => listener());
};
