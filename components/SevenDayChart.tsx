// components/SevenDayChart.tsx
import { View } from 'react-native';
import { V } from '@/lib/victoryImports';

const { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } = V;

export function SevenDayChart({
  labels,
  min,
  max,
}: {
  labels: string[];
  min: number[];
  max: number[];
}) {
  const short = labels.map((s) => (s.length >= 5 ? s.slice(5) : s));
  const safeIdx = short
    .map((_, i) => i)
    .filter((i) => Number.isFinite(min[i]) && Number.isFinite(max[i]));
  const dataMax = safeIdx.map((i) => ({ x: short[i], y: max[i] }));
  const dataMin = safeIdx.map((i) => ({ x: short[i], y: min[i] }));

  return (
    <View style={{ width: '100%', height: 240 }}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={12}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={dataMax} />
        <VictoryBar data={dataMin} />
      </VictoryChart>
    </View>
  );
}
