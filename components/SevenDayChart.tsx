// components/SevenDayChart.tsx
import { View, useWindowDimensions } from 'react-native';
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
  const { width } = useWindowDimensions();
  const chartWidth = Math.floor(width - 32); // 画面幅から余白を引く
  const chartHeight = 320; // 高さは少し抑える

  const short = labels.map((s) => (s.length >= 5 ? s.slice(5) : s));
  const safeIdx = short
    .map((_, i) => i)
    .filter((i) => Number.isFinite(min[i]) && Number.isFinite(max[i]));
  const dataMax = safeIdx.map((i) => ({ x: short[i], y: max[i] }));
  const dataMin = safeIdx.map((i) => ({ x: short[i], y: min[i] }));

  return (
    <View style={{ width: '100%', maxWidth: 600, alignSelf: 'center' }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={16}
        width={Math.min(chartWidth, 440)} // 最大600pxに制限
        height={chartHeight}
        padding={{ top: 16, right: 24, bottom: 56, left: 56 }}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={dataMax} />
        <VictoryBar data={dataMin} />
      </VictoryChart>
    </View>
  );
}
