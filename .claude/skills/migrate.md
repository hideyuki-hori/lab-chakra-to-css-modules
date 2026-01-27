# /migrate <ページ名> <Issue番号>

以下の手順でChakra UI → CSS Modules移行を実行してください。

## 1. 準備

- `gh issue view <Issue番号>` でIssue内容を確認
- 現在のブランチが `migration-direct` または `issue/*` であることを確認
- 必要なら `issue/<Issue番号>-a` ブランチを作成
- `npm run dev` が起動していることを確認（していなければ起動）

## 2. Before撮影

```bash
mkdir -p screenshots/<Issue番号>
agent-browser open http://localhost:3000/<ページ名>
sleep 2
agent-browser screenshot screenshots/<Issue番号>/<ページ名>-before.png
```

ユーザーに「Before撮影完了」と報告。

## 3. 移行作業

### 3.1 CSSファイル作成

`styles/pages/<ページ名>.module.css` を作成。

- `styles/variables.css` のCSS変数を使用
- Chakra UIのスタイルを再現
- クラス名はcamelCase

### 3.2 TSX修正

`pages/<ページ名>.tsx` を修正:

- Chakra UIコンポーネント → HTML要素 + CSS Modules
- `import styles from '../styles/pages/<ページ名>.module.css'`
- **framer-motion はそのまま維持**
- **react-hook-form はそのまま維持**

## 4. After撮影 & 比較

```bash
agent-browser reload
sleep 2
agent-browser screenshot screenshots/<Issue番号>/<ページ名>-after.png
magick screenshots/<Issue番号>/<ページ名>-before.png screenshots/<Issue番号>/<ページ名>-after.png +append screenshots/<Issue番号>/<ページ名>-comparison.png
```

比較画像を確認し、差異があれば修正。ユーザーに比較画像を表示。

## 5. コミット

```bash
git add styles/ pages/<ページ名>.tsx
git commit -m "[A-<Issue番号>] <ページ名>ページをCSS Modulesに移行"
```

## 6. 完了報告

ユーザーに以下を報告:
- 作成/変更したファイル一覧
- スクリーンショットの場所
- 「PRにスクリーンショットを手動でアップロードしてください」
