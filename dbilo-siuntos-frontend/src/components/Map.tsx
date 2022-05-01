import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

import { Map } from './map/Map';
import { Marker } from './map/Marker';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MarkerProps {
  position: google.maps.LatLng;
  label: any;
}

export const App: React.VFC = () => {
  //   const [infoWindowOpen, setInfoWindowOpen] = React.useState(false);
  const [locations, setLocations] = React.useState<google.maps.LatLng[]>([]);
  const [markers, setMarkers] = React.useState<MarkerProps[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindow>();
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  //I need to save is info window open in state
  //On click, the info window should open with the marker

  //   const infowindow = new google.maps.InfoWindow({
  //     content: 'contentString',
  //   });
  //   marker.addListener("click", () => {
  //     infowindow.open({
  //       anchor: marker,
  //       map,
  //       shouldFocus: false,
  //     });
  //   });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    console.log(e.latLng);
    setLocations([...locations, e.latLng!]);
    setMarkers([...markers, { position: e.latLng!, label: e.latLng! }]);
  };

  //   const infoWindow = new google.maps.InfoWindow({
  //     content: 'contentString',
  //   });

  const onIdle = (m: google.maps.Map) => {
    // console.log('onIdle');
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
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
      <h3>{locations.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
      {locations.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setLocations([])}>Clear</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper apiKey="AIzaSyDcuEb2IPoNa_1zzDZkS34-kpDbxWqU_o0" render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          infoWindow={infoWindow}
          setInfoWindow={setInfoWindow}
          style={{ flexGrow: '1', height: '100%' }}
        >
          {/* {locations.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))} */}
          {markers.map((latLng, i) => (
            <Marker key={i} position={latLng.position} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form()}
    </div>
  );
};
