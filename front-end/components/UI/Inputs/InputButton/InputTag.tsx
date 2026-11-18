"use client";
import styles from "./InputButton.module.scss";
import { useState, type KeyboardEvent, type ComponentProps } from "react";
import { PlusIcon } from "../../Icons/Icons";

interface InputTagProps extends Omit<ComponentProps<"input">, "onChange" | "value"> {
  id: string;
  label: string;
  onAdd: (tag: string) => void;
}

export function InputTag({ id, label, onAdd, ...rest }: InputTagProps) {
  const [value, setValue] = useState("");

  function handleAdd() {
    const tag = value.trim();
    if (!tag) return;
    onAdd(tag);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className={styles.inputButton}>
      <label htmlFor={id} className={styles.inputButton__label}>
        {label}
      </label>
      <div className={styles.inputButton__wrapper}>
        <input
          className={styles.inputButton__input}
          {...rest}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.inputButton__plus}
          type="button"
          onClick={handleAdd}
          aria-label={`Ajouter : ${label}`}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
