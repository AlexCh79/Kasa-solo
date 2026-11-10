import styles from "./Input.module.scss";
import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  hint?: string;
}

export default function Input({ id, label, hint, ...rest }: InputProps) {
  return (
    <div className={styles.input}>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.input__wrapper}>
        <input
          className={styles.input__inputElement}
          id={id}
          aria-describedby={hint ? `${id}-hint` : undefined}
          {...rest}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className={styles.input__hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
