import styles from "./PropertiesPage.module.scss";
import PropertyListSkeleton from "@/components/UI/Skeleton/PropertyListSkeleton/PropertyListSkeleton";
import PropertyList from "../PropertyList/PropertyList";
import { Suspense } from "react";

/**
 * Page listant tous les logements du site
 */
export default function PropertiesPage() {
  return (
    <section className={styles.properties}>
      <div className={styles.properties__titleSection}>
        <h1 className={styles.properties__title}>Nos logements</h1>
        <p className={styles.properties__subtitle}>
          Tous les logements disponibles sur Kasa, chacun vous réservant un séjour inoubliable.
        </p>
      </div>
      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList />
      </Suspense>
    </section>
  );
}
