import Link from "next/link";
import styles from "./Button.module.scss";

/**
 * Bouton du site
 * @param label - nom que doit afficher le bouton
 * @param onClick - facultatif, action déclenchée au clic
 * @param variant - couleur de fond orange foncé (primary) ou gris (secondary)
 * @param href - facultatif, adresse vers laquelle renvoie le bouton
 * @param icon - facultatif, icone à afficher dans le bouton
 */
export default function Button({
  label,
  onClick,
  variant,
  href,
  icon,
}: {
  label: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  href?: string;
  icon?: React.ReactNode;
}) {
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
      type="button"
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
    </button>
  );
}
