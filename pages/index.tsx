import type { NextPage } from "next";
import {
  GoogleMap,
  Marker as GoogleMarker,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Property for sale in Oxford</h1>
        <p className="header__subtitle">123 Results</p>
      </div>
    </div>
  );
};

type MarkerProps = {
  isActive: boolean;
  isHover: boolean;
  position: {
    lat: number;
    lng: number;
  };
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
};

const Marker = ({
  isActive,
  isHover,
  position,
  onClick,
  onMouseOver,
  onMouseOut,
}: MarkerProps) => {
  const markerIconColor = isHover ? "3FCFDC" : "DC4C3F";

  const markerIconURL = isActive
    ? `https://cdn.mapmarker.io/api/v1/font-awesome/v4/icon-stack?size=50&color=${markerIconColor}&icon=fa-star&hoffset=1&voffset=-1`
    : `https://cdn.mapmarker.io/api/v1/font-awesome/v4/icon?icon=fa-star&size=50&color=${markerIconColor}`;

  return (
    <GoogleMarker
      position={position}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      icon={{
        url: markerIconURL,
      }}
    />
  );
};

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
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="google-map"
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
                onMouseOut={() => setHoverListingId(-1)}
              />
            );
          })}
        </GoogleMap>
      ) : (
        <p>Loading...</p>
      )}
      <div className="map__menu">
        <button className="map__menu__button">Menu</button>
      </div>
    </div>
  );
};

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
        activeListItem.scrollIntoView();
      }
    }
  }, [activeListingId]);

  return (
    <div className="cards">
      <div className="cards__wrapper">
        <ul className="cards__list" ref={cardsListRef}>
          {listings.map((listing, index) => {
            const { id } = listing;

            let className = "card";

            if (id == activeListingId) {
              className = `${className} is-active`;
            }

            if (id == hoverListingId) {
              className = `${className} is-hover`;
            }

            return (
              <li className="cards__list-item" key={index}>
                <div
                  className={className}
                  onClick={() => {
                    setActiveListingId(id);
                  }}
                  onMouseEnter={() => setHoverListingId(id)}
                  onMouseLeave={() => setHoverListingId(-1)}
                >
                  <div className="card__image"></div>
                  <div className="card__content">
                    <div className="card__title">123 Fake Street</div>
                    <div className="card__details">
                      <ul className="card__details__list">
                        <li className="card__details__list-item">1</li>
                        <li className="card__details__list-item">2</li>
                        <li className="card__details__list-item">3</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

type Listing = {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
};

const getListings = () => {
  return [
    {
      id: 1,
      position: {
        lat: 37.772,
        lng: -122.214,
      },
    },
    {
      id: 2,
      position: {
        lat: 37.672,
        lng: -122.214,
      },
    },
    {
      id: 3,
      position: {
        lat: 37.572,
        lng: -122.214,
      },
    },
    {
      id: 4,
      position: {
        lat: 37.472,
        lng: -122.214,
      },
    },
  ];
};

const Home: NextPage = () => {
  const [activeListingId, setActiveListingId] = useState<number>(-1);
  const [hoverListingId, setHoverListingId] = useState<number>(-1);

  const defaultListings: Listing[] = getListings();

  const [listings, setListings] = useState(defaultListings);

  return (
    <div className="grid">
      <Header />
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
    </div>
  );
};

export default Home;
