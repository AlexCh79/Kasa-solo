import styles from "./UserMessenger.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function UserMessenger() {
  return (
    <article className={styles.user}>
      <Link className={styles.user__link} href={`/messenger`}>
        <ul className={styles.user__body}>
          <li>
            <div className={styles.user__contactWrapper}>
              <div className={styles.user__contactCoverWrapper}>
                <Image
                  src="/default_profile.svg"
                  alt={`Photo de profil de Contact}`}
                  width={44}
                  height={45}
                />
              </div>
              <div className={styles.user__contactInfo}>
                <h2 className={styles.user__contactName}>Utilisateur</h2>
                <span className={styles.user__contactPreview}>
                  Bonjour, votre appartement est disponible ?
                </span>
              </div>
              <div className={styles.user__contactTimerWrapper}>
                <time className={styles.user__contactTimer}>11:04 am</time>
                <span className={styles.user__unread}></span>
              </div>
            </div>
          </li>
        </ul>
      </Link>
    </article>
  );
}
