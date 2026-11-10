"use client";
import { useActionState } from "react";
import Input from "@/components/UI/Inputs/Input/Input";
import styles from "./LoginForm.module.scss";
import Button from "@/components/UI/Buttons/Button";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: null });

  return (
    <div className={styles.login}>
      <div className={styles.login__titleContainer}>
        <h1 className={styles.login__title}>Heureux de vous revoir</h1>
        <p className={styles.login__subtitle}>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos
          séjours uniques.
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
        <Input
          label="Mot de passe"
          id="password"
          name="password"
          autoComplete="current-password"
          type="password"
          required
        />
        {state.error && (
          <p role="alert" className="error__subtitle">
            {state.error}
          </p>
        )}
        <div className={styles.login__buttonZone}>
          <div className={styles.login__buttonContainer}>
            <Button
              label={isPending ? "Connexion..." : "Se connecter"}
              variant="primary"
              type="submit"
              disabled={isPending}
            />
          </div>
          <div className={styles.login__linksContainer}>
            <Link href="/forgot-password" className={styles.login__link}>
              Mot de passe oublié
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
