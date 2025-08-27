# Harima Weather

React Native (Expo) 製のポートフォリオアプリ。  
位置情報から天気 API を叩き、現在の気温や予報を表示する。

---

## 技術スタック

- Expo (SDK 53)
- React Native 0.79
- TypeScript 5
- expo-router 5
- react-native-safe-area-context
- react-native-screens

---

## セットアップ

```bash
git clone https://github.com/Marco-YangFu/harima-weather.git
cd harima-weather
npm install
npx expo start
```

- Web / Android / iOS のいずれでも実行可能
- Expo Go アプリで QR コードを読み取れば実機確認も可能

---

## 進捗

- [x] Expo プロジェクト作成 & expo-router 導入
- [x] /weather 画面を追加
- [x] 位置情報を取得して天気 API を叩く
- [x] 現在の気温・今日の最高/最低を表示
- [x] 7日予報を Victory でグラフ表示
- [x] 「現在地をお気に入りに保存」機能を追加

---

## 機能

- 位置情報の取得（expo-location）
- Open-Meteo から現在/日次予報を取得（APIキー不要）
- 現在の気温 / 今日の最高・最低を表示
- 7日予報を Victory グラフで可視化（Web/Native 両対応ラッパー）
- 現在地をお気に入りに保存（最大3件・AsyncStorage）

## 技術メモ

- API は lib/api.ts に分離し、UI から独立
- 副作用は hooks/useCurrentLocation, hooks/useWeather へ集約
- グラフは lib/victoryImports.ts で Web=victory, Native=victory-native を切替
- tsconfig.json で @/\* パスエイリアスを有効化
- UI は React Native / Expo Router を利用

## スクリーンショット
<img width="573" height="602" alt="スクリーンショット 2025-08-27 230155" src="https://github.com/user-attachments/assets/00979171-b896-43ee-b7ff-48678629c9ef" />

MIT
