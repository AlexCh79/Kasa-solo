"use client";
import { createContext, useContext, useSyncExternalStore } from "react";
import {
  getFavorites,
  getServerFavorites,
  saveFavorites,
  subscribeFavorite,
} from "@/utils/favorites";

interface FavoritesContextProps {
  favorites: string[];
  isReady: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

interface FavoritesProviderProps {
  children: React.ReactNode;
}

/**
 * Création d'un context pour les favoris
 * Reste null si le contexte est utilisé en dehors du provider
 */
const FavoritesContext = createContext<FavoritesContextProps | null>(null);

// Fonction d'abonnement sans appel de rendu si pas de changement
const subscribeToNothing = () => () => {};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favorites = useSyncExternalStore(subscribeFavorite, getFavorites, getServerFavorites);
  const isReady = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    const nextFavorites = isFavorite(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];
    saveFavorites(nextFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isReady, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Donne accès aux favoris depuis n'importe quel composant client
 * @throws si le composant n'est pas placé dans un FavoritesProvider
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  return context;
};
