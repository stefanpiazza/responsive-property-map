import styles from "./Cards.module.scss";
import cx from "classnames";

import React, { useRef, useEffect } from "react";
import { Listing } from "../../shared/types";
import isElementInView from "../../utils/isElementInView";
import Card from "../Card";

type CardsProps = {
  listings: Listing[];
  activeListingId: number;
  setActiveListingId: (activeListingId: number) => void;
  hoverListingId: number;
  setHoverListingId: (hoverListingId: number) => void;
};

const Cards = ({
  listings,
  activeListingId,
  setActiveListingId,
  hoverListingId,
  setHoverListingId,
}: CardsProps) => {
  const cardsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const { current } = cardsListRef;

    if (current) {
      const activeListItem = current.childNodes[
        listings.findIndex((listing) => listing.id === activeListingId)
      ] as HTMLLIElement;

      if (activeListItem) {
        if (!isElementInView(activeListItem)) {
          activeListItem.scrollIntoView();
        }
      }
    }
  }, [activeListingId]);

  const cardsListClassName = cx([
    styles["cards__list"],
    activeListingId == -1 ? styles["is-hidden"] : null,
  ]);

  return (
    <div className={styles["cards"]}>
      <div className={styles["cards__wrapper"]}>
        <ul className={cardsListClassName} ref={cardsListRef}>
          {listings.map((listing, index) => {
            const { id } = listing;

            const isActive = id === activeListingId;
            const isHover = id === hoverListingId;

            return (
              <li className={styles["cards__list-item"]} key={index}>
                <Card
                  isActive={isActive}
                  isHover={isHover}
                  listing={listing}
                  onClick={() => setActiveListingId(id)}
                  onMouseEnter={() => setHoverListingId(id)}
                  onMouseLeave={() => setHoverListingId(-1)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cards;
