"use client";
import { useActionState } from "react";
import Input from "@/components/UI/Inputs/Input/Input";
import styles from "./RegisterForm.module.scss";
import Button from "@/components/UI/Buttons/Button";
import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import CheckBox from "@/components/UI/Inputs/CheckBox/CheckBox";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, { error: null });

  return (
    <div className={styles.register}>
      <div className={styles.register__titleContainer}>
        <h1 className={styles.register__title}>Rejoignez la communauté Kasa</h1>
        <p className={styles.register__subtitle}>
          Créez votre compte et commencez à voyager autrement : réservez des logements uniques,
          découvrez de nouvelles destinations et partagez vos propres lieux avec d&apos;autres
          voyageurs.
        </p>
      </div>
      <form className={styles.register__inputContainer} action={formAction}>
        <Input
          label="Nom"
          id="lastName"
          name="lastName"
          autoComplete="family-name"
          required
          defaultValue={state.values?.lastName}
        />
        <Input
          label="Prénom"
          id="firstName"
          name="firstName"
          autoComplete="given-name"
          required
          defaultValue={state.values?.firstName}
        />
        <Input
          label="Adresse email"
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          required
          defaultValue={state.values?.email}
        />
        <Input
          label="Mot de passe"
          id="password"
          name="password"
          autoComplete="new-password"
          type="password"
          minLength={6}
          hint="6 caractères minimum"
          required
        />
        <div className={styles.register__cguWrapper}>
          <CheckBox
            label="J'accepte les conditions générales d'utilisation"
            id="cgu"
            name="cgu"
            defaultChecked={false}
            required
          />
        </div>
        {state.error && (
          <p role="alert" className="error__subtitle">
            {state.error}
          </p>
        )}
        <div className={styles.register__buttonZone}>
          <div className={styles.register__buttonContainer}>
            <Button
              label={isPending ? "Inscription..." : "S'inscrire"}
              variant="primary"
              type="submit"
              disabled={isPending}
            />
          </div>
          <div className={styles.register__linksContainer}>
            <p className={styles.register__linkSubtitle}>
              Déjà membre ?{" "}
              <Link href="/login" className={styles.register__link}>
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
