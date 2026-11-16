import Button from "@/components/UI/Buttons/Button";
import styles from "./PropertyList.module.scss";
import { getProperties } from "@/lib/properties";
import PropertyGrid from "./PropertyGrid";

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
      <PropertyGrid properties={properties.slice(0, limit)} />
      {limit && properties.length > limit && (
        <div className={styles.list__button}>
          <Button variant="primary" label="Voir nos logements" href="/properties" />
        </div>
      )}
    </div>
  );
}
