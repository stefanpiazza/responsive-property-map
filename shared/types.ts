export type Listing = {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  address: string;
  price: string;
};
