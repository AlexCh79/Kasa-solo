import type { PropertyHost } from "@/types/Property";
import styles from "./MessageCard.module.scss";
import type { Message } from "@/types/Message";
import type { UserData } from "@/types/User";
import Image from "next/image";
import { toHours } from "@/utils/dates";

interface MessageCardProps {
  message: Message;
  other: PropertyHost;
  user: UserData;
}

/**
 * Carte affichant un seul message
 * @param message - le message à afficher
 * @param other - l'interlocuteur
 * @param user - l'utilisateur connecté
 */
export default function MessageCard({ message, other, user }: MessageCardProps) {
  const isMine = message.senderId === user.id;
  const sender = isMine ? user : other;
  return (
    <article
      className={
        isMine
          ? `${styles.message} ${styles.message__userSender}`
          : `${styles.message} ${styles.message__otherSender}`
      }
    >
      <div className={styles.message__coverWrapper}>
        <Image
          src={sender.picture ? sender.picture : "/default_profile.svg"}
          width={28}
          alt=""
          height={28}
          className={styles.message__cover}
        />
      </div>
      <div
        className={
          isMine
            ? `${styles.message__body} ${styles.message__userSenderBody}`
            : `${styles.message__body} ${styles.message__otherSenderBody}`
        }
      >
        <div className={styles.message__header}>
          <span>{sender.name}</span>
          <span className={styles.message__headerPoint}></span>
          <time dateTime={message.createdAt}>{toHours(message.createdAt)}</time>
        </div>
        <div
          className={
            isMine
              ? `${styles.message__contentWrapper} ${styles.message__userSenderContentWrapper}`
              : `${styles.message__contentWrapper} ${styles.message__otherSenderContentWrapper}`
          }
        >
          <p className={styles.message__content}>{message.content}</p>
        </div>
      </div>
    </article>
  );
}
