import { getPropertyById } from "@/lib/properties";
import type { PropertyDetail } from "@/types/Property";
import Button from "@/components/UI/Buttons/Button";
import Image from "next/image";
import styles from "./property.module.scss";
import Tag from "@/components/UI/Tags/Tags";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";
import Carrousel from "@/components/UI/Carrousel/Carrousel";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api";
import FavButton from "@/components/UI/Buttons/FavoriteButton/FavButton";
import HostCard from "@/components/UI/HostCard/HostCard";

/**
 * Génération des métadatas de la page en fonction du logement
 */
export async function generateMetadata({
  params,
}: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  try {
    const property = await getPropertyById(id);
    return { title: `${property.title} | Kasa` };
  } catch {
    return { title: "Logement | Kasa" };
  }
}

/**
 * Page de détail d'un logement
 */
export default async function PropertyPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  let property: PropertyDetail;
  try {
    property = await getPropertyById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <div className={styles.property}>
      <div className={styles.buttonZone}>
        <Button
          variant="secondary"
          label="Retour aux annonces"
          icon={<ArrowLeftIcon />}
          href="/properties"
        />
      </div>
      <div className={styles.property__carrousel}>
        <Carrousel title={property.title} images={property.pictures} key={property.id} />
      </div>
      <div className={styles.property__description}>
        <div className={styles.property__descriptionText}>
          <div className={styles.property__descriptionTitleContainer}>
            <div className={styles.property__titleFav}>
              <h1 className={styles.property__descriptionTitle}>{property.title}</h1>
              <FavButton propertyId={property.id} propertyTitle={property.title} />
            </div>
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
      <HostCard property={property} />
    </div>
  );
}
