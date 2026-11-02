import Link from "next/link";
import styles from "./Button.module.scss";

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
