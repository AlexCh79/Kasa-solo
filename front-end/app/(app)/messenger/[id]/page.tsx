import type { Metadata } from "next";
import { getMessages } from "@/lib/messages";

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
  const { id } = await params;
  const idValue = Number(id);
  const conversation = await getMessages(idValue);
}
