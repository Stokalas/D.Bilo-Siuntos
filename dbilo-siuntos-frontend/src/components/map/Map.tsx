import React, { useRef, useEffect, useState } from 'react';

import { useDeepCompareEffectForMaps } from './mapUtils';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  infoWindow?: google.maps.InfoWindow;
  setInfoWindow?: (infoWindow: google.maps.InfoWindow) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

export const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  infoWindow,
  setInfoWindow,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
      if (!infoWindow && setInfoWindow) {
        const infowindow = new google.maps.InfoWindow({
          content: 'contentString',
        });
        setInfoWindow(infowindow);
      }
    }
  }, [ref, map, infoWindow, setInfoWindow]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map, infoWindow });
        }
        return null;
      })}
    </>
  );
};
