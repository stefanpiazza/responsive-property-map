import styles from "./Cards.module.scss";
import cx from "classnames";

import React, { useRef, useEffect, useState } from "react";
import Card from "../Card";
import { Listing } from "../../shared/types";
import isElementInView from "../../utils/isElementInView";

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
  const cardsListClassName = cx([
    styles["cards__list"],
    activeListingId == -1 ? styles["is-hidden"] : null,
  ]);

  const cardsListRef = useRef<HTMLUListElement>(null);

  const [, setIsInteracting] = useState(false);

  useEffect(() => {
    const { current } = cardsListRef;

    const activeListItem = current.childNodes[
      listings.findIndex((listing) => listing.id === activeListingId)
    ] as HTMLLIElement;

    if (activeListItem) {
      if (!isElementInView(activeListItem)) {
        activeListItem.scrollIntoView();
      }
    }
  }, [activeListingId]);

  return (
    <div className={styles["cards"]}>
      <div className={styles["cards__wrapper"]}>
        <ul
          className={cardsListClassName}
          ref={cardsListRef}
          onMouseDown={() => {
            setIsInteracting(true);
          }}
          onMouseUp={() => {
            setIsInteracting(false);
          }}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
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
