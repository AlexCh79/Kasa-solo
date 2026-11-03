import styles from "./HomePage.module.scss";
import PropertyCard from "@/components/UI/PropertyCard/PropertyCard";
import Image from "next/image";
import { getProperties } from "@/lib/properties";

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <div className={styles.homePage}>
      <section className={styles.homePage__introducing}>
        <div className={styles.homePage__titleSection}>
          <h1 className={styles.homePage__title}>Chez vous, partout et ailleurs</h1>
          <p className={styles.homePage__subtitle}>
            Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec
            soin par nos hôtes.
          </p>
        </div>
        <div className={styles.homePage__coverContainer}>
          <Image
            src="/images/homepage.webp"
            className={styles.homePage__cover}
            alt=""
            fill
            preload
            sizes="(min-width: 1280px) 1115px, (min-width: 768px) 594px; 342px"
          />
        </div>
      </section>
      <section className={styles.cards__container}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
      <section className={styles.howItWorks}>
        <div className={styles.howItWorks__titleContainer}>
          <h2 className={styles.howItWorks__title}>Comment ça marche ?</h2>
          <p className={styles.howItWorks__subtitle}>
            Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage
            professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
          </p>
        </div>
        <div className={styles.howItWorks__cardsContainer}>
          <article className={styles.howItWorks__card}>
            <h3 className={styles.howItWorks__cardTitle}>Recherchez</h3>
            <p className={styles.howItWorks__cardSubtitle}>
              Entrez votre destination, vos dates et laissez Kasa faire le reste.
            </p>
          </article>
          <article className={styles.howItWorks__card}>
            <h3 className={styles.howItWorks__cardTitle}>Réservez</h3>
            <p className={styles.howItWorks__cardSubtitle}>
              Profitez d&apos;une plateforme sécurisée et de profils d&apos;hôtes vérifiés.
            </p>
          </article>
          <article className={styles.howItWorks__card}>
            <h3 className={styles.howItWorks__cardTitle}>Vivez l&apos;expérience</h3>
            <p className={styles.howItWorks__cardSubtitle}>
              Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
