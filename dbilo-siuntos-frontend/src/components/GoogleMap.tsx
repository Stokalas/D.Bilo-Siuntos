/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Button } from '@mui/material';

//I want the showed locations do be dynamic
//They should be switched of from outside

interface Location {
  name: string;
  lat: number;
  lng: number;
  display: boolean;
}

// Adds a marker to the map and push to the array.
function addMarker(
  position: google.maps.LatLng | google.maps.LatLngLiteral,
  map: google.maps.Map | null
) {
  const marker = new google.maps.Marker({
    position,
    map,
  });

  return marker;
}

// Sets the map on all markers in the array.
function setMapOnAll(map: google.maps.Map | null, markers: google.maps.Marker[]) {
  for (let i = 0; i < markers.length; i++) {
    // console.log(markers[i]);
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers(markers: google.maps.Marker[]): void {
  setMapOnAll(null, markers);
}

// Shows any markers currently in the array.
// function showMarkers(map: google.maps.Map, markers: google.maps.Marker[]): void {
//   setMapOnAll(map, markers);
// }

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

  //first, create and display the map
  //then add initial

  //we need to catch the change of display and then diplay or not

  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  // console.log(markers);

  const pushMarker = (marker: google.maps.Marker) => {
    //for some reason we get old markers here
    console.log('hi', markers, [...markers, marker]);
    setMarkers([...markers, marker]);
  };

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, {
      center,
      zoom,
    });
    setMap(map);
  }, []);

  useEffect(() => {
    console.log(map);
    if (map) {
      // This event listener will call addMarker() when the map is clicked.
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        const marker = addMarker(event.latLng!, map);
        pushMarker(marker);
      });
    }
  }, [map]);

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  // console.log(showMarkers, hideMarkers, setMarkers);
  useEffect(() => {
    const infowindow = new google.maps.InfoWindow();

    // add event listeners for the buttons
    // document
    //   .getElementById('show-markers')!
    //   .addEventListener('click', () => showMarkers(map, markers));
    // document.getElementById('hide-markers')!.addEventListener('click', hideMarkers);
    // document.getElementById('delete-markers')!.addEventListener('click', deleteMarkers);

    // Adds a marker at the center of the map.
    // addMarker(haightAshbury);
    if (map) {
      let marker, i;
      // console.log(map);
      const newMarkers: google.maps.Marker[] = [];
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

        newMarkers.push(marker);
      }

      setMarkers([...markers, ...newMarkers]);
    }
  }, [map]);

  return (
    <>
      <div style={{ height: '500px' }} ref={ref} id="map" />;
      <Button onClick={() => hideMarkers(markers)}> Show</Button>
    </>
  );
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
