"use client";
import styles from "./MessageInput.module.scss";
import { ArrowUpIcon } from "../../Icons/Icons";
import { useActionState } from "react";
import messageAction from "@/app/actions/message";

interface MessageInputProps {
  conversationId: number;
}

/**
 * Input et bouton d'envoi d'un message
 * @param conversationId - id de la conversation
 */
export default function MessageInput({ conversationId }: MessageInputProps) {
  const [state, formAction, isPending] = useActionState(messageAction, { error: null });
  return (
    <form className={styles.messageInput} action={formAction}>
      <input type="hidden" value={conversationId} id="conversationId" name="conversationId" />
      <div className={styles.messageInput__wrapper}>
        <label htmlFor="content" className="sr-only">
          Envoyer un message
        </label>
        <input
          className={styles.messageInput__input}
          placeholder="Envoyer un message"
          id="content"
          name="content"
          maxLength={2000}
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="Envoyer votre message"
          disabled={isPending}
          className={styles.messageInput__button}
        >
          <ArrowUpIcon />
        </button>
      </div>
      {state.error && (
        <span className="error__subtitle" role="alert">
          {state.error}
        </span>
      )}
    </form>
  );
}
