# Harima Weather

位置情報から現在地の気温を取得し、お気に入り地点を最大3件まで管理できるシンプルな天気アプリです。  
オフラインキャッシュに対応しているため、電波が弱い環境でも予報を確認できます。  
（React Native + Expo製）

---

## デモ

開発中（Webで「天気＋7日グラフ＋お気に入り」まで動作確認済み）

---

## 主な機能

- 位置情報の取得（expo-location）
- Open-Meteoから現在／日次予報を取得（APIキー不要）
- 現在気温・最高/最低の表示
- 時間ごとの気温をVictoryLineでグラフ表示
- 7日予報をVictoryChartで表示
- お気に入り登録（最大3件・AsyncStorage保存）
- キャッシュ＋オフライン対応（TTL=30分）
- エラーUI（再試行ボタン／プル更新）

---

## 技術的工夫

- **SWR風キャッシュ更新**（古いデータを即表示→裏で再取得）
- **勝手にリトライしないUI**（明示的な再試行・プル更新）
- **軽量化**：`useMemo`/`useCallback`/`React.memo`で再描画削減
- **グラフ**：victory-native＋VictoryVoronoiContainerでツールチップ表示
- **構成**：API処理・hooks・UIを責務ごとに分離

---

## セットアップ

```bash
npm install
npx expo start

・ Web / Android / iOS のいずれでも実行可能
・ Expo Go アプリで QR コードを読み取れば実機確認も可能

---

## 今後の拡張予定

- 降水量・風速・湿度の表示を追加
- UI の改善（アイコン、テーマ切替）
- キャッシュ管理（LRU削除）

License: MIT
```
