import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { getForecast, type Forecast } from '../lib/api';

export default function WeatherScreen() {
  const { coords, loading: locating, error: locError } = useCurrentLocation();
  const [data, setData] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    setApiError(null);
    getForecast(coords.lat, coords.lon)
      .then(setData)
      .catch((e) => setApiError(e?.message ?? 'fetch failed'))
      .finally(() => setLoading(false));
  }, [coords?.lat, coords?.lon]);

  if (locating) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text>Locating...</Text>
      </View>
    );
  }
  if (locError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{locError}</Text>
      </View>
    );
  }
  if (loading || !data) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text>Fetching Weather...</Text>
      </View>
    );
  }
  if (apiError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{apiError}</Text>
      </View>
    );
  }

  const t = data.current.temperature_2m?.toFixed?.(1);
  const d0max = data.daily.temperature_2m_max?.[0];
  const d0min = data.daily.temperature_2m_min?.[0];

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <Text>Now: {t} ℃</Text>
      <Text>
        Today: {d0min ?? '-'} / {d0max ?? '-'} ℃
      </Text>
    </View>
  );
}
