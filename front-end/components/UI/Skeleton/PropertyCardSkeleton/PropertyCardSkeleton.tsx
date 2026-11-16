import styles from "./PropertyCardSkeleton.module.scss";

/**
 * Squelette de chargement d'une carte de logement
 * Reprend les dimensions de PropertyCard pour éviter un décalage à l'affichage
 */
export default function PropertyCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.shimmer} ${styles.card__cover}`} />
      <div className={styles.card__details}>
        <div className={styles.card__text}>
          <div className={`${styles.shimmer} ${styles.card__title}`} />
          <div className={`${styles.shimmer} ${styles.card__subtitle}`} />
        </div>
        <div className={`${styles.shimmer} ${styles.card__price}`} />
      </div>
    </div>
  );
}
