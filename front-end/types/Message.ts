import type { PropertyHost } from "./Property";

/**
 * Typage de l'id de conversation
 */
export interface ConversationRef {
  id: number;
}

/**
 * Typage des conversations
 */
export interface Conversation extends ConversationRef {
  updatedAt: string;
  lastMessage: string | null;
  unreadCount: number;
  otherUser: PropertyHost;
}

/**
 * Typage des messages
 */
export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
  readAt: string | null;
}
