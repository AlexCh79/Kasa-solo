"use client";
import styles from "./InputButton.module.scss";
import { useRef, useState, useEffect, type ChangeEvent, type ComponentProps } from "react";
import { CrossIcon, PlusIcon } from "../../Icons/Icons";
import Image from "next/image";

interface InputButtonProps extends Omit<ComponentProps<"input">, "type"> {
  id: string;
  label: string;
}

/**
 * Champ input personnalisé avec bouton + ou x pour ajouter ou retirer une photo
 * Affiche l'aperçu de la photo uploadée sous l'input
 * @param id - id de l'input
 * @param label - texte du label
 * @param onChange - fonction appelée au changement de l'input
 */
export default function InputButton({ id, label, onChange, ...rest }: InputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Nettoyage de l'ancienne URL de la photo si elle change ou qu'on la supprime
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Mise à jour du champ si changement
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    onChange?.(event);
  }

  // Retrait du fichier
  function handleRemove() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileName(null);
    setPreviewUrl(null);
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
      {previewUrl && (
        <div className={styles.inputButton__previewWrapper}>
          <Image
            src={previewUrl}
            alt={`Aperçu : ${label}`}
            fill
            unoptimized
            className={styles.inputButton__preview}
          />
        </div>
      )}
    </div>
  );
}
