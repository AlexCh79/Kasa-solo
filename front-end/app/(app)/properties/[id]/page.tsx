import { getPropertyById } from "@/lib/properties";
import type { PropertyDetail } from "@/types/Property";
import Button from "@/components/UI/Buttons/Button";
import Image from "next/image";
import styles from "./property.module.scss";
import Tag from "@/components/UI/Tags/Tags";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";
import Carrousel from "@/components/UI/Carrousel/Carrousel";

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
      <div className={styles.property__carrousel}>
        <Carrousel title={property.title} images={property.pictures} key={property.id} />
      </div>
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
          <div className={styles.property__equipmentsGrid}>
            {property.equipments.map((item) => (
              <Tag label={item} key={item} />
            ))}
          </div>
        </div>
        <div className={styles.property__equipments}>
          <h2 className={styles.property__equipmentsTitle}>Catégorie</h2>
          <div className={styles.property__equipmentsGrid}>
            {property.tags.map((category) => (
              <Tag label={category} key={category} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.host}>
        <h2 className={styles.host__Title}>Votre hôte</h2>
        <div className={styles.host__Container}>
          <div className={styles.host__coverWrapper}>
            <Image
              src={`${property.host.picture}`}
              width={81}
              height={82}
              className={styles.host__cover}
              alt={`Photo de votre hôte ${property.host.name}`}
            />
          </div>
          <span className={styles.host__name}>{property.host.name}</span>
          <div className={styles.host__ratingWrapper}>
            <Image src="/icon_star.svg" width={19} height={23} alt="Note moyenne du logement" />
            <span className={styles.host__rating}>{property.ratingAvg}</span>
          </div>
        </div>
        <Button label="Contacter l'hôte" variant="primary" href="/messenger" />
      </div>
    </div>
  );
}
