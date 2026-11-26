"use client";
import styles from "./UserMessenger.module.scss";
import Image from "next/image";
import Link from "next/link";
import type { Conversation } from "@/types/Message";
import { toHours } from "@/utils/dates";

interface UserMessengerProps {
  conversation: Conversation;
}

/**
 * Conversation dans la liste de la messagerie
 */
export default function UserMessenger({ conversation }: UserMessengerProps) {
  const host = conversation.otherUser;
  const message = conversation.lastMessage;
  const time = toHours(conversation.updatedAt);

  return (
    <article className={styles.user}>
      <Link
        className={
          conversation.unreadCount > 0
            ? `${styles.user__link} ${styles.user__unreadWrapper}`
            : styles.user__link
        }
        href={`/messenger/${conversation.id}`}
      >
        <ul className={styles.user__body}>
          <li className={styles.user__item}>
            <div className={styles.user__contactWrapper}>
              <div className={styles.user__contactCoverWrapper}>
                <Image
                  src={host.picture ? host.picture : "/default_profile.svg"}
                  alt={`Photo de profil de ${host.name}`}
                  width={44}
                  height={45}
                />
              </div>
              <div className={styles.user__contactInfo}>
                <h2 className={styles.user__contactName}>{host.name}</h2>
                <span className={styles.user__contactPreview}>{message} </span>
              </div>
              <div className={styles.user__contactTimerWrapper}>
                <time className={styles.user__contactTimer}>{time}</time>
                {conversation.unreadCount > 0 && <span className={styles.user__unread}></span>}
              </div>
            </div>
          </li>
        </ul>
      </Link>
    </article>
  );
}
