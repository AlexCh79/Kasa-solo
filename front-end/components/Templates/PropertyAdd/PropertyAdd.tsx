"use client";
import styles from "./PropertyAdd.module.scss";
import Button from "@/components/UI/Buttons/Button";
import { ArrowLeftIcon } from "@/components/UI/Icons/Icons";
import { useActionState, useRef, useState } from "react";
import propertyAction from "@/app/actions/property";
import Input from "@/components/UI/Inputs/Input/Input";
import TextArea from "@/components/UI/Inputs/TextArea/TextArea";
import InputButton from "@/components/UI/Inputs/InputButton/InputButton";
import { UserData } from "@/types/User";
import CheckBox from "@/components/UI/Inputs/CheckBox/CheckBox";
import { equipments } from "@/data/equipments";
import { tags } from "@/data/tags";
import Tag from "@/components/UI/Tags/Tags";
import { InputTag } from "@/components/UI/Inputs/InputButton/InputTag";
import Image from "next/image";

interface PropertyAddProps {
  user: UserData;
}

/**
 * Formulaire d'ajout d'un logement
 * @param user - Utilisateur connecté
 */
export default function PropertyAdd({ user }: PropertyAddProps) {
  const [state, formAction, isPending] = useActionState(propertyAction, { error: null });
  const [tagList, setTagList] = useState<string[]>(tags.map((tag) => tag.label));
  const [pictureFields, setPictureFields] = useState<number[]>([0]);
  const nextFieldId = useRef(1);

  // Ajout d'un tag
  function addTag(tag: string) {
    if (!tagList.includes(tag)) setTagList([...tagList, tag]);
  }

  // Retrait d'un tag
  function removeTag(tag: string) {
    setTagList(tagList.filter((t) => t !== tag));
  }

  // Ajout d'un champ supplémentaire au clic sur "+ Ajouter..."
  function addPictureField() {
    setPictureFields([...pictureFields, nextFieldId.current]);
    nextFieldId.current += 1;
  }

  return (
    <section className={styles.add}>
      <div className={styles.add__returnContainer}>
        <div className={styles.add__return}>
          <Button
            href="/properties"
            label="Retour aux annonces"
            variant="secondary"
            icon={<ArrowLeftIcon />}
          />
        </div>
      </div>
      <form className={styles.form} action={formAction}>
        <div className={styles.form__wrapper}>
          <h1 className={styles.form__title}>Ajouter une propriété</h1>
          <div className={styles.form__button}>
            <Button
              type="submit"
              label={isPending ? "Ajout..." : "Ajouter"}
              variant="primary"
              disabled={isPending}
            />
          </div>
        </div>
        <div className={styles.form__grid}>
          <div className={`${styles.form__container} ${styles.form__property}`}>
            {state.error && (
              <span role="alert" className="invite">
                {state.error}
              </span>
            )}
            <Input
              label="Titre de la propriété"
              id="title"
              name="title"
              placeholder="Ex: Appartement cosy au coeur de Paris"
              required
            />
            <TextArea
              label="Description"
              id="description"
              name="description"
              placeholder="Décrivez votre propriété en détail..."
            />
            <Input
              label="Tarif de la nuitée"
              type="number"
              id="price"
              name="price"
              min={1}
              step={1}
              required
            />
            <Input label="Localisation" id="location" name="location" />
          </div>
          <div className={`${styles.form__container} ${styles.form__cover}`}>
            <InputButton
              label="Image de couverture"
              accept="image/jpeg, image/png, image/webp"
              id="cover"
              name="cover"
            />
            {pictureFields.map((fieldId, index) => (
              <InputButton
                key={fieldId}
                label={index >= 1 ? `Image du logement ${index + 1}` : "Image du logement"}
                accept="image/jpeg, image/png ,image/webp"
                id={`picture-${fieldId}`}
                name="pictures"
              />
            ))}
            <button
              id="morePictures"
              onClick={addPictureField}
              className={styles.form__addInput}
              type="button"
            >
              + Ajouter une image
            </button>
          </div>
          <div className={`${styles.form__container} ${styles.form__host}`}>
            <Input label="Nom de l'hôte" name="hostName" id="hostName" defaultValue={user.name} />
            {user.picture && (
              <div className={styles.form__hostPictureWrapper}>
                <Image
                  src={user.picture}
                  width={100}
                  height={100}
                  className={styles.form__hostPicture}
                  alt="Votre photo de profil actuelle"
                />
              </div>
            )}
            <InputButton
              accept="image/jpeg, image/png, image/webp"
              label="Photo de profil"
              name="hostCover"
              id="hostCover"
            />
          </div>
          <div className={`${styles.form__container} ${styles.form__equipments}`}>
            <fieldset id="equipments" className={styles.form__equipGrid}>
              <legend className={styles.form__label}>Équipements</legend>
              {equipments.map((equip) => (
                <CheckBox
                  label={equip.label}
                  key={equip.value}
                  id={`equip-${equip.value}`}
                  name="equipments"
                  value={equip.label}
                />
              ))}
            </fieldset>
          </div>
          <div className={`${styles.form__container} ${styles.form__tags}`}>
            <fieldset id="tags" className={styles.form__tagsList}>
              <legend className={styles.form__label}>Catégories</legend>
              {tagList.map((tag) => (
                <div key={tag}>
                  <Tag label={tag} edit onClick={() => removeTag(tag)} />
                  <input type="hidden" name="tags" value={tag} />
                </div>
              ))}
            </fieldset>
            <InputTag
              id="newTag"
              label="Ajouter une catégorie personnalisée"
              placeholder="Nouveau tag"
              onAdd={addTag}
            />
          </div>
        </div>
      </form>
    </section>
  );
}
