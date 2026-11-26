import type { Message } from "@/types/Message";
import styles from "./ConversationPage.module.scss";
import MessageCard from "@/components/UI/Messenger/MessageCard/MessageCard";
import type { PropertyHost } from "@/types/Property";
import type { UserData } from "@/types/User";

interface ConversationPageProps {
  messages: Message[];
  other: PropertyHost;
  user: UserData;
}

export default function ConversationPage({ messages, other, user }: ConversationPageProps) {
  return (
    <section className={styles.conversation}>
      {messages.map((message) => (
        <div key={message.id} className={styles.conversation__messages}>
          <MessageCard message={message} other={other} user={user} />
        </div>
      ))}
      <div className={styles.conversation__writerZone}></div>
    </section>
  );
}
