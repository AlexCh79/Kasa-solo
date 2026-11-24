"use client";
import Input from "@/components/UI/Inputs/Input/Input";
import Button from "@/components/UI/Buttons/Button";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import { useActionState } from "react";
import { forgotAction } from "@/app/actions/auth";

/**
 * Formulaire de demande d'un lien pour un nouveau mot de passe
 * Le développement du back-end pour l'envoi d'email n'est pas terminé, il s'agit donc de préparer le formulaire prêt à l'emploi
 */
export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotAction, { error: null });
  return (
    <div className={styles.login}>
      <div className={styles.login__titleContainer}>
        <h1 className={styles.login__title}>Un trou de mémoire ?</h1>
        <p className={styles.login__subtitle}>
          Vous avez perdu votre mot de passe ? Pas de panique, renseignez votre adresse email et
          nous vous enverrons un lien sécurisé pour le réinitialiser.
        </p>
      </div>
      <form className={styles.login__inputContainer} action={formAction}>
        <Input
          label="Adresse email"
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          required
        />
        <span className="invite">
          Module en cours de développement. Aucun email ne sera envoyé pour le moment, vous passerez
          directement à la page de réinitialisation du mot de passe.
        </span>
        {state.error && (
          <span className="error__subtitle" role="alert">
            {state.error}
          </span>
        )}
        <div className={styles.login__buttonZone}>
          <div className={styles.login__buttonContainer}>
            <Button
              label={isPending ? "Envoi..." : "Envoyer"}
              variant="primary"
              type="submit"
              disabled={isPending}
            />
          </div>
          <div className={styles.login__linksContainer}>
            <Link href="/login" className={styles.login__link}>
              Retour au formulaire de connexion
            </Link>
            <p className={styles.login__linkSubtitle}>
              Pas encore de compte ?{" "}
              <Link href="/register" className={styles.login__link}>
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
