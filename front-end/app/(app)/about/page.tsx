import type { Metadata } from "next";
import Image from "next/image";
import styles from "./about.module.scss";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "À propos | Kasa",
};

/**
 * Page "à propos"
 */
export default function About() {
  return (
    <div className={styles.about}>
      <section className={styles.about__introducing}>
        <div className={styles.about__titleContainer}>
          <h1 className={styles.about__title}>À propos</h1>
          <p className={styles.about__subtitle}>
            Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
          </p>
          <p className={styles.about__subtitle}>
            Depuis notre création, nous mettons en relation des voyageurs en quête
            d&apos;authenticité avec des hôtes passionnés qui aiment partager leur région et leurs
            bonnes adresses.
          </p>
        </div>
        <div className={styles.about__coverContainer}>
          <Image
            src="/images/about_cover.webp"
            preload
            fill
            sizes="(min-width: 1280px) 1115px, (min-width: 768px) 594px, 342px"
            alt=""
            className={styles.about__cover}
          />
        </div>
      </section>
      <section className={styles.mission}>
        <div className={styles.mission__listContainer}>
          <h2 className={styles.mission__title}>Notre mission est simple :</h2>
          <ol className={styles.mission__list}>
            <li>Offrir une plateforme fiable et simple d&apos;utilisation.</li>
            <li>Proposer des hébergements variés et de qualité.</li>
            <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs.</li>
          </ol>
        </div>
        <div className={styles.mission__coverContainer}>
          <Image
            src="/images/about_mission.webp"
            fill
            sizes="(min-width: 768px) 494px, 358px"
            className={styles.mission__cover}
            alt=""
          />
        </div>
        <p className={styles.mission__subtitle}>
          Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un
          chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir
          inoubliable.
        </p>
      </section>
    </div>
  );
}
