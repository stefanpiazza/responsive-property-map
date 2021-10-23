import type { NextPage } from "next";
import React, { useState } from "react";
import { Listing } from "../shared/types";
import getListings from "../utils/getListings";
import Grid from "../components/Grid";
import Header from "../components/Header";
import Map from "../components/Map";
import Cards from "../components/Cards";

const Home: NextPage = () => {
  const [activeListingId, setActiveListingId] = useState<number>(-1);
  const [hoverListingId, setHoverListingId] = useState<number>(-1);

  const defaultListings: Listing[] = getListings();

  const [listings, setListings] = useState(defaultListings);

  return (
    <Grid>
      <Header listings={listings} />
      <Map
        listings={listings}
        setListings={setListings}
        activeListingId={activeListingId}
        setActiveListingId={setActiveListingId}
        hoverListingId={hoverListingId}
        setHoverListingId={setHoverListingId}
      />
      <Cards
        listings={listings}
        activeListingId={activeListingId}
        setActiveListingId={setActiveListingId}
        hoverListingId={hoverListingId}
        setHoverListingId={setHoverListingId}
      />
    </Grid>
  );
};

export default Home;
