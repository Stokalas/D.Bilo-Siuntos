import React, { useEffect, useState } from 'react';

interface MarkerProps extends google.maps.MarkerOptions {
  infoWindow?: google.maps.InfoWindow;
  name?: string;
}

export const Marker: React.FC<MarkerProps> = ({ ...options }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

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
          options.infoWindow?.setContent(options?.name);
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
