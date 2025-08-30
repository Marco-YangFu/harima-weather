// components/TempChart.tsx
import { View, Text, Platform, useWindowDimensions } from 'react-native';
import { Svg } from 'react-native-svg';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';
import React from 'react';

type Pt = { x: Date; y: number };
export type TempChartProps = {
  series: Pt[];
  forceWidth?: number; // ★ 追加
  forceHeight?: number; // ★ 追加
};

function TempChart({ series, forceWidth, forceHeight }: TempChartProps) {
  const { width: screenWidth } = useWindowDimensions();
  if (!series?.length) return <Text>データなし</Text>;

  // ここで最終サイズを「決め打ち」できる
  const chartWidth = forceWidth ?? Math.max(360, Math.floor(screenWidth - 32));
  const chartHeight = forceHeight ?? 440;

  return (
    <View
      style={{
        width: chartWidth, // ★ 親もこの幅で固定
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        ...(Platform.OS === 'web'
          ? { boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }
          : {
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
            }),
      }}
    >
      <Svg
        width={chartWidth}
        height={chartHeight}
        style={{ width: chartWidth, height: chartHeight }}
      >
        <VictoryChart
          width={chartWidth}
          height={chartHeight}
          standalone={false}
          padding={{ top: 20, right: 24, bottom: 56, left: 56 }} // 余白少なめ
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) =>
                `${fmtTime(datum.x)}\n${datum.y.toFixed(1)}℃`
              }
              labelComponent={<VictoryTooltip constrainToVisibleArea />}
            />
          }
          domainPadding={{ y: 12 }}
        >
          <VictoryAxis
            tickFormat={(t: Date | number | string) => fmtHour(t)}
            fixLabelOverlap
            style={{ tickLabels: { fontSize: 16 } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `${t}℃`}
            style={{ tickLabels: { fontSize: 16 } }}
          />
          <VictoryLine data={series} interpolation="monotoneX" />
        </VictoryChart>
      </Svg>
    </View>
  );
}

function fmtHour(d: Date | number | string) {
  const h = new Date(d as any).getHours();
  return `${h}時`;
}
function fmtTime(d: Date | number | string) {
  const dt = new Date(d as any);
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  const h = String(dt.getHours()).padStart(2, '0');
  return `${m}/${day} ${h}:00`;
}

export default React.memo(TempChart);
