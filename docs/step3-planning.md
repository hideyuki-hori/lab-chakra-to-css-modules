# Step3: Chakra UI → CSS Modules 移行計画

## 前提

- docs/**/*.md を確認すること
- 以下のコマンドはインストール済み
  - claude code
  - agent-browser

---

## スクリーンショット取得環境

Firebase Auth（Googleログイン）を使用しているため、agent-browserのCDP Modeで認証済みブラウザに接続する。

### 初回セットアップ（人間が実施）

```bash
pkill -9 Chrome

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-debug-profile &
```

開いたChromeで http://localhost:3000/login にアクセスし、Googleログインを完了する。

### スクリーンショット取得（Claudeが実行）

```bash
agent-browser --cdp 9222 open "http://localhost:3000/<path>"
agent-browser --cdp 9222 screenshot "screenshots/<filename>.png" --full
```

### 注意事項
- Chromeを再起動した場合は再度ログインが必要
- ポート9222が使用中の場合は既存Chromeを終了してから起動

---

## 2つの移行アプローチ

本プロジェクトでは、2つの移行アプローチを用意し、それぞれ別ブランチで実験する。

| アプローチ | ブランチ名 | ドキュメント | Issue数 |
|-----------|-----------|-------------|---------|
| A: 直接CSS Modules適用 | `migration-direct` | [step3-migration-direct.md](step3-migration-direct.md) | 12 |
| B: 共通UIコンポーネント | `migration-components` | [step3-migration-components.md](step3-migration-components.md) | 19 |

### アプローチA: 直接CSS Modules適用方式
- 各ページで直接CSS Modulesを使用
- シンプルで理解しやすい
- 並行作業が容易
- スタイルの重複が発生しやすい

### アプローチB: 共通UIコンポーネント方式
- Chakra UI代替の共通UIコンポーネントを構築
- デザインの一貫性が高い
- 長期メンテナンスに優れる
- 初期コストが高い

---

## ブランチごとの .claude/ 設定

**重要**: 各ブランチで専用の `.claude/` 設定を作成する。

### migration-direct ブランチ
```
.claude/
├── CLAUDE.md                    # 直接適用方式の指示
├── settings.json
├── skills/
│   ├── migrate/SKILL.md         # /migrate <page>
│   ├── screenshot/SKILL.md      # /screenshot
│   ├── compare/SKILL.md         # /compare
│   ├── create-issue/SKILL.md
│   └── create-pr/SKILL.md
├── agents/
│   └── migration-checker/
├── hooks/
│   └── lint-on-edit.sh
└── rules/
    ├── css-modules.md
    ├── migration-workflow.md
    └── chakra-replacement.md
```

### migration-components ブランチ
```
.claude/
├── CLAUDE.md                    # 共通コンポーネント方式の指示
├── settings.json
├── skills/
│   ├── create-component/SKILL.md # /create-component <name>
│   ├── migrate-page/SKILL.md     # /migrate-page <page>
│   ├── screenshot/SKILL.md
│   ├── compare/SKILL.md
│   ├── create-issue/SKILL.md
│   └── create-pr/SKILL.md
├── agents/
│   ├── component-builder/
│   └── migration-checker/
├── hooks/
│   ├── lint-on-edit.sh
│   └── component-export-check.sh
└── rules/
    ├── ui-components.md
    ├── css-modules.md
    ├── migration-workflow.md
    └── chakra-api-mapping.md
```

---

## 作業フロー

### 共通フロー

```
1. 作業対象を洗い出す
2. 作業単位を決定する
3. issueを作成
4. ブランチを作成（migration-direct または migration-components）
5. .claude/* を設定
6. 以下issueごとに作業:
   a. issue-{d|c}-<issue-number> ブランチを作成
   b. 影響箇所にposition名を付与
   c. /screenshot before で Before取得
   d. 作業実施
   e. /screenshot after で After取得
   f. /compare で比較
   g. /create-pr でPR作成
   h. 画像アップロード（人間）
   i. マージ（人間）
```

### スクリーンショット保存先
- アプローチA: `screenshots/issue-d-<issue-number>/<position>-{before|after}.png`
- アプローチB: `screenshots/issue-c-<issue-number>/<position>-{before|after}.png`

---

## Claude Code 機能の活用

### 1. カスタムスラッシュコマンド（Skills）
| コマンド | 用途 |
|---------|------|
| `/migrate` | コンポーネント/ページの移行 |
| `/screenshot` | Before/Afterスクリーンショット取得 |
| `/compare` | 画像比較・レポート生成 |
| `/create-issue` | GitHub Issue作成 |
| `/create-pr` | PR作成 |
| `/create-component` | 共通UIコンポーネント作成（Bのみ） |

### 2. カスタムエージェント（Agents）
| エージェント | 用途 |
|-------------|------|
| `migration-checker` | 移行品質の自動チェック |
| `component-builder` | 共通UIコンポーネント構築（Bのみ） |

### 3. フック（Hooks）
| フック | タイミング | 用途 |
|--------|-----------|------|
| `lint-on-edit.sh` | ファイル編集後 | ESLint自動実行 |
| `component-export-check.sh` | ファイル編集後 | index.tsエクスポート確認（Bのみ） |
| `migration-checker` | 作業完了時 | 品質チェック |

### 4. ルールファイル（Rules）
| ファイル | 内容 |
|---------|------|
| `css-modules.md` | CSS Modulesコーディング規約 |
| `migration-workflow.md` | 移行ワークフロー |
| `chakra-replacement.md` | Chakra UI置換表（Aのみ） |
| `ui-components.md` | 共通UI設計規約（Bのみ） |
| `chakra-api-mapping.md` | API対応表（Bのみ） |

---

## 比較基準

Before/Afterの比較は以下の観点で行う：

1. **視覚的同等性**
   - レイアウトの崩れがないか
   - 色・フォントが維持されているか

2. **インタラクション**
   - ホバー・フォーカス状態が正しいか
   - クリック・入力が正しく動作するか

3. **レスポンシブ**
   - モバイル・タブレット・デスクトップで正しく表示されるか

4. **アニメーション**
   - framer-motionアニメーションが維持されているか

5. **アクセシビリティ**
   - キーボードナビゲーションが動作するか
   - aria属性が適切か

---

## 次のステップ

1. どちらのアプローチで進めるか決定
2. 対応するブランチを作成
3. `.claude/*` ファイルを実際に作成
4. GitHub Issuesを作成
5. 移行作業開始

---

## 関連ドキュメント

- [step3-migration-direct.md](step3-migration-direct.md) - アプローチA詳細
- [step3-migration-components.md](step3-migration-components.md) - アプローチB詳細
- [step1.md](step1.md) - プロジェクト仕様
- [step2-report.md](step2-report.md) - Chakra UI実装報告
- [spec.md](spec.md) - 実験全体の仕様
