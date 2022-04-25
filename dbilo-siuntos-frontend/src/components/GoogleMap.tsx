import React, { useRef, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

//I want the showed locations do be dynamic
//They should be switched of from outside

interface Location {
  name: string;
  lat: number;
  lng: number;
  display: boolean;
}

const MapComponent = ({
  center,
  zoom,
  locations,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  locations: Location[];
}) => {
  const ref = useRef<HTMLDivElement>(null);

  //we need to catch the change of display and then diplay or not

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, {
      center,
      zoom,
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
        map: map,
      });

      google.maps.event.addListener(
        marker,
        'click',
        ((marker, i) => {
          return () => {
            infowindow.setContent(locations[i].name as string);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  });

  return <div style={{ height: '500px' }} ref={ref} id="map" />;
};

export const GoogleMap = () => {
  const center = { lat: 55, lng: 24.032 };
  const zoom = 7;

  const locations = [
    { name: 'One', lat: 55, lng: 24, display: true },
    { name: 'Two', lat: 55.1, lng: 24.1, display: true },
    { name: 'Three', lat: 55.2, lng: 24.2, display: true },
  ];

  return (
    <Wrapper apiKey="AIzaSyDcuEb2IPoNa_1zzDZkS34-kpDbxWqU_o0">
      <MapComponent center={center} zoom={zoom} locations={locations} />
    </Wrapper>
  );
};
