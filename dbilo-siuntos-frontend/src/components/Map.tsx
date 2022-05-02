import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

import { Map } from './map/Map';
import { Marker } from './map/Marker';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MarkerProps {
  position: google.maps.LatLng;
  label: string;
}

interface MarkerProps2 {
  position: google.maps.LatLngLiteral;
  label: string;
}

const dbMarkers = [
  { label: 'Kaunas', position: { lat: 55, lng: 24 } },
  { label: 'Vilnius', position: { lat: 55.3, lng: 24.3 } },
  { label: 'Klaipeda', position: { lat: 55.6, lng: 24.6 } },
];

export const App: React.VFC = () => {
  const [locations, setLocations] = React.useState<MarkerProps2[]>([]);
  const [markers, setMarkers] = React.useState<MarkerProps[]>([]);
  const [zoom, setZoom] = React.useState(7); // initial zoom
  const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindow>();
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 55,
    lng: 24,
  });
  const [status, setStatus] = React.useState(Status.LOADING);

  React.useEffect(() => {
    if (status === Status.SUCCESS) {
      console.log(status);
      setMarkers(
        dbMarkers.map((x) => {
          return { label: x.label, position: new google.maps.LatLng(x.position) };
        })
      );
    }
  }, [status]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    console.log('onClick');
    setLocations([
      ...locations,
      { label: '', position: { lat: e.latLng!.lat(), lng: e.latLng!.lng() } },
    ]);
    setMarkers([...markers, { position: e.latLng!, label: 'e.latLng!' }]);
    infoWindow?.close();
  };

  // const onIdle = (m: google.maps.Map) => {
  //   // console.log('onIdle');
  //   setZoom(m.getZoom()!);
  //   setCenter(m.getCenter()!.toJSON());
  // };

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
      <h3>{locations.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
      {locations.map((latLng, i) => (
        <pre key={i}>
          {JSON.stringify(new google.maps.LatLng(latLng.position).toJSON(), null, 2)}
        </pre>
      ))}
      <button onClick={() => setLocations([])}>Clear</button>
    </div>
  );

  const onCallBack = (status: Status) => {
    setStatus(status);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper
        callback={onCallBack}
        apiKey="AIzaSyDcuEb2IPoNa_1zzDZkS34-kpDbxWqU_o0"
        render={render}
      >
        <Map
          center={center}
          onClick={onClick}
          // onIdle={onIdle}
          zoom={zoom}
          infoWindow={infoWindow}
          setInfoWindow={setInfoWindow}
          style={{ flexGrow: '1', height: '100%' }}
        >
          {/* {locations.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))} */}
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
