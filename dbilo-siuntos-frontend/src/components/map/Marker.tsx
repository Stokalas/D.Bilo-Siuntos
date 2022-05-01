import React, { useEffect, useState } from 'react';

//on click should display an info window

interface MarkerProps extends google.maps.MarkerOptions {
  infoWindow?: google.maps.InfoWindow;
}

export const Marker: React.FC<MarkerProps> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  //   const infowindow = new google.maps.InfoWindow({
  //     content: 'contentString',
  //   });

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      if (options.infoWindow) {
        marker.addListener('click', () => {
          options.infoWindow!.open({
            anchor: marker,
            map: options.map,
            shouldFocus: false,
          });
        });
      }
    }
  }, [marker, options]);

  return null;
};
