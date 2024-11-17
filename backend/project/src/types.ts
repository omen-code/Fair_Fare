export interface RideOption {
  provider: 'Uber' | 'Ola' | 'Rapido';
  price: number;
  eta: number;
  type: 'Auto' | 'Bike' | 'Mini' | 'XL';
  capacity: number;
  available: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'other';
}

export interface User {
  name: string;
  email: string;
  savedLocations: Location[];
  recentRides: {
    date: string;
    from: string;
    to: string;
    provider: string;
    price: number;
  }[];
}