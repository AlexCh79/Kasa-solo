import styles from "./PropertyList.module.scss";
import PropertyCard from "@/components/UI/PropertyCard/PropertyCard";
import { getProperties } from "@/lib/properties";

/**
 * Grille des logements du site
 */
export default async function PropertyList() {
  const properties = await getProperties();
  return (
    <div className={styles.list}>
      <section className={styles.list__container}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
    </div>
  );
}
