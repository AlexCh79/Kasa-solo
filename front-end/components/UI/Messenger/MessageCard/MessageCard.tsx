import type { PropertyHost } from "@/types/Property";
import styles from "./MessageCard.module.scss";
import type { Message } from "@/types/Message";
import type { UserData } from "@/types/User";

interface MessageCardProps {
  message: Message;
  other: PropertyHost;
  user: UserData;
}

export default function MessageCard({ message, other, user }: MessageCardProps) {
  const sender = message.senderId === user.id ? user : other;
  return (
    <article className={styles.message}>
      <h1>
        {other.name} et {user.name}
      </h1>
      <p>Envoyé par {sender.name}</p>
      <p>{message.content}</p>
    </article>
  );
}
