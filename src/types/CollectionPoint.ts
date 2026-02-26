export interface CollectionPoint {
  id: string;
  type: 'coleta' | 'abrigo';
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
  hasCollectionRoute?: boolean;
}
