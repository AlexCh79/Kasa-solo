import styles from "./PropertyList.module.scss";
import PropertyCard from "@/components/UI/PropertyCard/PropertyCard";
import type { PropertyBase } from "@/types/Property";

interface PropertyGridProps {
  properties: PropertyBase[];
}

/**
 * Grille des logements du site (non asynchrone)
 * @param properties - Logements à afficher
 */
export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <div className={styles.list}>
      <section className={styles.list__container}>
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} isPriority={index === 0} />
        ))}
      </section>
    </div>
  );
}
