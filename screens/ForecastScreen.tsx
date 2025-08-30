import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import ErrorView from '../components/ErrorView';
import Loading from '../components/Loading';
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
  const { data, loading, error, stale, online, refreshing, revalidate } =
    useForecast(lat, lon);

  return (
    <ScrollView
      contentContainerStyle={{ gap: 8, padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={revalidate} />
      }
    >
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Badge
          label={online ? 'オンライン' : 'オフライン'}
          type={online ? 'ok' : 'warn'}
        />
        {stale && <Badge label="古いデータ" type="info" />}
      </View>

      {loading && !data && <Loading />}

      {error && (
        <ErrorView message={error} onRetry={revalidate} disabled={refreshing} />
      )}

      {data && (
        <>
          <Text>更新:{new Date(data._fetchedAt).toLocaleString()}</Text>
          <TempChart series={toHourlySeries(data.hourly)} />
        </>
      )}

      {!loading && !data && !error && (
        <Text>データなし（キャッシュも無し）</Text>
      )}
    </ScrollView>
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
