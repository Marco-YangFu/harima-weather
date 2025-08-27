# Harima Weather

Expo/React Native 製の天気アプリ（ポートフォリオ用）。  
位置情報から天気 API を叩き、お気に入り地点を管理できるシンプルな天気アプリです。  
まだ骨組み段階ですが、今後 24h/7 日予報やオフラインキャッシュなどを実装予定です。

---

## デモ

開発中  
（/Weather 画面追加 動作確認済み）

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
# install
npm install

# run
npx expo start
```

- Web / Android / iOS のいずれでも実行可能
- Expo Go アプリで QR コードを読み取れば実機確認も可能

---

## ディレクトリ構成

```
app/              ルーティング（expo-router）
  _layout.tsx     共通レイアウト
  index.tsx       初期画面（It works.）
assets/           アイコン・画像など
components/       再利用コンポーネント
constants/        定数
hooks/            カスタムフック
```

---

## 今後の予定

- [x] Expo プロジェクト作成 & expo-router 導入
- [x] /weather 画面を追加
- [x] 位置情報を取得して天気 API を叩く
- [x] 現在の気温・今日の最高/最低を表示
- [x] 7日予報を Victory でグラフ表示
- [x] 「現在地をお気に入りに保存」機能を追加
- [ ] 24 時間 / 7 日予報のグラフ表示 (victory-native)
- [ ] オフラインキャッシュ
- [ ] ダークモード対応

---

## ライセンス

MIT
