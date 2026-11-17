import styles from "./TextArea.module.scss";
import { ComponentProps } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  id: string;
}

/**
 * Textarea réutilisable dans la charte graphique du site
 * @param label - Texte à afficher pour le label
 * @param id - id à attribuer à l'élément textarea
 */
export default function TextArea({ label, id, ...rest }: TextAreaProps) {
  return (
    <div className={styles.textarea}>
      <label className={styles.textarea__label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.textarea__wrapper}>
        <textarea id={id} className={styles.textarea__input} {...rest} />
      </div>
    </div>
  );
}
