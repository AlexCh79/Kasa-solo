import styles from "./RatingCard.module.scss";
import type { Rating } from "@/types/Rating";
import { toLocalDate } from "@/utils/dates";

interface RatingCardProps {
  rating: Rating;
}

/**
 * Carte affichant l'avis d'un utilisateur
 * @param rating - avis de l'utilisateur
 */
export default function RatingCard({ rating }: RatingCardProps) {
  return (
    <article className={styles.ratingCard}>
      <div className={styles.ratingCard__wrapper}>
        <h2 className={styles.ratingCard__user}>
          {rating.user.name} -{" "}
          <time dateTime={rating.createdAt}>{toLocalDate(rating.createdAt)}</time>
        </h2>
        <span className={styles.ratingCard__note}>{rating.score}/5</span>
      </div>
      <p className={styles.ratingCard__comment}>
        {rating.comment ? rating.comment : "Avis sans commentaire"}
      </p>
    </article>
  );
}
