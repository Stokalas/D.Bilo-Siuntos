import { Loader } from '@googlemaps/js-api-loader';

export const geocode = async (address: string): Promise<google.maps.GeocoderResult[]> => {
  const loader = new Loader({
    apiKey: 'AIzaSyDcuEb2IPoNa_1zzDZkS34-kpDbxWqU_o0',
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
