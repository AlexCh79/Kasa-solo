import styles from "./MessengerPage.module.scss";
import Button from "@/components/UI/Buttons/Button";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";
import UserMessenger from "@/components/UI/Messenger/UserMessenger/UserMessenger";
import type { Conversation } from "@/types/Message";

interface MessengerPageProps {
  conversations: Conversation[];
}

/**
 * Page de la messagerie
 */
export default function MessengerPage({ conversations }: MessengerPageProps) {
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
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <UserMessenger key={conversation.id} conversation={conversation} />
            ))
          ) : (
            <p className={styles.messenger__empty}>
              Vous n&apos;avez conversé avec personne pour le moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
