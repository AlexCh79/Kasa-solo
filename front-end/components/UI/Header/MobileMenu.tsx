"use client";
import Button from "@/components/UI/Buttons/Button";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

interface MobileMenuProps {
  isLoggedIn: boolean;
}
/**
 * Menu Mobile
 */
export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };
  return (
    <header className={`${styles.header} ${styles.mobile}`}>
      <div className={styles.header__container}>
        <Link href="/" aria-label="Accueil">
          <Image src="/picto.svg" alt="" width={46} height={53} />
        </Link>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className={styles.header__menuButton}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? (
            <Image src="/icon_cross.svg" alt="" width={25} height={25} />
          ) : (
            <Image src="/icon_menu.svg" alt="" width={25} height={25} />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <nav className={styles.header__navMobile}>
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
              <Link
                href={isLoggedIn ? "/profile" : "/login"}
                className={styles.header__navLink}
                onClick={() => toggleMenu(false)}
              >
                {isLoggedIn ? "Profil" : "Se connecter"}
              </Link>
            </li>
            {isLoggedIn && (
              <li className={styles.header__navItem}>
                <form
                  className={styles.header__navLink}
                  action={logoutAction}
                  onSubmit={() => toggleMenu(false)}
                >
                  <button
                    type="submit"
                    className={`${styles.header__navLink} ${styles.header__logoutBtnMobile}`}
                  >
                    Déconnexion
                  </button>
                </form>
              </li>
            )}
            <li className={styles.header__navItem}>
              <Button
                label="Ajouter un logement"
                variant="primary"
                href="/add-property"
                onClick={() => toggleMenu(false)}
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
