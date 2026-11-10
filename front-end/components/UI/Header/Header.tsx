import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ProfileIcon, MessengerIcon, LogoutIcon } from "@/components/UI/Icons/Icons";
import MobileMenu from "./MobileMenu";
import { cookies } from "next/headers";
import { logoutAction } from "@/app/actions/auth";

/**
 * Header du site
 */
export default async function Header() {
  const isLoggedIn = (await cookies()).has("token");

  return (
    <>
      <MobileMenu isLoggedIn={isLoggedIn} />
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
                <Link
                  href={isLoggedIn ? "/profile" : "/login"}
                  className={styles.header__navIcon}
                  aria-label={isLoggedIn ? "Profil" : "Connexion"}
                >
                  <ProfileIcon />
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <span className={styles.line} aria-hidden="true"></span>
                  </li>
                  <li className={styles.header__navItem}>
                    <form className={styles.header__navIcon} action={logoutAction}>
                      <button
                        type="submit"
                        aria-label="Déconnexion"
                        className={styles.header__logoutBtn}
                      >
                        <LogoutIcon />
                      </button>
                    </form>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
