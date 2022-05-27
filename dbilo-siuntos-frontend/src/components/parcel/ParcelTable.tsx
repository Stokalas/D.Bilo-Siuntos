import React, { useEffect, useState } from 'react';
import {
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { orderBy } from 'lodash';

import { Parcel, ParcelSize } from 'src/types';
import { getAddressString, getTerminalString } from 'src/utility/addressUtils';
import { ParcelStatus } from 'src/types/parcelStatus';

const createParcelRow = (key: string, name: string, value: any) => (
  <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell component="th" scope="row">
      <Typography>{name}</Typography>
    </TableCell>
    <TableCell component="th" scope="row">
      <Typography>{value}</Typography>
    </TableCell>
  </TableRow>
);

interface ParcelTableProps {
  parcel: Parcel;
}

export const ParcelTable: React.FC<ParcelTableProps> = ({ parcel }) => {
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    setDeliveryLocation(
      parcel.deliveryAddress
        ? getAddressString(parcel.deliveryAddress)
        : getTerminalString(parcel.deliveryTerminal!)
    );
    setPickupLocation(
      parcel.pickupAddress
        ? getAddressString(parcel.pickupAddress)
        : getTerminalString(parcel.pickupTerminal!)
    );
    const newestStatus = orderBy(parcel.status, 'date', 'asc')[0]!;
    setCurrentLocation(
      newestStatus.address
        ? getAddressString(newestStatus.address)
        : getTerminalString(newestStatus.terminal!)
    );
    setCurrentStatus(ParcelStatus[newestStatus.parcelStatus]);
  }, [parcel]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="parcel table">
        <TableBody>
          {createParcelRow('status', 'Parcel Status', currentStatus)}
          {createParcelRow('trackingNumber', 'Tracking Number', parcel.trackingNumber)}
          {createParcelRow('size', 'Size', ParcelSize[parcel.size])}
          {createParcelRow(
            'shipper',
            'Shipper',
            `${parcel.shipperDetails.firstName} ${parcel.shipperDetails.lastName}`
          )}
          {createParcelRow('pickupAddress', 'Pickup Address', pickupLocation)}
          {createParcelRow('currentLocation', 'Current Location', currentLocation)}
          {createParcelRow('deliveryAddress', 'Delivery Address', deliveryLocation)}
          {createParcelRow(
            'receiver',
            'Receiver',
            `${parcel.receiverDetails.firstName} ${parcel.receiverDetails.lastName}`
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
