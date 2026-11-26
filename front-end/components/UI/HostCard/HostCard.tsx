"use client";
import styles from "./HostCard.module.scss";
import Image from "next/image";
import Button from "../Buttons/Button";
import { PropertyDetail } from "@/types/Property";
import { useActionState } from "react";
import contactAction from "@/app/actions/contact";

interface HostCardProps {
  property: PropertyDetail;
}

/**
 * Carte de l'hôte
 * @param property - Logement avec son hôte et sa note moyenne
 */
export default function HostCard({ property }: HostCardProps) {
  const [state, formAction, isPending] = useActionState(contactAction, { error: null });
  return (
    <form action={formAction} className={styles.host}>
      <h2 className={styles.host__Title}>Votre hôte</h2>
      <input type="hidden" value={property.host.id} id="hostId" name="hostId" />
      <div className={styles.host__Container}>
        <div className={styles.host__coverWrapper}>
          <Image
            src={property.host.picture}
            width={81}
            height={82}
            className={styles.host__cover}
            alt={`Photo de votre hôte ${property.host.name}`}
          />
        </div>
        <span className={styles.host__name}>{property.host.name}</span>
        <div className={styles.host__ratingWrapper}>
          <Image src="/icon_star.svg" width={19} height={23} alt="Note moyenne du logement sur 5" />
          <span className={styles.host__rating}>
            {property.ratingAvg.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
          </span>
        </div>
      </div>
      {state.error && (
        <span role="alert" className="error__subtitle">
          {state.error}
        </span>
      )}
      <Button
        label={isPending ? "Contact..." : "Contacter l'hôte"}
        variant="primary"
        type="submit"
        disabled={isPending}
      />
      <Button label="Voir les avis" variant="primary" href={`/properties/${property.id}/ratings`} />
    </form>
  );
}
