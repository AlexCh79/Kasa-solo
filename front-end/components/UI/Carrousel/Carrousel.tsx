"use client";
import { useState } from "react";
import styles from "./Carrousel.module.scss";
import Image from "next/image";

interface CarrouselProps {
  images: string[];
  title: string;
}

/** Nombre maxi de vignettes visibles */
const MAX_VIGNETS = 4;

/**
 * Carrousel des photos d'un logement
 * @param images - URLs des photos, la première étant celle de couverture
 * @param title - titre du logement
 */
export default function Carrousel({ images, title }: CarrouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;
  const mainImage = total > 0 ? images[currentIndex] : "/default_cover.svg";

  // Calcul des indices des photos suivantes pour le défilement
  const vignetCount = total > 1 ? Math.min(MAX_VIGNETS, total - 1) : 0;
  const vignetIndexes = Array.from(
    { length: vignetCount },
    (_, k) => (currentIndex + 1 + k) % total,
  );

  return (
    <div className={styles.carrousel}>
      <div className={styles.carrousel__mainWrapper}>
        <Image
          src={mainImage}
          className={styles.carrousel__main}
          fill
          sizes="(min-width: 1280px) 303px, 358px"
          preload
          alt={
            total > 0
              ? `${title}, photo ${currentIndex + 1} sur ${total}`
              : "Aucune photo du logement n'est disponible"
          }
        />
        <p className="sr-only" aria-live="polite">
          {total > 0
            ? `Photo ${currentIndex + 1} sur ${total}`
            : "Aucune photo du logement n'est disponible"}
        </p>
      </div>
      {vignetIndexes.length > 0 && (
        <div className={styles.carrousel__vignetContainer}>
          {vignetIndexes.map((index) => (
            <button
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={styles.carrousel__vignetWrapper}
              key={index}
              aria-label={`Afficher la photo ${index + 1} sur ${total}`}
            >
              <Image
                fill
                sizes="(min-width: 1280px) 147px, 83px"
                alt=""
                src={images[index]}
                className={styles.carrousel__vignet}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
