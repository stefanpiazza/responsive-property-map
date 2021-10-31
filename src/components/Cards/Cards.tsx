import styles from "./Cards.module.scss";
import cx from "classnames";

import React, { useRef, useEffect, useCallback, useState } from "react";
import Card from "../Card";
import { Listing } from "../../shared/types";
import isElementInView from "../../utils/isElementInView";
import useWindowSize from "../../hooks/useWindowSize";
import useOnScreen from "../../hooks/useOnScreen";
import useIsScrolling from "../../hooks/useIsScrolling";

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
  const cardsListItemRef = useRef<Array<HTMLLIElement>>([]);

  const entry = useOnScreen(cardsListItemRef, { threshold: 0.6 });

  const { width } = useWindowSize();
  const isMobileView = useCallback(() => {
    return width < 768;
  }, [width]);

  useEffect(() => {
    const { current } = cardsListRef;

    if (!current || !entry) {
      return;
    }

    if (
      activeListingId ==
      parseInt((entry.target as HTMLElement).dataset.listingId, 10)
    ) {
      return;
    }

    const activeListItem = current.childNodes[
      listings.findIndex((listing) => listing.id === activeListingId)
    ] as HTMLLIElement;

    if (!activeListItem) {
      return;
    }

    if (!isElementInView(activeListItem)) {
      activeListItem.scrollIntoView();
    }
  }, [activeListingId]);

  useEffect(() => {
    if (!isMobileView() || !entry) {
      return;
    }

    if (entry.isIntersecting) {
      setActiveListingId(
        parseInt((entry.target as HTMLElement).dataset.listingId, 10)
      );
    }
  }, [entry, isMobileView]);

  return (
    <div className={styles["cards"]}>
      <div className={styles["cards__wrapper"]}>
        <ul className={cardsListClassName} ref={cardsListRef}>
          {listings.map((listing, index) => {
            const { id } = listing;

            const isActive = id === activeListingId;
            const isHover = id === hoverListingId;

            return (
              <li
                className={styles["cards__list-item"]}
                key={index}
                ref={(element) => {
                  cardsListItemRef.current[index] = element;
                }}
                data-listing-id={id}
              >
                <Card
                  isActive={isActive}
                  isHover={isHover}
                  listing={listing}
                  onClick={() => setActiveListingId(id)}
                  onMouseOver={() => setHoverListingId(id)}
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
