import styles from "./Card.module.scss";
import cx from "classnames";

import { Listing } from "../../shared/types";

type CardProps = {
  isActive: boolean;
  isHover: boolean;
  listing: Listing;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const Card = ({
  isActive,
  isHover,
  listing,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CardProps) => {
  const { title, address, price } = listing;

  const className = cx([
    styles["card"],
    isActive ? styles["is-active"] : null,
    isHover ? styles["is-hover"] : null,
  ]);

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles["card__image"]}></div>
      <div className={styles["card__content"]}>
        <p className={styles["card__title"]}>{title}</p>
        <p className={styles["card__address"]}>{address}</p>
        <p className={styles["card__price"]}>{price}</p>
        <div className={styles["card__details"]}>
          <ul className={styles["card__details__list"]}>
            <li className={styles["card__details__list-item"]}>1</li>
            <li className={styles["card__details__list-item"]}>2</li>
            <li className={styles["card__details__list-item"]}>3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
