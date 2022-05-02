import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

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

export const GoogleMap: React.VFC = () => {
  const [markers, setMarkers] = React.useState<MarkerProps[]>([]);
  const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindow>();
  const [status, setStatus] = React.useState(Status.LOADING);

  const zoom = 7;
  const center = {
    lat: 55,
    lng: 24,
  };

  React.useEffect(() => {
    if (status === Status.SUCCESS) {
      setMarkers(
        exampleParcelTerminalMarkers.map((x) => {
          return {
            label: `${x.label}, ${x.address}`,
            position: new google.maps.LatLng(x.position),
          };
        })
      );
    }
  }, [status]);

  const onClick = (_: google.maps.MapMouseEvent) => {
    // example of how to add markers
    // setMarkers([...markers, { position: e.latLng!, label: 'e.latLng!' }]);
    infoWindow?.close();
  };

  const onCallBack = (status: Status) => {
    setStatus(status);
  };

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '600px' }}>
      <Wrapper callback={onCallBack} apiKey={apiKey} render={render}>
        <MapComponent
          center={center}
          onClick={onClick}
          zoom={zoom}
          infoWindow={infoWindow}
          setInfoWindow={setInfoWindow}
          style={{ flexGrow: '1', height: '100%' }}
        >
          {markers.map((latLng, i) => (
            <Marker key={i} position={latLng.position} name={latLng.label} />
          ))}
        </MapComponent>
      </Wrapper>
    </div>
  );
};
