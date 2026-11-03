import styles from "./PropertyCard.module.scss";
import FavButton from "@/components/UI/Buttons/FavoriteButton/FavButton";
import Image from "next/image";
import Link from "next/link";
import { PropertyBase } from "@/types/Property";

interface PropertyCardProps {
  property: PropertyBase;
}

/**
 * Carte de présentation d'un logement
 * @param property - propriété à afficher sur la carte
 */
export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/properties/${property.id}`} className={styles.card__link}>
        <div className={styles.card__coverContainer}>
          <Image
            src={property.cover ? property.cover : "/default_cover.svg"}
            fill
            sizes="(min-width: 768px) 355px, 100vw"
            alt=""
            className={styles.card__cover}
          />
        </div>
        <div className={styles.card__detailContainer}>
          <div className={styles.card__textContainer}>
            <h2 className={styles.card__title}>{property.title}</h2>
            <span className={styles.card__subtitle}>
              {property.location ? property.location : null}
            </span>
          </div>
          <div className={styles.card__priceContainer}>
            <span className={styles.card__price}>
              {property.pricePerNight}€ <span className={styles.card__priceUnit}>par nuit</span>
            </span>
          </div>
        </div>
      </Link>
      <FavButton propertyId={property.id} propertyTitle={property.title} />
    </article>
  );
}
