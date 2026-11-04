import { getPropertyById } from "@/lib/properties";
import type { PropertyDetail } from "@/types/Property";
import Button from "@/components/UI/Buttons/Button";
import Image from "next/image";
import styles from "./property.module.scss";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";

/**
 * Page de détail d'un logement
 */
export default async function PropertyPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  let property: PropertyDetail;
  try {
    property = await getPropertyById(id);
  } catch {
    throw new Error("Logement introuvable");
  }

  return (
    <div className={styles.property}>
      <div className={styles.buttonZone}>
        <Button variant="secondary" label="Retour aux annonces" icon={<ArrowLeftIcon />} href="/" />
      </div>
      <div className={styles.property__carrousel}></div>
      <div className={styles.property__description}>
        <div className={styles.property__descriptionText}>
          <div className={styles.property__descriptionTitleContainer}>
            <h1 className={styles.property__descriptionTitle}>{property.title}</h1>
            <div className={styles.property__descriptionLocationContainer}>
              <Image src="/icon_map.svg" width={16} height={16} alt="" />
              <span>{property.location ? property.location : "Localisation inconnue"}</span>
            </div>
          </div>
        </div>
        <div className={styles.property__equipments}>
          <h2 className={styles.property__equipmentsTitle}>Équipements</h2>
        </div>
      </div>
      <div className={styles.property__host}></div>
    </div>
  );
}
