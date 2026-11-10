import Link from "next/link";
import styles from "./Button.module.scss";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  href?: string;
  icon?: React.ReactNode;
}

/**
 * Bouton du site
 * @param label - nom que doit afficher le bouton
 * @param onClick - facultatif, action déclenchée au clic
 * @param variant - couleur de fond orange foncé (primary) ou gris (secondary)
 * @param href - facultatif, adresse vers laquelle renvoie le bouton
 * @param icon - facultatif, icone à afficher dans le bouton
 * @param type - type de bouton
 * @param disabled - booléen, true si le bouton est désactivé
 */
export default function Button({
  label,
  onClick,
  variant,
  href,
  icon,
  type = "button",
  disabled,
}: ButtonProps) {
  return href ? (
    <Link
      href={href}
      className={`${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
    >
      {icon ? (
        <>
          <span className={styles.button__icon}>{icon}</span>
          <span>{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </Link>
  ) : (
    <button
      type={type}
      className={`${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ? (
        <>
          <span className={styles.button__icon}>{icon}</span>
          <span>{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
