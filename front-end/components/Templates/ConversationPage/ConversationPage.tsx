import type { Message } from "@/types/Message";
import styles from "./ConversationPage.module.scss";
import MessageCard from "@/components/UI/Messenger/MessageCard/MessageCard";
import type { PropertyHost } from "@/types/Property";
import type { UserData } from "@/types/User";
import Button from "@/components/UI/Buttons/Button";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";
import MessageInput from "@/components/UI/Inputs/MessageInput/MessageInput";

interface ConversationPageProps {
  conversationId: number;
  messages: Message[];
  other: PropertyHost;
  user: UserData;
}

/**
 * Liste des messages d'une conversation
 * @param conversationId - id de la conversation
 * @param messages - tableau des messages de la conversation
 * @param other - interlocuteur
 * @param user - utilisateur connecté
 */
export default function ConversationPage({
  conversationId,
  messages,
  other,
  user,
}: ConversationPageProps) {
  return (
    <section className={styles.conversation}>
      <div className={styles.conversation__buttonWrapper}>
        <div className={styles.conversation__buttonZone}>
          <Button variant="secondary" label="Retour" icon={<ArrowLeftIcon />} href="/messenger" />
        </div>
      </div>
      <ul className={styles.conversation__messages}>
        {messages.length === 0 && (
          <li className={styles.conversation__empty}>
            Pensez à saluer votre interlocuteur dans votre premier message.
          </li>
        )}
        {messages.map((message) => (
          <li key={message.id}>
            <MessageCard message={message} other={other} user={user} />
          </li>
        ))}
      </ul>
      <div className={styles.conversation__writerZone}>
        <MessageInput conversationId={conversationId} />
      </div>
    </section>
  );
}
