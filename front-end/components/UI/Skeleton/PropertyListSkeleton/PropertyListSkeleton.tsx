import styles from "@/components/Templates/PropertyList/PropertyList.module.scss";
import PropertyCardSkeleton from "../PropertyCardSkeleton/PropertyCardSkeleton";

/**
 * Squelette de chargement de la grille des logements
 */
export default function PropertyListSkeleton() {
  return (
    <div className={styles.list} aria-busy="true">
      <p className="sr-only" role="status">
        Chargement des logements…
      </p>
      <section className={styles.list__container}>
        {Array.from({ length: 6 }, (_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
}
