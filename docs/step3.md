# Step3: Chakra UI から CSS Modules への移行計画

## 移行戦略の概要

このプロジェクトでは、**2つの異なるアプローチを並行して試し、最終的に比較検証して最適な方法を選択する**戦略を採用します。

### アプローチA: 直接適用方式（Direct CSS Modules）
各ページで直接CSS Modulesを適用し、共通コンポーネントは最小限にする方式。
- **詳細:** `step3-a.md` を参照
- **ブランチ:** `migration-direct`
- **Issue数:** 12個
- **推定期間:** 8〜15日

### アプローチB: 共通UIコンポーネント方式（Component Library）
Chakra UIの代替となる共通UIコンポーネントライブラリを構築する方式。
- **詳細:** `step3-b.md` を参照
- **ブランチ:** `migration-component`
- **Issue数:** 19個
- **推定期間:** 15〜25日

## ブランチ戦略

### 基本構造

```
main (chakra-ui版が完成している状態)
  │
  ├─ migration-direct (アプローチA用)
  │   ├─ issue/1-a (プロフィールページ)
  │   ├─ issue/2-a (チームメンバーページ)
  │   ├─ issue/3-a (カレンダーページ)
  │   └─ ... (以降、各issue)
  │
  └─ migration-component (アプローチB用)
      ├─ issue/1-b (基盤構築)
      ├─ issue/2-b (基本UIコンポーネント)
      ├─ issue/3-b (フォーム関連UI)
      └─ ... (以降、各issue)
```

### ブランチ命名規則

#### メインブランチ
- **main**: Chakra UI版（現在の完成版、変更しない）
- **chakra-baseline**: Chakra UI版のスナップショット（既に作成済み、削除しない）
- **migration-direct**: アプローチA（直接適用方式）の作業ブランチ
- **migration-component**: アプローチB（共通コンポーネント方式）の作業ブランチ

#### Issueブランチ
- **issue/<number>-a**: アプローチAの各issueブランチ（例: `issue/1-a`, `issue/2-a`）
- **issue/<number>-b**: アプローチBの各issueブランチ（例: `issue/1-b`, `issue/2-b`）

### 作業フロー

#### 初期セットアップ
```bash
# アプローチA用のブランチ作成
git checkout main
git checkout -b migration-direct
git push -u origin migration-direct

# アプローチB用のブランチ作成
git checkout main
git checkout -b migration-component
git push -u origin migration-component
```

#### アプローチA の作業フロー（例: Issue #1）
```bash
# 1. migration-directから新しいissueブランチを作成
git checkout migration-direct
git pull origin migration-direct
git checkout -b issue/1-a

# 2. 作業を実行
# - プロフィールページの移行
# - styles/pages/profile.module.css の作成
# - 動作確認

# 3. スクリーンショット取得（agent-browser使用）
# - screenshots/1-a/profile-before.png
# - screenshots/1-a/profile-after.png

# 4. コミット
git add .
git commit -m "Issue #1-A: プロフィールページをCSS Modulesに移行

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 5. プッシュとPR作成
git push -u origin issue/1-a
gh pr create --base migration-direct --title "Issue #1-A: プロフィールページをCSS Modulesに移行" --body "..."

# 6. マージ
gh pr merge --squash

# 7. migration-directに戻る
git checkout migration-direct
git pull origin migration-direct
```

#### アプローチB の作業フロー（例: Issue #1）
```bash
# 1. migration-componentから新しいissueブランチを作成
git checkout migration-component
git pull origin migration-component
git checkout -b issue/1-b

# 2. 作業を実行
# - CSS変数の作成
# - グローバルスタイルの更新

# 3. コミット & プッシュ & PR作成
git add .
git commit -m "Issue #1-B: CSS変数とグローバルスタイルの基盤構築

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push -u origin issue/1-b
gh pr create --base migration-component --title "Issue #1-B: CSS変数とグローバルスタイルの基盤構築" --body "..."

# 4. マージ
gh pr merge --squash

# 5. migration-componentに戻る
git checkout migration-component
git pull origin migration-component
```

## GitHub Issue管理

### Issue命名規則

#### アプローチA用
- `[A-1] プロフィールページの移行`
- `[A-2] チームメンバーページの移行`
- `[A-3] カレンダーページの移行`
- ...

#### アプローチB用
- `[B-1] 基盤構築 - CSS変数とユーティリティ`
- `[B-2] 基本UIコンポーネント（レイアウト系）`
- `[B-3] フォーム関連UIコンポーネント`
- ...

### Issueラベル
- `approach-a`: アプローチA関連
- `approach-b`: アプローチB関連
- `migration`: 移行作業全般
- `in-progress`: 作業中
- `review`: レビュー待ち
- `completed`: 完了

### Issueテンプレート

#### アプローチA用テンプレート
```markdown
## 概要
[このissueで行う作業の概要]

## 対象ファイル
- `pages/xxx.tsx`
- 新規作成: `styles/pages/xxx.module.css`

## 置き換えるChakra UIコンポーネント
- Box → `<div>`
- Button → `<button className={styles.button}>`
- ...

## 作業内容
- [ ] 影響範囲の確認
- [ ] before スクリーンショット取得
- [ ] Chakra UIコンポーネントをCSS Modulesに置き換え
- [ ] framer-motionアニメーションの維持確認
- [ ] レスポンシブ対応の確認
- [ ] after スクリーンショット取得
- [ ] before/after比較画像の作成
- [ ] PR作成

## スクリーンショット
### Before
[貼り付け]

### After
[貼り付け]

### 比較
[横並び画像を貼り付け]

## 関連
- 詳細: `step3-a.md` の Issue #X
- ブランチ: `issue/X-a`
- ベースブランチ: `migration-direct`
```

#### アプローチB用テンプレート
```markdown
## 概要
[このissueで行う作業の概要]

## 実装する共通コンポーネント
- `components/ui/Button.tsx`
- `components/ui/Button.module.css`
- ...

## コンポーネントAPI設計
```typescript
interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'blue' | 'teal' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
  ...
}
```

## 作業内容
- [ ] コンポーネントの実装
- [ ] CSS Modulesの作成
- [ ] TypeScript型定義
- [ ] アクセシビリティ対応
- [ ] 単体テスト（任意）
- [ ] Storybook作成（任意）
- [ ] PR作成

## 関連
- 詳細: `step3-b.md` の Issue #X
- ブランチ: `issue/X-b`
- ベースブランチ: `migration-component`
```

## スクリーンショット管理

### ディレクトリ構造
```
screenshots/
├── 1-a/                    # アプローチA Issue #1
│   ├── profile-before.png
│   ├── profile-after.png
│   └── profile-comparison.png
├── 2-a/                    # アプローチA Issue #2
│   ├── team-before.png
│   ├── team-after.png
│   └── team-comparison.png
├── ...
├── 9-b/                    # アプローチB Issue #9 (プロフィールページ)
│   ├── profile-before.png
│   ├── profile-after.png
│   └── profile-comparison.png
└── ...
```

### スクリーンショット取得コマンド（agent-browser使用）

spec.mdに記載されている通り、globalにインストールされている `agent-browser` を使用します。

```bash
# before スクリーンショット（mainブランチで実行）
git checkout main
npm run dev
# 別ターミナルで
agent-browser open http://localhost:3000/profile
agent-browser screenshot --full screenshots/1-a/profile-before.png

# after スクリーンショット（issueブランチで実行）
git checkout issue/1-a
npm run dev
# 別ターミナルで
agent-browser open http://localhost:3000/profile
agent-browser screenshot --full screenshots/1-a/profile-after.png
```

または、スクリプトを使用：
```bash
# 自動化スクリプトを使用（推奨）
./scripts/screenshot/capture-before.sh 1 a
./scripts/screenshot/capture-after.sh 1 a
```

### 比較画像作成スクリプト

```bash
# scripts/create-comparison.sh を作成（ImageMagick使用）
#!/bin/bash
ISSUE=$1
PAGE=$2

convert screenshots/${ISSUE}/${PAGE}-before.png screenshots/${ISSUE}/${PAGE}-after.png +append screenshots/${ISSUE}/${PAGE}-comparison.png
```

使用例:
```bash
chmod +x scripts/create-comparison.sh
./scripts/create-comparison.sh 1-a profile
```

## アプローチ比較基準

両方のアプローチを完了後、以下の基準で比較評価します。

### 1. 開発効率
- [ ] 初期実装にかかった時間
- [ ] コード記述量
- [ ] 重複コードの量
- [ ] 各issueの平均作業時間

### 2. 保守性
- [ ] コードの可読性
- [ ] 変更の容易さ（例: ボタンの色を全体で変更する場合）
- [ ] 新しいページを追加する際のコスト
- [ ] バグ修正の容易さ

### 3. パフォーマンス
- [ ] バンドルサイズ（削減量）
- [ ] 初回ロード時間
- [ ] ページ遷移の速度
- [ ] Lighthouse スコア

### 4. デザインの一貫性
- [ ] 見た目の一貫性
- [ ] スペーシングの統一度
- [ ] カラーパレットの統一度
- [ ] タイポグラフィの統一度

### 5. 開発者体験（DX）
- [ ] TypeScript型補完の品質
- [ ] コードの書きやすさ
- [ ] エラーメッセージの分かりやすさ
- [ ] 学習コストの低さ

### 6. アクセシビリティ
- [ ] キーボードナビゲーション
- [ ] スクリーンリーダー対応
- [ ] フォーカス管理
- [ ] ARIA属性の適切さ

### 7. 再利用性
- [ ] コンポーネントの再利用性
- [ ] スタイルの再利用性
- [ ] 他のプロジェクトへの転用可能性

## 評価シート

| 評価項目 | アプローチA (直接適用) | アプローチB (共通コンポーネント) | 備考 |
|---------|---------------------|----------------------------|------|
| 初期実装時間 | ⭐⭐⭐⭐⭐ 速い | ⭐⭐⭐ 遅い | - |
| コード記述量 | ⭐⭐⭐ 多い | ⭐⭐⭐⭐ 少ない | - |
| 重複コード | ⭐⭐ 多い | ⭐⭐⭐⭐⭐ 少ない | - |
| 変更の容易さ | ⭐⭐ 難しい | ⭐⭐⭐⭐⭐ 簡単 | - |
| バンドルサイズ削減 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | - |
| デザインの一貫性 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | - |
| 型補完の品質 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | - |
| 学習コスト | ⭐⭐⭐⭐⭐ 低い | ⭐⭐⭐ 高い | - |
| 再利用性 | ⭐⭐ 低い | ⭐⭐⭐⭐⭐ 高い | - |
| アクセシビリティ | ⭐⭐⭐ | ⭐⭐⭐⭐ | - |

※作業完了後に実測値で更新

## 最終選択基準

以下の条件を考慮して、最終的にどちらのアプローチを採用するか決定します：

### アプローチAを選択すべきケース
- ✅ 短期間で移行を完了させたい
- ✅ プロジェクトの規模が小さい
- ✅ 今後の大幅な変更予定がない
- ✅ チームメンバーが少ない（1〜2人）
- ✅ シンプルな構成を好む

### アプローチBを選択すべきケース
- ✅ 長期的にメンテナンスする予定
- ✅ チームで開発している（3人以上）
- ✅ デザインシステムを構築したい
- ✅ 複数のプロジェクトで再利用したい
- ✅ Chakra UIの使い勝手を維持したい
- ✅ 今後も機能追加が続く

### ハイブリッドアプローチの可能性
評価の結果、以下のような折衷案も検討可能：
- アプローチBで共通コンポーネントを作成（Issue #1〜#7）
- アプローチAの簡易性を取り入れ、ページ固有の部分は直接CSS Modulesを使用
- 頻出コンポーネントのみBで作成、その他はAで対応

## 各アプローチのIssue一覧

### アプローチA（migration-direct ブランチ）

詳細は `step3-a.md` を参照してください。

| Issue | タイトル | 難易度 | 推定時間 |
|-------|---------|--------|---------|
| [A-1] | プロフィールページの移行 | ⭐ | 0.5日 |
| [A-2] | チームメンバーページの移行 | ⭐⭐ | 1日 |
| [A-3] | カレンダーページの移行 | ⭐⭐ | 1日 |
| [A-4] | 共通レイアウトコンポーネントの移行 | ⭐⭐⭐ | 1日 |
| [A-5] | ダッシュボードの移行 | ⭐⭐ | 0.5日 |
| [A-6] | プロジェクト一覧ページの移行 | ⭐⭐⭐ | 1.5日 |
| [A-7] | プロジェクト詳細ページの移行 | ⭐⭐⭐⭐ | 2日 |
| [A-8] | タスク一覧ページの移行 | ⭐⭐⭐ | 1.5日 |
| [A-9] | タスク作成/編集ページの移行 | ⭐⭐ | 1日 |
| [A-10] | レポートページの移行 | ⭐⭐⭐ | 1日 |
| [A-11] | 設定ページの移行 | ⭐⭐ | 0.5日 |
| [A-12] | Chakra UI完全削除と最終調整 | ⭐⭐ | 1日 |
| **合計** | **12 issues** | - | **12〜15日** |

### アプローチB（migration-component ブランチ）

詳細は `step3-b.md` を参照してください。

| Issue | タイトル | 難易度 | 推定時間 |
|-------|---------|--------|---------|
| [B-1] | 基盤構築 - CSS変数とユーティリティ | ⭐ | 0.5日 |
| [B-2] | 基本UIコンポーネント（レイアウト系） | ⭐ | 1日 |
| [B-3] | フォーム関連UIコンポーネント | ⭐⭐⭐ | 2〜3日 |
| [B-4] | 表示系UIコンポーネント | ⭐⭐ | 1.5日 |
| [B-5] | インタラクティブUIコンポーネント（その1） | ⭐⭐⭐ | 1.5日 |
| [B-6] | インタラクティブUIコンポーネント（その2） | ⭐⭐⭐⭐ | 2日 |
| [B-7] | テーブル・統計系UIコンポーネント | ⭐⭐ | 1.5日 |
| [B-8] | 共通レイアウトコンポーネントの移行 | ⭐⭐⭐ | 1日 |
| [B-9] | プロフィールページの移行 | ⭐ | 0.5日 |
| [B-10] | チームメンバーページの移行 | ⭐⭐ | 0.5日 |
| [B-11] | カレンダーページの移行 | ⭐⭐ | 0.5日 |
| [B-12] | ダッシュボードの移行 | ⭐ | 0.5日 |
| [B-13] | プロジェクト一覧ページの移行 | ⭐⭐ | 1日 |
| [B-14] | プロジェクト詳細ページの移行 | ⭐⭐⭐ | 1日 |
| [B-15] | タスク一覧ページの移行 | ⭐⭐ | 1日 |
| [B-16] | タスク作成/編集ページの移行 | ⭐⭐ | 1日 |
| [B-17] | レポートページの移行 | ⭐⭐ | 0.5日 |
| [B-18] | 設定ページの移行 | ⭐⭐ | 0.5日 |
| [B-19] | Chakra UI完全削除と最終調整 | ⭐⭐ | 1日 |
| **合計** | **19 issues** | - | **18〜25日** |

## タイムライン（並行作業の場合）

アプローチAとアプローチBを**別々の担当者または時間帯で並行作業**する場合のタイムライン：

### Week 1
- アプローチA: Issue #1〜#4
- アプローチB: Issue #1〜#3

### Week 2
- アプローチA: Issue #5〜#9
- アプローチB: Issue #4〜#7

### Week 3
- アプローチA: Issue #10〜#12、比較評価
- アプローチB: Issue #8〜#14

### Week 4
- アプローチB: Issue #15〜#19、比較評価
- 両アプローチの最終比較と選択

## 成果物

### 必須成果物
- ✅ `migration-direct` ブランチ（アプローチA完成版）
- ✅ `migration-component` ブランチ（アプローチB完成版）
- ✅ スクリーンショット比較画像（各issueごと）
- ✅ GitHub Issues（各アプローチのissue一覧）
- ✅ 評価レポート（両アプローチの比較結果）
- ✅ 最終選択の結論と理由

### オプション成果物
- 📊 パフォーマンス測定レポート
- 📊 バンドルサイズ分析レポート
- 📝 移行ガイドドキュメント
- 🎨 デザインシステムドキュメント（アプローチBの場合）

## 次のステップ

1. **ブランチ作成**
   ```bash
   git checkout main
   git checkout -b migration-direct
   git push -u origin migration-direct

   git checkout main
   git checkout -b migration-component
   git push -u origin migration-component
   ```

2. **GitHub Issuesの作成**
   - アプローチA: 12個のissueを作成（`[A-1]`〜`[A-12]`）
   - アプローチB: 19個のissueを作成（`[B-1]`〜`[B-19]`）

3. **作業開始**
   - アプローチA: `issue/1-a` から開始
   - アプローチB: `issue/1-b` から開始

4. **進捗管理**
   - GitHub Projects でカンバンボード作成（任意）
   - 各issueの状態を更新

5. **最終評価**
   - 両アプローチ完了後、評価シートを埋める
   - チームで議論し、最終的なアプローチを決定
   - 選択したブランチを main にマージ

## まとめ

この2つのアプローチを並行して試すことで、以下のメリットがあります：

1. **実践的な比較:** 理論だけでなく、実際に作業して比較できる
2. **リスク軽減:** どちらかのアプローチで問題が発生しても、もう一方がある
3. **学習機会:** 両方の手法を学ぶことができる
4. **最適な選択:** 実測データに基づいた意思決定ができる
5. **将来への投資:** プロジェクトに最適な手法を選択できる

どちらのアプローチも完成させ、実際のコード、パフォーマンス、開発体験を比較してから、プロジェクトに最適な方法を選択しましょう。
