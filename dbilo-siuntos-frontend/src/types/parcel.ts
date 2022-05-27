import { Address } from './address';
import { ParcelSize } from './parcelSize';
import { RecipientDetails } from './recipientDetails';
import { Status } from './status';
import { Terminal } from './terminal';
import { User } from './user';

export interface Parcel {
  id: number;
  trackingNumber: string;
  size: ParcelSize;
  shipperDetails: RecipientDetails;
  receiverDetails: RecipientDetails;
  shipper?: User;
  pickupAddress?: Address;
  deliveryAddress?: Address;
  status: Status[];
  pickupTerminal?: Terminal;
  deliveryTerminal?: Terminal;
  rowVersion: string;
}
