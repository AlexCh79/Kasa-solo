import { Message, Conversation, ConversationRef } from "@/types/Message";
import { fetchApi } from "./api";
import type { PropertyHost } from "@/types/Property";
import { toAbsoluteUrl } from "@/utils/urls";
import { toIsoUtc } from "@/utils/dates";

/**
 * Typage des messages et conversation de l'utilisateur
 */
interface ConversationAPI {
  id: number;
  updated_at: string;
  last_message: string | null;
  unread_count: number;
  other_user: PropertyHost;
}

interface MessageAPI {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  read_at: string | null;
}

/**
 * Conversion des données d'une conversation API vers camelCase
 */
function toConversation({
  id,
  updated_at,
  last_message,
  unread_count,
  other_user,
}: ConversationAPI): Conversation {
  return {
    id,
    updatedAt: toIsoUtc(updated_at),
    lastMessage: last_message,
    unreadCount: unread_count,
    otherUser: {
      ...other_user,
      picture: other_user.picture ? toAbsoluteUrl(other_user.picture) : "/default_profile.svg",
    },
  };
}

/**
 * Conversion des données de messages de l'API vers le camelCase
 */
function toMessage({
  id,
  conversation_id,
  sender_id,
  created_at,
  read_at,
  content,
}: MessageAPI): Message {
  return {
    id,
    conversationId: conversation_id,
    senderId: sender_id,
    createdAt: toIsoUtc(created_at),
    readAt: read_at ? toIsoUtc(read_at) : null,
    content,
  };
}

/**
 * Liste des conversations utilisateurs
 * @returns la liste des conversations
 */
export async function getConversations(): Promise<Conversation[]> {
  const response: ConversationAPI[] = await fetchApi("/api/conversations");
  return response.map(toConversation);
}

/**
 * Récupère ou crée une conversation avec un hôte
 * @param hostId - ID de l'interlocuteur de la conversation
 * @returns l'id de la conversation avec l'hôte
 */
export async function getConversationWithHost(hostId: number): Promise<number> {
  const response: ConversationRef = await fetchApi("/api/conversations", {
    method: "POST",
    body: JSON.stringify({ host_id: hostId }),
  });
  return response.id;
}

/**
 * Liste des messages d'une conversation
 * @param id - id de la conversation
 * @returns les messages de la conversation
 */
export async function getMessages(id: number): Promise<Message[]> {
  const response: MessageAPI[] = await fetchApi(`/api/conversations/${id}/messages`);
  return response.map(toMessage);
}

/**
 * Envoi d'un nouveau message dans une conversation
 * @param id - id de la conversation
 * @param content - contenu du message
 * @returns le message envoyé
 */
export async function sendMessage(id: number, content: string): Promise<Message> {
  const response: MessageAPI = await fetchApi(`/api/conversations/${id}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  return toMessage(response);
}
