import styles from "./CheckBox.module.scss";
import type { ComponentProps } from "react";

interface CheckBoxProps extends ComponentProps<"input"> {
  label: string;
}

/**
 * Input de type case à cocher
 * @param label - Texte à ajouter à la suite de la case à cocher
 */
export default function CheckBox({ label, id, ...rest }: CheckBoxProps) {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} className={styles.checkbox__input} {...rest} />
      <label htmlFor={id} className={styles.checkbox__text}>
        {label}
      </label>
    </div>
  );
}
