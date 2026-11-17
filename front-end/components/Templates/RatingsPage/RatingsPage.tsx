import { PropertyBase } from "@/types/Property";
import styles from "./RatingsPage.module.scss";
import { getPropertyById } from "@/lib/properties";
import { getRatings } from "@/lib/ratings";
import { Rating } from "@/types/Rating";
import { ApiError } from "@/lib/api";
import { notFound } from "next/navigation";
import RatingCard from "@/components/UI/RatingCard/RatingCard";
import Button from "@/components/UI/Buttons/Button";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";

interface RatingsPageProps {
  propertyId: string;
}

/**
 * Liste des avis d'un logement
 * @param propertyId - id du logement dont on veut afficher les avis  
 */
export async function RatingsPageList({ propertyId }: RatingsPageProps) {
  let property: PropertyBase;
  let ratings: Rating[];

  try {
    [property, ratings] = await Promise.all([getPropertyById(propertyId), getRatings(propertyId)]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <section className={styles.rating}>
      <div className={styles.rating__button}>
        <Button
          href={`/properties/${property.id}`}
          label="Retour au logement"
          variant="secondary"
          icon={<ArrowLeftIcon />}
        />
      </div>
      <div className={styles.rating__titleContainer}>
        <h1 className={styles.rating__title}>L&apos;avis des voyageurs</h1>
        <p className={styles.rating__subtitle}>
          Nos voyageurs ont laissé un avis suite à leur séjour dans le logement {property.title}
        </p>
      </div>
      {ratings.length === 0 ? (
        <p className={styles.rating__none}>Aucun avis pour le moment.</p>
      ) : (
        <ul className={styles.rating__list}>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <RatingCard rating={rating} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
