import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useWeather } from '@/hooks/useWeather';

export default function PlaceDetail() {
  const params = useLocalSearchParams<{
    name?: string;
    lat?: string;
    lon?: string;
  }>();

  // name/lat/lon を安全に取り出す
  const rawName = typeof params.name === 'string' ? params.name : '';
  const name = safeDecode(rawName);
  const latNum = Number(params.lat);
  const lonNum = Number(params.lon);

  const { data, loading, error } = useWeather(
    Number.isFinite(latNum) ? latNum : undefined,
    Number.isFinite(lonNum) ? lonNum : undefined,
  );

  // まずはパラメータ欠損
  if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) {
    return (
      <Center>
        <Text>Invalid params: lat/lon is missing.</Text>
      </Center>
    );
  }

  // 失敗は先に見せる
  if (error) {
    return (
      <Center pad>
        <Text>Failed to fetch</Text>
        <Text selectable>{String(error)}</Text>
      </Center>
    );
  }

  if (loading || !data) {
    return (
      <Center>
        <ActivityIndicator />
        <Text>気温情報を取得中...</Text>
      </Center>
    );
  }

  const t = data.current?.temperature_2m?.toFixed?.(1) ?? '-';
  const hi = data.daily.temperature_2m_max?.[0];
  const lo = data.daily.temperature_2m_min?.[0];

  return (
    <Center pad gap>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        {name || 'Detail'}
      </Text>
      <Text>現在: {t} ℃</Text>
      <Text>
        今日: {lo ?? '-'} / {hi ?? '-'} ℃
      </Text>
    </Center>
  );
}

// 小さなユーティリティ（同ファイル内）
function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// 見た目用の薄いラッパ（任意）
function Center({
  children,
  pad,
  gap,
}: {
  children: React.ReactNode;
  pad?: boolean;
  gap?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: pad ? 16 : 0,
        gap: gap ? 8 : 0,
      }}
    >
      {children}
    </View>
  );
}
