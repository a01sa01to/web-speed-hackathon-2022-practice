## 開発方法

### 環境

- Node.js v16 (v16.18.0 推奨)
- yarn

### コマンド

最低限のコマンドだけ記載します。
それ以外については、各フォルダの `package.json` を参照してください。

#### 準備

```bash
yarn install
```

#### ビルド

```bash
yarn build
```

#### サーバーの起動

標準では `http://localhost:3000` でアクセスできます。

```bash
yarn serve
```

#### 開発環境の起動

ファイル変更時にクライアント・サーバー両方のビルドと再起動が自動で行われます。
**ホットリロードはありません**ので、変更をブラウザで確認するには変更後にリロードしてください。

標準では `http://localhost:3000` でアクセスできます。
クライアントのビルドが完了していない状態でアクセスすると、エラーになることがあるのでご注意ください。

```bash
yarn dev
```

#### データの再生成

トップページの「本日のレース」セクションが現在日時に依存するため、開催期間外に取り組むにはデータの再生成を行なってください。
参考までに、開催時は約 1 ヶ月分のデータを作成していました。

```bash
# 開始日時と終了日時まで作成するかを引数で指定可能です
yarn init:seeds 2022-12-20 2023-01-20
```

データ更新後に `git push` に失敗する場合、 `http.postBuffer` を大きくすることで改善する場合があります。

なお、再生成を行なったデータでは VRT の検証に失敗するため、fork したリーダーボード内の画像を更新する必要があります。
具体的な手順については、別途[こちらのドキュメント](https://github.com/CyberAgentHack/web-speed-hackathon-2022-leaderboard/blob/main/docs/CONFIGURATION.md)をご覧ください。