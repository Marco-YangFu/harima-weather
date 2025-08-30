import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useWeather } from '@/hooks/useWeather';
import { useFavorites } from '@/hooks/useFavorites';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
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
        <Text>気温情報を取得中...</Text>
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
        alignItems: 'stretch', // ★ 子を横いっぱいに伸ばす
        justifyContent: 'center',
        paddingHorizontal: 16, // 余白は親で付ける
        gap: 12,
      }}
    >
      <View style={{ alignItems: 'center', gap: 4 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            color: '#111',
          }}
        >
          現在: {t} ℃
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center', color: '#111' }}>
          今日: {d0min ?? '-'} / {d0max ?? '-'} ℃
        </Text>
      </View>

      <SevenDayChart
        labels={data.daily.time}
        min={data.daily.temperature_2m_min}
        max={data.daily.temperature_2m_max}
      />

      <Pressable
        onPress={() => {
          if (coords) add({ name: '現在地', lat: coords.lat, lon: coords.lon });
        }}
        style={{
          alignSelf: 'center', // 中央寄せ
          minWidth: 160, // 幅を固定気味に
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 8,
          backgroundColor: '#3b82f6',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>
          現在地を保存
        </Text>
      </Pressable>

      <View style={{ alignItems: 'center', gap: 6 }}>
        {items.map((p) => (
          <Text
            key={`${p.name}-${p.lat})}-${p.lon}`}
            style={{ fontSize: 18, textAlign: 'center' }}
          >
            {p.name}: {p.lat.toFixed(0)}, {p.lon.toFixed(0)}
          </Text>
        ))}
      </View>
    </View>
  );
}
