import styles from "./Map.module.scss";

import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Listing } from "../../shared/types";
import getListings from "../../utils/getListings";
import Marker from "../Marker/Marker";

type MapProps = {
  listings: Listing[];
  setListings;
  activeListingId: number;
  setActiveListingId: (activeListingId: number) => void;
  hoverListingId: number;
  setHoverListingId: (hoverListingId: number) => void;
};

const Map = ({
  listings,
  setListings,
  activeListingId,
  setActiveListingId,
  hoverListingId,
  setHoverListingId,
}: MapProps) => {
  const [map, setMap] = useState<google.maps.Map>();

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onDragEnd = () => {
    setListings(
      getListings().filter((listing) => {
        return map?.getBounds()?.contains(listing.position);
      })
    );
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
  });

  useEffect(() => {
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach((listing) => {
        const { position } = listing;

        bounds.extend(position);

        map?.fitBounds(bounds);
      });
    }
  }, [map]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <div className={styles["map"]}>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={styles["google-map"]}
          onLoad={onLoad}
          onDragEnd={onDragEnd}
          onZoomChanged={onDragEnd}
          options={{ disableDefaultUI: true }}
        >
          {listings.map((listing, index) => {
            const { position, id } = listing;

            const isActive = id === activeListingId;
            const isHover = id === hoverListingId;

            return (
              <Marker
                key={index}
                isActive={isActive}
                isHover={isHover}
                position={position}
                onClick={() => setActiveListingId(id)}
                onMouseOver={() => setHoverListingId(id)}
                onMouseLeave={() => setHoverListingId(-1)}
              />
            );
          })}
        </GoogleMap>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Map;
