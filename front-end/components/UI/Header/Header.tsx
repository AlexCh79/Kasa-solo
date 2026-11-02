"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/UI/Buttons/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <header className={`${styles.header} ${styles.mobile}`}>
      <div className={styles.header__container}>
        <Image src="./picto.svg" alt="Kasa logo" width={46} height={53} />
        <button
          role="button"
          aria-label="Ouvrir le menu"
          className={styles.header__menuButton}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <Image src="./icon_menu.svg" alt="Ouvrir le menu" width={25} height={25} />
        </button>
      </div>
      {isMenuOpen && (
        <nav className={styles.header__nav}>
          <ul className={styles.header__navList}>
            <li className={styles.header__navItem}>
              <Link href="/" className={styles.header__navLink} onClick={() => toggleMenu(false)}>
                Accueil
              </Link>
            </li>
            <li className={styles.header__navItem}>
              <Link
                href="/about"
                className={styles.header__navLink}
                onClick={() => toggleMenu(false)}
              >
                À propos
              </Link>
            </li>
            <li className={styles.header__navItem}>
              <Link
                href="/messenger"
                className={styles.header__navLink}
                onClick={() => toggleMenu(false)}
              >
                Messagerie
              </Link>
            </li>
            <li className={styles.header__navItem}>
              <Link
                href="/favorites"
                className={styles.header__navLink}
                onClick={() => toggleMenu(false)}
              >
                Favoris
              </Link>
            </li>
            <li className={styles.header__navItem}>
              <Button label="Ajouter un logement" variant="primary" href="/add-property" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
