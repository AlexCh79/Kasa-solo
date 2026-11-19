import styles from "./MessengerPage.module.scss";
import Button from "@/components/UI/Buttons/Button";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";
import UserMessenger from "@/components/UI/Messenger/UserMessenger";

/**
 * Page de la messagerie
 */
export default function MessengerPage() {
  return (
    <section className={styles.messenger}>
      <div className={styles.messenger__return}>
        <Button label="Retour" id="return" variant="secondary" href="/" icon={<ArrowLeftIcon />} />
      </div>
      <div className={styles.messenger__body}>
        <div className={styles.messenger__titleWrapper}>
          <h1 className={styles.messenger__title}>Messages</h1>
        </div>
        <div className={styles.messenger__usersWrapper}>
          <UserMessenger />
        </div>
      </div>
    </section>
  );
}
