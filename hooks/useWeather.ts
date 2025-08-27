import { useEffect, useState } from 'react';
import { getForecast, type Forecast } from '@/lib/api';

export function useWeather(lat?: number, lon?: number) {
  const [data, setData] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) return;
    setLoading(true);
    setError(null);
    getForecast(lat, lon)
      .then(setData)
      .catch((e) => setError(String(e?.message ?? e)))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return { data, loading, error };
}
