import { Address } from './address';
import { ParcelStatus } from './parcelStatus';
import { Terminal } from './terminal';

export interface Status {
  id: number;
  parcelStatus: ParcelStatus;
  parcelTrackingNumber: string;
  date: string;
  address?: Address;
  terminal?: Terminal;
}
