"use client";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./FavoritesList.module.scss";
import PropertyCard from "@/components/UI/PropertyCard/PropertyCard";
import type { PropertyBase } from "@/types/Property";
import Button from "@/components/UI/Buttons/Button";

interface FavoritesListProps {
  properties: PropertyBase[];
}

/**
 * Liste des propriétés favorites
 * @param properties - liste des propriétés
 */
export default function FavoritesList({ properties }: FavoritesListProps) {
  const { isFavorite, isReady } = useFavorites();

  const list = properties.filter((property) => isFavorite(property.id));

  return (
    <div className={styles.favorites}>
      <h1 className={styles.favorites__title}>Vos favoris</h1>
      <p className={styles.favorites__subtitle}>
        Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver ? Un simple clic et
        votre prochain séjour est en route.
      </p>
      {isReady &&
        (list.length === 0 ? (
          <div className={styles.favorites__empty}>
            <p className={styles.favorites__subtitle}>
              Vous n&apos;avez aucun favori enregistré pour le moment.
            </p>
            <Button href="/" label="Voir les logements" variant="primary" />
          </div>
        ) : (
          <div className={styles.favorites__list}>
            {list.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ))}
    </div>
  );
}
