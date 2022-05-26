import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { orderBy } from 'lodash';

import { api } from 'src/api';
import { Parcel } from 'src/types';
import { ParcelTable } from '../components/parcel';
import { GoogleMap } from 'src/components/map/';
import { getAddressString } from 'src/utility/addressUtils';

// const mockParcelLocation = {
//   label: 'Vilnius Parcel Terminal',
//   position: { lat: 54.69, lng: 25.28 },
//   address: 'Vilnius, Lithuania',
// };

const createMarker = (parcel: Parcel) => {
  const newestStatus = orderBy(parcel.status, 'date', 'asc')[0]!;
  const currentAddress = newestStatus.address ?? newestStatus.terminal!.address;
  //if there is no status error
  //for now assume there is always
  const position = { lat: currentAddress.latitude!, lng: currentAddress.longitude! };
  const label = newestStatus.terminal?.name ?? '';
  const address = getAddressString(currentAddress);
  return { label, position, address };
};

export const ParcelPage: React.FC = () => {
  const [parcel, setParcel] = useState<Parcel>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { trackingNumber } = useParams();
  const { state }: { state: any } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (state?.parcel) {
        setParcel(state.parcel as Parcel);
      } else {
        setLoading(true);
        try {
          const response = await api.get<Parcel>(`parcel/${trackingNumber}`);
          if (response) {
            setError(false);
            setParcel(response);
          } else {
            setError(true);
          }
        } catch (e) {
          setError(true);
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [state?.parcel, trackingNumber]);

  return (
    <Container maxWidth="lg">
      <Grid rowSpacing={3} columnSpacing={1} container marginBottom="300px">
        <Grid item xs={12} marginTop="25px">
          <Typography
            borderTop="1px solid lightgrey"
            borderBottom="1px solid lightgrey"
            fontSize="32px"
          >
            Parcel Tracking
          </Typography>
        </Grid>
        {parcel && (
          <>
            <Grid item xs={12} md={6}>
              <ParcelTable parcel={parcel} />
            </Grid>
            <Grid item xs={12} md={6}>
              <GoogleMap
                zoom={13}
                center={createMarker(parcel).position}
                markers={[createMarker(parcel)]}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography fontSize="20px">
            {error &&
              !loading &&
              `Failed to load parcel with tracking number ${trackingNumber} or no such parcel exists`}
            {loading && 'Loading'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
