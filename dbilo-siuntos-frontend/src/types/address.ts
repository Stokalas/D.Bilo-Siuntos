export interface Address {
  id: number;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}
