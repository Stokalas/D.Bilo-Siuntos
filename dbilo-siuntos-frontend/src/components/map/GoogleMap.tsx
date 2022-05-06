import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Paper } from '@mui/material';

import { Marker } from './Marker';
import { MapComponent } from './MapComponent';

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

const exampleParcelTerminalMarkers = [
  {
    label: 'Vilnius Parcel Terminal',
    position: { lat: 54.68, lng: 25.28 },
    address: 'Vilnius, Lithuania',
  },
  {
    label: 'Kaunas Parcel Terminal',
    position: { lat: 54.91, lng: 23.89 },
    address: 'Kaunas, Lithuania',
  },
  {
    label: 'Klaipeda Parcel Terminal',
    position: { lat: 55.72, lng: 21.12 },
    address: 'Klaipeda, Lithuania',
  },
];

interface GoogleMapProps {
  zoom?: number;
  center?: google.maps.LatLngLiteral;
  markers?: Location[];
  minHeight?: string;
}

export const GoogleMap: React.VFC<GoogleMapProps> = ({ zoom, center, markers, minHeight }) => {
  const [stateMarkers, setMarkers] = React.useState<MarkerProps[]>([]);
  const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindow>();
  const [status, setStatus] = React.useState(Status.LOADING);

  const defaultZoom = 7;
  const defaultCenter = {
    lat: 55,
    lng: 24,
  };

  React.useEffect(() => {
    if (status === Status.SUCCESS) {
      setMarkers(
        (markers ?? exampleParcelTerminalMarkers).map((x) => {
          return {
            label: `${x.label}, ${x.address}`,
            position: new google.maps.LatLng(x.position),
          };
        })
      );
    }
  }, [status, markers]);

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
