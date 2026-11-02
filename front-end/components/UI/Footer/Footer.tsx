import styles from "./Footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src="/picto.svg" width={46} height={53} alt="Kasa" />
      <span>&copy; 2020 Kasa. Tous droits réservés</span>
    </footer>
  );
}
