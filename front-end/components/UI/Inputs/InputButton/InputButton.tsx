"use client";
import styles from "./InputButton.module.scss";
import { useRef, useState, type ChangeEvent, type ComponentProps } from "react";
import { CrossIcon, PlusIcon } from "../../Icons/Icons";

interface InputButtonProps extends Omit<ComponentProps<"input">, "type"> {
  id: string;
  label: string;
}

/**
 * Champ input personnalisé avec bouton + ou x pour ajouter ou retirer
 * @param id - id de l'input
 * @param label - texte du label
 */
export default function InputButton({ id, label, onChange, ...rest }: InputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.files?.[0]?.name ?? null);
    onChange?.(event);
  }

  function handleRemove() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileName(null);
  }

  return (
    <div className={styles.inputButton}>
      <label htmlFor={id} className={styles.inputButton__label}>
        {label}
      </label>
      <div className={styles.inputButton__wrapper}>
        <input
          ref={inputRef}
          type="file"
          {...rest}
          className="sr-only"
          tabIndex={-1}
          id={id}
          onChange={handleChange}
        />
        <span className={styles.inputButton__fileName}>{fileName ?? ""}</span>
        {fileName ? (
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Retirer le fichier ${fileName}`}
            className={styles.inputButton__cross}
          >
            <CrossIcon />
          </button>
        ) : (
          <button
            className={styles.inputButton__plus}
            onClick={() => inputRef.current?.click()}
            aria-label={`Choisir: ${label}`}
            type="button"
          >
            <PlusIcon />
          </button>
        )}
      </div>
    </div>
  );
}
