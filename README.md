# Harima Weather

Expo/React Native 製の天気アプリ（ポートフォリオ用）。  
位置情報から天気 API を叩き、お気に入り地点を管理できるシンプルな天気アプリです。

---

## デモ

開発中（Webで「天気＋7日グラフ＋お気に入り」まで動作確認済み）

---

## セットアップ

```bash
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
- [x] お気に入り一覧（FlatList）・詳細画面を追加
- [x] 天気データのキャッシュ機構を実装（AsyncStorage＋TTL 30分）
- [x] 時間ごとの気温を VictoryLine で折れ線グラフ表示
- [x] オフライン時はキャッシュを利用して表示（SWR風の更新）

---

## 機能

- 位置情報の取得（expo-location）
- Open-Meteo から現在/日次予報を取得（APIキー不要）
- 現在の気温 / 今日の最高・最低を表示
- 7日予報を Victory グラフで可視化（Web/Native 両対応ラッパー）
- 現在地をお気に入りに保存（最大3件・AsyncStorage）
- お気に入り一覧（FlatList）と詳細画面に遷移
- 天気データをキャッシュしてオフライン対応（有効期限30分）
- 時間ごとの気温を折れ線グラフで可視化

## 技術メモ

- API は lib/api.ts に分離し、UI から独立
- 副作用は hooks/useCurrentLocation, hooks/useWeather へ集約
- グラフは lib/victoryImports.ts で Web=victory, Native=victory-native を切替
- tsconfig.json で @/\* パスエイリアスを有効化
- UI は React Native / Expo Router を利用

## 今後の拡張予定

- 降水量・風速・湿度の表示を追加
- UI の改善（アイコン、テーマ切替）

MIT
