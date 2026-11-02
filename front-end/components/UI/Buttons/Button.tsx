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
  href: string;
}) {
  return (
    <button
      className={`${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary}`}
      onClick={onClick}
    >
      <Link href={href} className={styles.button__link}>
        {label}
      </Link>
    </button>
  );
}
