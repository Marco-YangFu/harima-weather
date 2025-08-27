import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useCurrentLocation() {
  const [coords, setCoords] = useState<{ lat: Number; lon: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') throw new Error('Location permission denied');
        const { coords } = await Location.getCurrentPositionAsync({});
        setCoords({ lat: coords.latitude, lon: coords.longitude });
      } catch (e: any) {
        setError(e?.message ?? 'location error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { coords, loading, error };
}
