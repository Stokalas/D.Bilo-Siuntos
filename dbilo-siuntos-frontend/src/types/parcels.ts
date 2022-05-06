import { Address } from './address';
import { ParcelSize } from './parcelSize';

export interface Parcel {
  id: number;
  trackingNumber: string;
  size: ParcelSize;
  shipperID: number;
  shipmentDate: string;
  shippingAddress: Address | null;
  deliveryDate: string;
  deliveryAddress: Address | null;
}
