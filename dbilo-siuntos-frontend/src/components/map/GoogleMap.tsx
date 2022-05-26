import React, { useState, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Paper } from '@mui/material';

import { Marker } from './Marker';
import { MapComponent } from './MapComponent';
import { api } from 'src/api';
import { Terminal } from 'src/types';

const apiKey = process.env.REACT_APP_MAPS_API_KEY!;

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MarkerProps {
  position: google.maps.LatLng;
  label: string;
}

interface Location {
  position: google.maps.LatLngLiteral;
  label: string;
  address: string;
}

interface GoogleMapProps {
  zoom?: number;
  center?: google.maps.LatLngLiteral;
  markers?: Location[];
  minHeight?: string;
}

export const GoogleMap: React.VFC<GoogleMapProps> = ({ zoom, center, minHeight }) => {
  const [stateMarkers, setMarkers] = useState<MarkerProps[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
  const [status, setStatus] = useState(Status.LOADING);

  useEffect(() => {
    //TODO handle error
    if (status === Status.SUCCESS) {
      api.get<Array<Terminal>>('terminal/all', {}, true).then((response) => {
        setMarkers(
          response.map((t) => {
            return {
              label: `${t.name}, ${t.address.addressLine1}, ${t.address.postalCode}`,
              position: new google.maps.LatLng({
                lat: t.address.latitude!,
                lng: t.address.longitude!,
              }),
            };
          })
        );
      });
    }
  }, [status]);

  const defaultZoom = 7;
  const defaultCenter = {
    lat: 55,
    lng: 24,
  };

  const onClick = (_: google.maps.MapMouseEvent) => {
    // example of how to add markers
    // setMarkers([...markers, { position: e.latLng!, label: 'e.latLng!' }]);
    infoWindow?.close();
  };

  const onCallBack = (status: Status) => {
    setStatus(status);
  };

  return (
    <Paper sx={{ display: 'flex', height: '100%', minHeight }}>
      <Wrapper callback={onCallBack} apiKey={apiKey} render={render}>
        <MapComponent
          center={center ?? defaultCenter}
          onClick={onClick}
          zoom={zoom ?? defaultZoom}
          infoWindow={infoWindow}
          setInfoWindow={setInfoWindow}
          style={{ flexGrow: '1', height: '100%' }}
        >
          {stateMarkers.map((latLng, i) => (
            <Marker key={i} position={latLng.position} name={latLng.label} />
          ))}
        </MapComponent>
      </Wrapper>
    </Paper>
  );
};
