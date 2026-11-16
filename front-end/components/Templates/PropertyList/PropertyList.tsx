import Button from "@/components/UI/Buttons/Button";
import styles from "./PropertyList.module.scss";
import PropertyCard from "@/components/UI/PropertyCard/PropertyCard";
import { getProperties } from "@/lib/properties";

interface PropertyListProps {
  limit?: number;
}

/**
 * Grille des logements du site
 */
export default async function PropertyList({ limit }: PropertyListProps) {
  const properties = await getProperties();
  return (
    <div className={styles.list}>
      <section className={styles.list__container}>
        {properties.slice(0, limit).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
      {limit && properties.length > limit && (
        <div className={styles.list__button}>
          <Button variant="primary" label="Voir nos logements" href="/properties" />
        </div>
      )}
    </div>
  );
}
