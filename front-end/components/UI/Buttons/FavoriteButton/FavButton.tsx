"use client";
import styles from "./FavButton.module.scss";
import { HeartIcon } from "@/components/UI/Icons/Icons";
import { useFavorites } from "@/context/FavoritesContext";

interface FavButtonProps {
  propertyId: string;
  propertyTitle: string;
}

/**
 * Bouton d'ajout / retrait d'un logement de la liste des favoris
 * @param propertyId - id du logement
 * @param propertyTitle - nom du logement
 */
const FavButton = ({ propertyId, propertyTitle }: FavButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const isActive = isFavorite(propertyId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(propertyId)}
      className={isActive ? `${styles.favButton} ${styles.active}` : styles.favButton}
      aria-label={
        isActive
          ? `Retirer le logement ${propertyTitle} des favoris`
          : `Ajouter le logement ${propertyTitle} aux favoris`
      }
      aria-pressed={isActive}
    >
      <HeartIcon filled={isActive} />
    </button>
  );
};

export default FavButton;
