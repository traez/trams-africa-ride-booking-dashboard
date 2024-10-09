import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface GeocodeResult {
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export function useGeocoding() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places'],
  });

  const [error, setError] = useState<string | null>(null);

  const getGeocode = async (
    request: google.maps.GeocoderRequest
  ): Promise<GeocodeResult[] | null> => {
    if (!isLoaded) {
      setError('Google Maps API is not loaded');
      return null;
    }

    try {
      const geocoder = new google.maps.Geocoder();
      const result = await new Promise<GeocodeResult[]>((resolve, reject) => {
        geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            resolve(results as GeocodeResult[]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    }
  };

  return { getGeocode, error };
}

/* 
The useGeocoding custom hook provides a convenient way to leverage the Google Maps Geocoding API in React applications. It utilizes the useJsApiLoader hook from the @react-google-maps/api library to load the Google Maps API, ensuring that the API is ready before any geocoding requests are made. The hook maintains local state for error handling and defines an interface, GeocodeResult, to specify the expected structure of the geocoding response, which includes latitude and longitude methods.

The core functionality of the hook is encapsulated in the getGeocode function, which accepts a geocoding request (e.g., an address) and returns a promise that resolves to an array of geocoding results or null if an error occurs. The function checks if the Google Maps API has loaded, performs the geocoding using the Geocoder class, and handles any errors that may arise during the process. This design allows components using the hook to easily fetch geographic coordinates from addresses while managing errors effectively, streamlining the implementation of geocoding functionality in applications that require mapping features.
*/