import React, { useRef, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapComponent = ({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center,
      zoom,
    });
  });

  return <div style={{ height: '500px' }} ref={ref} id="map" />;
};

export const GoogleMap = () => {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey="AIzaSyDcuEb2IPoNa_1zzDZkS34-kpDbxWqU_o0">
      <MapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
};
