"use client";
import styles from "./RatingAdd.module.scss";
import { useActionState } from "react";
import Button from "@/components/UI/Buttons/Button";
import SelectInput from "@/components/UI/Inputs/SelectInput/SelectInput";
import ratingAction from "@/app/actions/rating";
import TextArea from "@/components/UI/Inputs/TextArea/TextArea";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";

interface RatingAddProps {
  propertyId: string;
}

/**
 * Formulaire d'ajout d'un avis par l'utilisateur
 * @param propertyId - id du logement
 */
export default function RatingAdd({ propertyId }: RatingAddProps) {
  const ratingWithId = ratingAction.bind(null, propertyId);
  const [state, formAction, isPending] = useActionState(ratingWithId, {
    error: null,
  });

  return (
    <section className={styles.ratingAdd}>
      <div className={styles.ratingAdd__button}>
        <Button
          href={`/properties/${propertyId}/ratings`}
          label="Retour aux avis"
          variant="secondary"
          icon={<ArrowLeftIcon />}
        />
      </div>
      <div>
        <h1 className={styles.ratingAdd__title}>Donnez votre avis de voyageur</h1>
      </div>
      <form className={styles.ratingAdd__form} action={formAction}>
        <SelectInput
          name="note"
          label="Votre note sur 5 : "
          options={["1", "2", "3", "4", "5"]}
          id="note"
        />
        <TextArea
          id="comment"
          name="comment"
          label="Votre commentaire (seulement si vous le souhaitez) :"
        />
        {state.error && (
          <p role="alert" className="error__subtitle">
            {state.error}
          </p>
        )}
        <div className={styles.ratingAdd__button}>
          <Button
            type="submit"
            variant="primary"
            label={isPending ? "Envoi..." : "Envoyer"}
            disabled={isPending}
          />
        </div>
      </form>
    </section>
  );
}
