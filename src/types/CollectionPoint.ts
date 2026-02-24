export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  acceptedItems: string[];
  notes: string;
}
