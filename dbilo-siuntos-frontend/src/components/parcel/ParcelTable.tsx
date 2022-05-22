import React from 'react';
import {
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

import { Parcel, ParcelSize } from 'src/types';

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
  const delTemp = parcel.deliveryAddress;
  const shipTemp = parcel.shippingAddress;
  const deliveryAddress =
    delTemp?.addressLine1 +
    ' ' +
    delTemp?.addressLine2 +
    ', ' +
    delTemp?.city +
    ', ' +
    delTemp?.postalCode;

  const shippingAddress =
    shipTemp?.addressLine1 +
    ' ' +
    shipTemp?.addressLine2 +
    ', ' +
    shipTemp?.city +
    ', ' +
    shipTemp?.postalCode;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="parcel table">
        <TableBody>
          {createParcelRow('status', 'Parcel Status', 'Mock Status')}
          {createParcelRow('trackingNumber', 'Tracking Number', parcel.trackingNumber)}
          {createParcelRow('size', 'Size', ParcelSize[parcel.size])}
          {createParcelRow('shippingAddress', 'Shipping Address', shippingAddress)}
          {createParcelRow('currentLocation', 'Current Location', 'Mock Address')}
          {createParcelRow('deliveryAddress', 'Delivery Address', deliveryAddress)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
