import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useWeather } from '@/hooks/useWeather';
import { useFavorites } from '@/hooks/useFavorites';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { SevenDayChart } from '@/components/SevenDayChart';

export default function WeatherScreen() {
  // 位置情報
  const { coords, loading: locating, error: locError } = useCurrentLocation();
  // 天気（副作用は hook 側に隔離）
  const { data, loading, error } = useWeather(coords?.lat, coords?.lon);
  // お気に入り（remove は未使用なので外す）
  const { items, add } = useFavorites();

  // --- 分岐 ---
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
  // 失敗は先に出す（!data より前）
  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Failed to fetch weather</Text>
        <Text selectable>{String(error)}</Text>
      </View>
    );
  }
  if (loading || !data) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text>Fetching weather...</Text>
      </View>
    );
  }

  // --- 正常表示 ---
  const t =
    data.current?.temperature_2m != null
      ? data.current.temperature_2m.toFixed(1)
      : '-';
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

      <SevenDayChart
        labels={data.daily.time}
        min={data.daily.temperature_2m_min}
        max={data.daily.temperature_2m_max}
      />

      <Button
        title="Save Current"
        onPress={() => {
          if (coords)
            add({ name: 'Current', lat: coords.lat, lon: coords.lon });
        }}
      />

      {items.map((p) => (
        <Text key={`${p.name}-${p.lat}-${p.lon}`}>
          {p.name}: {p.lat}, {p.lon}
        </Text>
      ))}
    </View>
  );
}
