import React, { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

const apiKey = process.env.REACT_APP_MAPS_API_KEY!;

export const geocode = async (address: string): Promise<google.maps.GeocoderResult[]> => {
  const loader = new Loader({
    apiKey,
  });

  try {
    await loader.load();
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address });
    return result.results;
  } catch (e) {
    if (e.code === google.maps.GeocoderStatus.ZERO_RESULTS) {
      return [];
    }
    alert('Geocoding failed');
    console.log(e);
  }
  return [];
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }

  // use fast-equals for other objects
  return deepEqual(a, b);
});

const useDeepCompareMemoize = (value: any) => {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepCompareEffectForMaps = (
  callback: React.EffectCallback,
  dependencies: any[]
) => {
  useEffect(callback, [...dependencies.map(useDeepCompareMemoize), callback]);
};
