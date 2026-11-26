import type { Metadata } from "next";
import { getMessages, getConversations } from "@/lib/messages";
import ConversationPage from "@/components/Templates/ConversationPage/ConversationPage";
import type { Message } from "@/types/Message";
import type { PropertyHost } from "@/types/Property";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/users";
import { ApiError } from "@/lib/api";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Conversation | Kasa",
};

/**
 * Page d'une conversation
 */
export default async function Conversation({ params }: PageProps<"/messenger/[id]">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { id } = await params;
  const idValue = Number(id);
  if (!Number.isInteger(idValue) || idValue < 1) notFound();
  const conversation = (await getConversations()).find((c) => idValue === c.id);
  if (!conversation) notFound();
  const other: PropertyHost = conversation.otherUser;
  let messages: Message[];
  try {
    messages = await getMessages(idValue);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 403)) notFound();
    throw error;
  }

  return <ConversationPage messages={messages} other={other} user={user} />;
}
