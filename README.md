# MCPサーバーを作ってみよう

## 参考資料
- https://zenn.dev/bamboohouse/articles/74037522a0a815

### 2025/6/13やったこと
- 記事通りに構築
- 一旦記事通り構築できたはす記述しているsrcのモジュールがうまく読み込めていないので、また確認

### 2025/6/28 エラー解消と解決方法

#### 🔍 発生した問題
1. **不要なコードとインポート**: `src/index.ts`に記事にない追加のコードが混入
2. **Node.jsバージョン**: v14では動作せず、v20が必要
3. **CursorのMCP設定**: Node.jsの正確なパスが必要
4. **不要な依存関係**: 記事で使用されていない`axios`がpackage.jsonに含まれている

#### ✅ 解決方法

**1. src/index.tsの修正**
- 不要なインポート `import { getWeather } from './weather.js';` を削除
- 記事にない `get-city-weather` ツールを削除
- メイン関数を記事通りのMCPサーバー起動処理に修正

**2. Node.jsバージョン変更**
```bash
nvm use 20
nvm alias default 20
```

**3. package.json修正**
- 不要な依存関係 `axios` を削除
- 記事通りの構成に統一

**4. 不要ファイル削除**
- 使用されていない `src/weather.ts` を削除

**5. CursorのMCP設定**
```json
{
  "mcpServers": {
    "weather": {
      "command": "/Users/r273-2576/.nvm/versions/node/v20.18.0/bin/node",
      "args": ["/Users/r273-2576/Documents/AI-mokumoku/weather-mcp/build/index.js"]
    }
  }
}
```

#### 🎯 動作確認
- MCPサーバーのビルド成功 (`npm run build`)
- CursorでMCP設定が緑色のインジケーター表示
- 「サンフランシスコの天気を教えて」で正常に天気情報取得可能

#### 📝 注意点
- NWS APIはアメリカ国内の天気情報のみ対応
- 東京などの海外都市は非対応
- Cursor設定変更後は必ず**完全再起動**が必要

### Weather MCP Server構築
- どんなものを作ったか
  - アメリア国内の天気情報を取得できる
- 検証結果
<img width="715" alt="スクリーンショット 2025-06-29 12 38 24" src="https://github.com/user-attachments/assets/85cf3728-7f58-4a6b-a27f-8f2476d6a388" />

- 記事通りにはいかなかった点
  - Nodeのバージョン
    - 案件の影響でv14を使用していた。実行するバージョンがv20系からになっており、nvmでv20系を設定していてもチャットで実行してもらうときには、グローバルのパスがv14系になっていたので実行できなかった。
