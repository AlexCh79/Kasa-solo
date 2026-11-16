"use client";
import { updateAction } from "@/app/actions/auth";
import styles from "./Profile.module.scss";
import { useActionState } from "react";
import Input from "@/components/UI/Inputs/Input/Input";
import Button from "@/components/UI/Buttons/Button";
import SelectInput from "@/components/UI/Inputs/SelectInput/SelectInput";
import type { UserData, UserRole } from "@/types/User";
import Image from "next/image";

interface ProfileProps {
  user: UserData;
}

export default function Profile({ user }: ProfileProps) {
  const [state, formAction, isPending] = useActionState(updateAction, { error: null });
  const roleList: UserRole[] = ["client", "owner"];

  return (
    <div className={styles.profile}>
      <div className={styles.profile__titleContainer}>
        <h1 className={styles.profile__title}>Vos informations</h1>
        <p className={styles.profile__subtitle}>Mettez vos informations à jour.</p>
      </div>
      <form className={styles.profile__inputContainer} action={formAction}>
        <Input
          label="Votre prénom et nom"
          id="name"
          name="name"
          required
          defaultValue={state.values?.name ?? user.name}
        />
        {user.role === "owner" && (
          <Input label="Photo de profil" id="picture" type="file" name="picture" accept="image/*" />
        )}
        {user.picture && (
          <div className={styles.profile__coverWrapper}>
            <Image
              src={user.picture}
              width={100}
              height={100}
              preload
              alt="Votre photo de profil"
              className={styles.profile__cover}
            />
          </div>
        )}
        <SelectInput
          label="Rôle"
          id="role"
          name="role"
          options={roleList}
          defaultValue={user.role}
        />
        {state.error && (
          <p role="alert" className="error__subtitle">
            {state.error}
          </p>
        )}
        <div className={styles.profile__buttonZone}>
          <div className={styles.profile__buttonContainer}>
            <Button
              label={isPending ? "Mise à jour..." : "Valider la mise à jour"}
              variant="primary"
              type="submit"
              disabled={isPending}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
