import Link from "next/link";
import styles from "./Button.module.scss";

/**
 * Bouton du site
 * @param label - nom que doit afficher le bouton
 * @param onClick - facultatif, action déclenchée au clic
 * @param variant - couleur de fond orange foncé (primary) ou gris (secondary)
 * @param href - facultatif, adresse vers laquelle renvoie le bouton
 */
export default function Button({
  label,
  onClick,
  variant,
  href,
}: {
  label: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  href?: string;
}) {
  return href ? (
    <Link
      href={href}
      className={`${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
    >
      {label}
    </Link>
  ) : (
    <button
      type="button"
      className={`${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
