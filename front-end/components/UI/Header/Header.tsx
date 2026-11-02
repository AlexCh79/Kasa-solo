import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ProfileIcon, MessengerIcon } from "@/components/UI/Icons/Icons";
import MobileMenu from "./MobileMenu";

/**
 * Header du site
 */
export default function Header() {
  return (
    <>
      <MobileMenu />
      <header className={`${styles.header} ${styles.desktop}`}>
        <div className={styles.header__container}>
          <nav className={styles.header__nav}>
            <ul className={styles.header__navList}>
              <li className={styles.header__navItem}>
                <Link href="/" className={styles.header__navLink}>
                  Accueil
                </Link>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/about" className={styles.header__navLink}>
                  À propos
                </Link>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/">
                  <Image src="/logo.svg" alt="Kasa - Accueil" width={113} height={40} />
                </Link>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/add-property" className={styles.header__navLinkOrange}>
                  + Ajouter un logement
                </Link>
              </li>
            </ul>
            <ul className={styles.header__navListIcon}>
              <li className={styles.header__navItem}>
                <Link href="/favorites" className={styles.header__navIcon} aria-label="Favoris">
                  <HeartIcon />
                </Link>
              </li>
              <li>
                <span className={styles.line} aria-hidden="true"></span>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/messenger" className={styles.header__navIcon} aria-label="Messagerie">
                  <MessengerIcon />
                </Link>
              </li>
              <li>
                <span className={styles.line} aria-hidden="true"></span>
              </li>
              <li className={styles.header__navItem}>
                <Link href="/login" className={styles.header__navIcon} aria-label="Connexion">
                  <ProfileIcon />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
