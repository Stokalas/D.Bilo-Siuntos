import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Button, TextField } from '@mui/material';

import { Marker } from './map/Marker';
import { Map } from './map/Map';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MarkerProps {
  position: google.maps.LatLng;
  label: string;
}

const dbMarkers = [
  { label: 'Kaunas', position: { lat: 55, lng: 24 }, address: 'Kaunas, Lithuania' },
  { label: 'Vilnius', position: { lat: 55.3, lng: 24.3 }, address: 'Vilnius, Lithuania' },
  { label: 'Klaipeda', position: { lat: 55.6, lng: 24.6 }, address: 'Klaipeda, Lithuania' },
];

export const TheMap: React.VFC = () => {
  const [markers, setMarkers] = React.useState<MarkerProps[]>([]);
  const [zoom, setZoom] = React.useState(7); // initial zoom
  const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindow>();
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 55,
    lng: 24,
  });
  const [status, setStatus] = React.useState(Status.LOADING);
  const [geocoder, setGeocoder] = React.useState<google.maps.Geocoder>();
  const [address, setAddress] = React.useState('');

  const geocode = React.useCallback(
    (request: google.maps.GeocoderRequest) => {
      geocoder!
        .geocode(request)
        .then((result) => {
          const { results } = result;
          setMarkers([
            ...markers,
            {
              label: results[0].formatted_address,
              position: results[0].geometry.location,
            },
          ]);
        })
        .catch((e) => {
          alert('Geocode was not successful for the following reason: ' + e);
        });
    },
    [geocoder, markers]
  );

  React.useEffect(() => {
    if (status === Status.SUCCESS) {
      const geocoder = new google.maps.Geocoder();
      setGeocoder(geocoder);

      setMarkers(
        dbMarkers.map((x) => {
          return { label: x.label, position: new google.maps.LatLng(x.position) };
        })
      );
    }
  }, [status]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    // console.log('onClick');
    setMarkers([...markers, { position: e.latLng!, label: 'e.latLng!' }]);
    infoWindow?.close();
  };

  const form = () => (
    <div
      style={{
        padding: '1rem',
        flexBasis: '250px',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) => setCenter({ ...center, lat: Number(event.target.value) })}
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) => setCenter({ ...center, lng: Number(event.target.value) })}
      />
      <h3>{markers.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
      {markers.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.position.toJSON(), null, 2)}</pre>
      ))}
      <TextField onChange={(e) => setAddress(e.target.value)}></TextField>
      <Button onClick={(_) => geocode({ address })}>Geocode</Button>
      <button onClick={() => setMarkers([])}>Clear</button>
    </div>
  );

  const onCallBack = (status: Status) => {
    setStatus(status);
  };

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '300px' }}>
      <Wrapper
        callback={onCallBack}
        apiKey="AIzaSyDcuEb2IPoNa_1zzDZkS34-kpDbxWqU_o0"
        render={render}
      >
        <Map
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
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form()}
    </div>
  );
};
