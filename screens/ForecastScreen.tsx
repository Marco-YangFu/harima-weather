import { View, Text, ActivityIndicator } from 'react-native';
import { useForecast } from '../hooks/useForecast';
import TempChart from '../components/TempChart';
import { toHourlySeries } from '../lib/series';

export default function ForecastScreen({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const { data, loading, error, stale, online } = useForecast(lat, lon);

  return (
    <View style={{ gap: 8, padding: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Badge
          label={online ? 'オンライン' : 'オフライン'}
          type={online ? 'ok' : 'warn'}
        />
        {stale && <Badge label="古いデータ" type="info" />}
      </View>

      {loading && <ActivityIndicator />}

      {error && <Text style={{ color: 'crimson' }}>取得失敗：{error}</Text>}

      {data ? (
        <>
          <Text>更新:{new Date(data._fetchedAt).toLocaleDateString()}</Text>
          <TempChart series={toHourlySeries(data.hourly)} />
        </>
      ) : (
        !loading && <Text>データなし（キャッシュも無し）</Text>
      )}
    </View>
  );
}

// 手抜きバッジ
function Badge({
  label,
  type,
}: {
  label: string;
  type: 'ok' | 'warn' | 'info';
}) {
  const bg =
    type === 'ok' ? '#e7f7ee' : type === 'warn' ? '#fff4e5' : '#e8f1ff';
  const fg =
    type === 'ok' ? '#0f7b4b' : type === 'warn' ? '#8a4b12' : '#1b4ddb';
  return (
    <View
      style={{
        backgroundColor: bg,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: fg, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}
