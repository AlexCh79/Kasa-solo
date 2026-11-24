"use client";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import { useActionState } from "react";
import Input from "@/components/UI/Inputs/Input/Input";
import Button from "@/components/UI/Buttons/Button";
import { resetAction } from "@/app/actions/auth";

interface ResetPasswordFormProps {
  token: string;
}

/**
 * Formulaire de réinitialisation du mot de passe
 */
export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(resetAction, { error: null });
  return (
    <div className={styles.login}>
      <div className={styles.login__titleContainer}>
        <h1 className={styles.login__title}>On y est presque !</h1>
        <p className={styles.login__subtitle}>
          Plus qu&apos;une étape pour récupérer votre compte Kasa. Veuillez renseigner un nouveau
          mot de passe.
        </p>
      </div>
      <form className={styles.login__inputContainer} action={formAction}>
        <Input
          label="Votre nouveau mot de passe"
          id="password"
          name="password"
          autoComplete="new-password"
          type="password"
          required
          hint="6 caractères minimum"
          minLength={6}
        />
        <input type="hidden" name="token" id="token" value={token} />
        {state.error && (
          <span className="error__subtitle" role="alert">
            {state.error}
          </span>
        )}
        <div className={styles.login__buttonZone}>
          <div className={styles.login__buttonContainer}>
            <Button
              label={isPending ? "Validation..." : "Valider"}
              variant="primary"
              type="submit"
              disabled={isPending}
            />
          </div>
          <div className={styles.login__linksContainer}>
            {state.error && (
              <Link href="/forgot-password" className="error__link">
                Faire une nouvelle demande
              </Link>
            )}
            <Link href="/login" className={styles.login__link}>
              Retour au formulaire de connexion
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
