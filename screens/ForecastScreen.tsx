import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import ErrorView from '../components/ErrorView';
import Loading from '../components/Loading';
import { useForecast } from '../hooks/useForecast';
import TempChart from '../components/TempChart';
import { toHourlySeries } from '../lib/series';
import { useMemo } from 'react';

export default function ForecastScreen({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const { width: screenWidth } = useWindowDimensions();
  const { data, loading, error, stale, online, refreshing, revalidate } =
    useForecast(lat, lon);
  const series = useMemo(
    () => (data ? toHourlySeries(data.hourly) : []),
    [data?.hourly],
  );

  return (
    <ScrollView
      contentContainerStyle={{
        width: screenWidth,
        gap: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'stretch',
      }}
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
          <Text>更新: {new Date(data._fetchedAt).toLocaleString()}</Text>
          {/* ★ 横幅900px・高さ480pxで強制表示 */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TempChart
              series={series.slice(0, 24)}
              forceWidth={900}
              forceHeight={480}
            />
          </ScrollView>
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
