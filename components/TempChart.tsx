import { View, Text } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';

export default function TempChart({
  series,
}: {
  series: { x: Date; y: number }[];
}) {
  if (!series?.length) return <Text>データなし</Text>;

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 16px rgba(0,0,0,0.08)' } // Webは boxShadow
      : {
          // ネイティブ用の影（Webには出さない）
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        }),
  } as const;

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 8 }}>
      <VictoryChart
        padding={{ top: 16, right: 24, bottom: 40, left: 48 }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `${fmtTime(datum.x)}\n${datum.y.toFixed(1)}℃`
            }
            labelComponent={<VictoryTooltip constrainToVisibleArea />}
          />
        }
        domainPadding={{ y: 10 }}
      >
        <VictoryAxis
          tickFormat={(t) => fmtHour(t)}
          fixLabelOverlap
          style={{ tickLabels: { fontSize: 10 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}℃`}
          style={{ tickLabels: { fontSize: 10 } }}
        />
        <VictoryLine data={series} interpolation="monotoneX" />
      </VictoryChart>
    </View>
  );
}

function fmtHour(d: Date) {
  const h = new Date(d).getHours();
  return `${h}時`;
}

function fmtTime(d: Date) {
  const dt = new Date(d);
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  const h = String(dt.getHours()).padStart(2, '0');
  return `${m}/${day} ${h}:00`;
}
