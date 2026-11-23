import styles from "./Tags.module.scss";
import { CrossIcon } from "../Icons/Icons";

interface TagProps {
  label: string;
  edit?: boolean;
  onClick?: () => void;
}

/**
 * Tag pour afficher et supprimer les spécificités d'un logement
 * @param label - Texte à afficher sur le tag
 * @param edit - true si le tag doit être supprimable
 * @param onClick - facultatif, fonction de retrait d'un tag
 */
export default function Tag({ label, edit, onClick }: TagProps) {
  return (
    <div className={styles.tag}>
      <span className={styles.tag__label}>{label}</span>
      {edit && (
        <button
          type="button"
          className={styles.tag__button}
          onClick={onClick}
          aria-label={`Supprimer le tag ${label}`}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
}
