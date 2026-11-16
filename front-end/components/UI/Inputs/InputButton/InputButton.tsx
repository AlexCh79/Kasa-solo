import styles from "./InputButton.module.scss";
import { ComponentProps } from "react";
import Image from "next/image";

interface InputButtonProps extends ComponentProps<"button"> {
  id: string;
  label: string;
  action: "add" | "delete";
}

export default function InputButton({ id, label, action, ...rest }: InputButtonProps) {
  return (
    <div className={styles.inputButton}>
      <label htmlFor={id} className={styles.inputButton__label}>
        {label}
      </label>
      <input type="file" className={styles.inputButton__input} id={id} />
      <button {...rest}>
        <Image
          src={action === "add" ? "/icon_plus.svg" : "/icon_cross.svg"}
          width={16}
          height={16}
          className={action === "add" ? styles.inputButton__plus : styles.inputButton__cross}
          alt={action === "add" ? "Ajouter" : "Supprimer"}
        />
      </button>
    </div>
  );
}
