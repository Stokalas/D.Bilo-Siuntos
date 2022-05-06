import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import { api } from 'src/api';
import { Parcel } from 'src/types';
import { ParcelTable } from '../components/parcel';
import { GoogleMap } from 'src/components/map/';

const mockParcelLocation = {
  label: 'Vilnius Parcel Terminal',
  position: { lat: 54.69, lng: 25.28 },
  address: 'Vilnius, Lithuania',
};

export const ParcelPage: React.FC = () => {
  const [parcel, setParcel] = useState<Parcel>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { state }: { state: any } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (state?.parcel) {
        setParcel(state.parcel as Parcel);
      } else {
        setLoading(true);
        try {
          const response = await api.get<Array<Parcel>>(`parcel/${id}`);
          if (response.length !== 0) {
            setError(false);
            setParcel(response[0]);
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
  }, [state?.parcel, id]);

  return (
    <Container maxWidth="lg">
      <Grid rowSpacing={3} columnSpacing={1} container marginBottom="300px">
        <Grid item xs={12} marginTop="25px">
          <Typography
            borderTop="1px solid lightgrey"
            borderBottom="1px solid lightgrey"
            fontSize="32px"
          >
            Tracking (Tracking number: {id})
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
                center={mockParcelLocation.position}
                markers={[mockParcelLocation]}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography fontSize="20px">
            {error &&
              !loading &&
              `Failed to load parcel with tracking number ${id} or no such parcel exists`}
            {loading && 'Loading'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
