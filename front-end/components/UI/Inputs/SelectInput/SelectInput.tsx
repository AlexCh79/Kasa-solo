import { ComponentProps } from "react";
import styles from "./SelectInput.module.scss";
import { ChevronIcon } from "../../Icons/Icons";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ComponentProps<"select"> {
  id: string;
  label: string;
  options: SelectOption[];
}

/**
 * Input Select
 * @param id - id à attribuer à l'input
 * @param label - texte à afficher dans le label
 * @param options - liste : valeurs, label à afficher dans le select
 */
export default function SelectInput({ id, label, options, ...rest }: SelectProps) {
  return (
    <div className={styles.select}>
      <label htmlFor={id} className={styles.select__label}>
        {label}
      </label>
      <div className={styles.select__wrapper}>
        <select id={id} className={styles.select__input} {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronIcon className={styles.select__chevron} />
      </div>
    </div>
  );
}
