# Step3-A: Chakra UI から CSS Modules への移行計画（アプローチA: 直接適用方式）

## アプローチA の概要

**直接CSS Modules適用方式**

- 各ページファイルで直接CSS Modulesを使用してスタイリング
- 共通UIコンポーネントは最小限（必要な場合のみ作成）
- シンプルで理解しやすいが、スタイルの重複が発生する可能性がある
- 各ページの移行が独立しており、段階的に進めやすい

### メリット
- ✅ シンプルで理解しやすい
- ✅ 各ページが独立しており、並行作業が容易
- ✅ 初期の学習コストが低い
- ✅ ページごとに最適化されたスタイルを書ける

### デメリット
- ❌ スタイルの重複が発生しやすい
- ❌ デザインの一貫性を保つのが難しい
- ❌ 同じようなコードが複数箇所に散在する
- ❌ 後からの変更コストが高い（全ファイル修正が必要）

## 1. 現状分析サマリー

### 使用されているChakra UIコンポーネント

**最頻出コンポーネント（上位15）:**
1. Box - 55+ 使用箇所 → `<div>` に置き換え
2. Text - 40+ 使用箇所 → `<span>`, `<p>` に置き換え
3. VStack/HStack - 35+ 使用箇所ずつ → Flexbox で実装
4. Button - 30+ 使用箇所 → `<button>` に置き換え
5. Badge - 25+ 使用箇所 → `<span>` に置き換え
6. Card/CardHeader/CardBody - 20+ 使用箇所 → `<div>` の組み合わせ
7. Input - 20+ 使用箇所 → `<input>` に置き換え
8. Avatar - 15+ 使用箇所 → `<img>` に置き換え
9. Table関連 - 15+ セット → `<table>`, `<tr>`, `<td>` に置き換え
10. FormControl/FormLabel - 15+ 使用箇所 → `<label>`, `<div>` に置き換え
11. Select - 12+ 使用箇所 → `<select>` に置き換え
12. Modal関連 - 10+ 使用箇所 → カスタムモーダル実装
13. Menu関連 - 10+ 使用箇所 → カスタムドロップダウン実装
14. Tabs関連 - 8+ 使用箇所 → カスタムタブ実装
15. その他（Alert, Tooltip, Checkbox, Radio, Progress, Stat, Switch等）

## 2. ディレクトリ構造

```
styles/
├── globals.css              # グローバルスタイル、リセットCSS
├── variables.css            # CSS変数（カラー、スペーシング等）
└── pages/                   # ページ固有のスタイル（ページごとに1ファイル）
    ├── index.module.css         # ダッシュボード
    ├── profile.module.css       # プロフィール
    ├── team.module.css          # チームメンバー
    ├── calendar.module.css      # カレンダー
    ├── projects.module.css      # プロジェクト一覧
    ├── projectDetail.module.css # プロジェクト詳細
    ├── tasks.module.css         # タスク一覧
    ├── taskNew.module.css       # タスク作成
    ├── taskEdit.module.css      # タスク編集
    ├── reports.module.css       # レポート
    ├── settings.module.css      # 設定
    ├── layout.module.css        # レイアウト
    ├── header.module.css        # ヘッダー
    └── sidebar.module.css       # サイドバー

components/
├── layout/
│   ├── Layout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
└── ui/                      # 最小限の共通コンポーネント（必要な場合のみ）
    └── (必要に応じて作成)
```

### 共通コンポーネントの方針

アプローチAでは、以下の場合のみ共通コンポーネントを作成：
- **複雑なロジックを持つもの:** Modal, Tooltip, Menu など
- **完全に同じ構造が10箇所以上で使われるもの**

それ以外は各ページで直接実装します。

## 3. デザイントークン（CSS変数）

```css
/* styles/variables.css */
:root {
  /* Colors - Chakra UI のデフォルトテーマから移植 */
  --color-gray-50: #F7FAFC;
  --color-gray-100: #EDF2F7;
  --color-gray-200: #E2E8F0;
  --color-gray-300: #CBD5E0;
  --color-gray-400: #A0AEC0;
  --color-gray-500: #718096;
  --color-gray-600: #4A5568;
  --color-gray-700: #2D3748;
  --color-gray-800: #1A202C;
  --color-gray-900: #171923;

  --color-blue-50: #EBF8FF;
  --color-blue-500: #3182CE;
  --color-blue-600: #2C5282;
  --color-blue-700: #2A4365;

  --color-teal-50: #E6FFFA;
  --color-teal-500: #38B2AC;
  --color-teal-600: #319795;

  --color-green-500: #38A169;
  --color-orange-500: #DD6B20;
  --color-red-500: #E53E3E;

  /* Spacing - Chakra UI のスペーシングスケール */
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */

  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows - Chakra UI のシャドウ */
  --shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Typography */
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-heading: var(--font-body);

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-md: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-normal: 1.5;
  --line-height-short: 1.2;
  --line-height-tall: 1.8;

  /* Transitions */
  --transition-base: all 0.2s ease-in-out;
  --transition-fast: all 0.1s ease-in-out;
  --transition-slow: all 0.3s ease-in-out;

  /* Z-index */
  --z-index-dropdown: 1000;
  --z-index-sticky: 1100;
  --z-index-modal: 1300;
  --z-index-tooltip: 1400;
}
```

## 4. タスク分割とIssue一覧

### Issue #1: プロフィールページの移行

**対象ファイル:**
- `pages/profile.tsx`
- 新規作成: `styles/pages/profile.module.css`

**置き換えるChakra UIコンポーネント:**
- Box → `<div className={styles.container}>`
- Avatar → `<img className={styles.avatar}>`
- Button → `<button className={styles.button}>`
- FormControl → `<div className={styles.formControl}>`
- FormLabel → `<label className={styles.label}>`
- Input → `<input className={styles.input}>`
- Textarea → `<textarea className={styles.textarea}>`
- Badge → `<span className={styles.badge}>`
- Alert → `<div className={styles.alert}>`
- VStack/HStack → `<div className={styles.vstack}>` / `<div className={styles.hstack}>`

**CSS実装例:**
```css
/* styles/pages/profile.module.css */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-8);
}

.avatar {
  width: 128px;
  height: 128px;
  border-radius: var(--radius-full);
  object-fit: cover;
  cursor: pointer;
  transition: var(--transition-base);
}

.avatar:hover {
  opacity: 0.8;
}

.button {
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-blue-500);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}

.button:hover {
  background-color: var(--color-blue-600);
}

.formControl {
  margin-bottom: var(--spacing-4);
}

.label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-medium);
}

.input,
.textarea {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--color-blue-500);
  box-shadow: 0 0 0 1px var(--color-blue-500);
}

.badge {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  background-color: var(--color-gray-100);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.alert {
  padding: var(--spacing-4);
  background-color: var(--color-green-50);
  border-left: 4px solid var(--color-green-500);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-4);
}

.vstack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.hstack {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-4);
  align-items: center;
}
```

**難易度:** ⭐ 低

---

### Issue #2: チームメンバーページの移行

**対象ファイル:**
- `pages/team.tsx`
- 新規作成: `styles/pages/team.module.css`
- 新規作成: `components/ui/Modal.tsx`, `components/ui/Modal.module.css` (モーダルは複雑なため共通化)

**置き換えるChakra UIコンポーネント:**
- Card → `<div className={styles.card}>`
- Avatar → `<img className={styles.avatar}>`
- Badge → `<span className={styles.badge}>`
- Modal → カスタムModalコンポーネント（framer-motion使用）
- Menu → カスタムドロップダウン実装
- SimpleGrid → CSS Grid
- useDisclosure → `useState` で代替
- useToast → react-hot-toast ライブラリを導入

**難易度:** ⭐⭐ 中

---

### Issue #3: カレンダーページの移行

**対象ファイル:**
- `pages/calendar.tsx`
- 新規作成: `styles/pages/calendar.module.css`
- 新規作成: `components/ui/Tooltip.tsx`, `components/ui/Tooltip.module.css`

**置き換えるChakra UIコンポーネント:**
- Box → `<div>`（framer-motion: `motion.div`）
- Button → `<button className={styles.button}>`
- Badge → `<span className={styles.badge}>`
- Modal → Issue #2 で作成した Modal を使用
- Tooltip → カスタムTooltipコンポーネント
- Flex → `<div className={styles.flex}>`

**難易度:** ⭐⭐ 中

---

### Issue #4: 共通レイアウトコンポーネントの移行

**対象ファイル:**
- `components/layout/Layout.tsx`
- `components/layout/Header.tsx`
- `components/layout/Sidebar.tsx`
- 新規作成: `styles/pages/layout.module.css`, `header.module.css`, `sidebar.module.css`
- 新規作成: `components/ui/Menu.tsx`, `components/ui/Menu.module.css`

**置き換えるChakra UIコンポーネント:**
- Box → `<div>`, `<nav>`, `<header>`
- Flex → `<div className={styles.flex}>`
- VStack/HStack → Flexbox
- Avatar → `<img className={styles.avatar}>`
- Menu → カスタムMenuコンポーネント
- Badge → `<span className={styles.badge}>`
- IconButton → `<button className={styles.iconButton}>`
- Link → Next.js `<Link>`（スタイルを追加）
- useColorModeValue → CSS 変数 or 削除（要確認）

**難易度:** ⭐⭐⭐ 高（全ページに影響）

---

### Issue #5: ダッシュボードの移行

**対象ファイル:**
- `pages/index.tsx`
- 新規作成: `styles/pages/index.module.css`

**置き換えるChakra UIコンポーネント:**
- Box → `<div>`
- Card → `<div className={styles.card}>`
- Stat → カスタム実装（`<div>` の組み合わせ）
- Badge → `<span className={styles.badge}>`
- Avatar → `<img className={styles.avatar}>`
- SimpleGrid → CSS Grid

**難易度:** ⭐⭐ 中

---

### Issue #6: プロジェクト一覧ページの移行

**対象ファイル:**
- `pages/projects/index.tsx`
- 新規作成: `styles/pages/projects.module.css`

**置き換えるChakra UIコンポーネント:**
- Table → `<table className={styles.table}>`
- Badge → `<span className={styles.badge}>`
- Avatar → `<img className={styles.avatar}>`
- AvatarGroup → カスタム実装
- Progress → `<div className={styles.progress}>`（プログレスバー）
- Menu → Issue #4 で作成した Menu を使用
- Input → `<input className={styles.input}>`
- InputGroup → カスタム実装
- Tooltip → Issue #3 で作成した Tooltip を使用

**CSS実装例（テーブル）:**
```css
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table thead {
  background-color: var(--color-gray-50);
}

.table th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  border-bottom: 1px solid var(--color-gray-200);
}

.table td {
  padding: var(--spacing-3) var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-100);
}

.table tbody tr {
  transition: var(--transition-fast);
}

.table tbody tr:hover {
  background-color: var(--color-gray-50);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .table {
    display: block;
    overflow-x: auto;
  }
}
```

**難易度:** ⭐⭐⭐ 高

---

### Issue #7: プロジェクト詳細ページの移行

**対象ファイル:**
- `pages/projects/[id].tsx`
- 新規作成: `styles/pages/projectDetail.module.css`

**置き換えるChakra UIコンポーネント:**
- Tabs → カスタムタブ実装（framer-motion使用）
- Card → `<div className={styles.card}>`
- Stat → カスタム実装
- Progress → `<div className={styles.progress}>`
- Checkbox → `<input type="checkbox" className={styles.checkbox}>`
- Table → `<table className={styles.table}>`
- Badge → `<span className={styles.badge}>`
- Avatar → `<img className={styles.avatar}>`
- FormControl → `<div className={styles.formControl}>`

**CSS実装例（タブ）:**
```css
.tabs {
  width: 100%;
}

.tabList {
  display: flex;
  border-bottom: 2px solid var(--color-gray-200);
  gap: var(--spacing-2);
}

.tab {
  padding: var(--spacing-3) var(--spacing-4);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
  position: relative;
  transition: var(--transition-fast);
}

.tab:hover {
  color: var(--color-blue-500);
}

.tab.active {
  color: var(--color-blue-500);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-blue-500);
}

.tabPanel {
  padding: var(--spacing-6) 0;
}
```

**難易度:** ⭐⭐⭐⭐ 最高

---

### Issue #8: タスク一覧ページの移行

**対象ファイル:**
- `pages/tasks/index.tsx`
- 新規作成: `styles/pages/tasks.module.css`

**置き換えるChakra UIコンポーネント:**
- Table → `<table className={styles.table}>`
- Badge → `<span className={styles.badge}>`
- Menu → Issue #4 で作成した Menu を使用
- Select → `<select className={styles.select}>`
- Checkbox → `<input type="checkbox" className={styles.checkbox}>`
- Input → `<input className={styles.input}>`

**難易度:** ⭐⭐⭐ 高

---

### Issue #9: タスク作成/編集ページの移行

**対象ファイル:**
- `pages/tasks/new.tsx`
- `pages/tasks/[id]/edit.tsx`
- 新規作成: `styles/pages/taskNew.module.css`, `taskEdit.module.css`

**置き換えるChakra UIコンポーネント:**
- FormControl → `<div className={styles.formControl}>`
- FormLabel → `<label className={styles.label}>`
- FormErrorMessage → `<span className={styles.error}>`
- Input → `<input className={styles.input}>`
- Textarea → `<textarea className={styles.textarea}>`
- Select → `<select className={styles.select}>`
- Radio → `<input type="radio" className={styles.radio}>`
- Alert → `<div className={styles.alert}>`
- Card → `<div className={styles.card}>`
- Spinner → カスタムスピナー実装

**CSS実装例（ラジオボタン）:**
```css
.radioGroup {
  display: flex;
  gap: var(--spacing-4);
}

.radio {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  cursor: pointer;
  position: relative;
  transition: var(--transition-fast);
}

.radio:checked {
  border-color: var(--color-blue-500);
}

.radio:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: var(--color-blue-500);
  border-radius: var(--radius-full);
}

.radioLabel {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
}
```

**難易度:** ⭐⭐ 中

---

### Issue #10: レポートページの移行

**対象ファイル:**
- `pages/reports.tsx`
- 新規作成: `styles/pages/reports.module.css`

**置き換えるChakra UIコンポーネント:**
- Tabs → Issue #7 で実装したタブパターンを使用
- Stat → カスタム実装
- Table → `<table className={styles.table}>`
- Badge → `<span className={styles.badge}>`
- Tooltip → Issue #3 で作成した Tooltip を使用
- SimpleGrid → CSS Grid
- useToast → react-hot-toast（Issue #2 で導入済み）

**難易度:** ⭐⭐⭐ 高

---

### Issue #11: 設定ページの移行

**対象ファイル:**
- `pages/settings.tsx`
- 新規作成: `styles/pages/settings.module.css`

**置き換えるChakra UIコンポーネント:**
- Tabs → Issue #7 で実装したタブパターンを使用
- FormControl → `<div className={styles.formControl}>`
- Checkbox → `<input type="checkbox" className={styles.checkbox}>`
- Radio → `<input type="radio" className={styles.radio}>`
- Switch → カスタムトグルスイッチ実装
- Select → `<select className={styles.select}>`
- Alert → `<div className={styles.alert}>`

**CSS実装例（トグルスイッチ）:**
```css
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switchInput {
  opacity: 0;
  width: 0;
  height: 0;
}

.switchSlider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-gray-300);
  transition: var(--transition-base);
  border-radius: var(--radius-full);
}

.switchSlider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: var(--transition-base);
  border-radius: var(--radius-full);
}

.switchInput:checked + .switchSlider {
  background-color: var(--color-blue-500);
}

.switchInput:checked + .switchSlider::before {
  transform: translateX(20px);
}
```

**難易度:** ⭐⭐ 中

---

### Issue #12: Chakra UI完全削除と最終調整

**対象:**
- すべてのファイル
- `package.json`
- `pages/_app.tsx`
- `pages/_document.tsx`

**作業内容:**
1. Chakra UI 関連パッケージの削除:
   ```bash
   npm uninstall @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled @emotion/cache
   ```
2. react-hot-toast のインストール（Issue #2で必要）:
   ```bash
   npm install react-hot-toast
   ```
3. `pages/_app.tsx` から ChakraProvider の削除
4. `pages/_document.tsx` から Emotion 関連の削除
5. すべてのページで動作確認
6. レスポンシブデザインの最終確認
7. アクセシビリティチェック
8. パフォーマンステスト
9. バンドルサイズの確認

**難易度:** ⭐⭐ 中

---

## 5. 移行における技術的考慮事項

### 1. レスポンシブデザイン

各ページの CSS Modules で直接メディアクエリを記述：

```css
/* モバイルファースト */
.container {
  padding: var(--spacing-4);
}

/* タブレット */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

### 2. framer-motion の統合

```typescript
// Before (Chakra UI)
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
const MotionBox = motion(Box);

// After (CSS Modules)
import { motion } from 'framer-motion';
import styles from './profile.module.css';
const MotionDiv = motion.div;

<MotionDiv className={styles.container} {...motionProps}>
```

### 3. useDisclosure の代替

```typescript
// Before
import { useDisclosure } from '@chakra-ui/react';
const { isOpen, onOpen, onClose } = useDisclosure();

// After
import { useState } from 'react';
const [isOpen, setIsOpen] = useState(false);
const onOpen = () => setIsOpen(true);
const onClose = () => setIsOpen(false);
```

### 4. useToast の代替

```typescript
// Issue #2 で react-hot-toast を導入
import toast, { Toaster } from 'react-hot-toast';

// 使用例
toast.success('保存しました！');
toast.error('エラーが発生しました');

// _app.tsx に追加
<Toaster position="top-right" />
```

### 5. アクセシビリティ

各フォーム要素に適切な属性を追加：
- `aria-label`
- `aria-describedby`
- `role`
- `:focus-visible` でフォーカスインジケーター

## 6. アプローチAの推奨作業順序

1. **Issue #12 の一部を先に実行:** CSS 変数ファイルの作成
2. **Issue #1:** プロフィールページ（パターン確立）
3. **Issue #2:** チームメンバーページ（Modal, Toast導入）
4. **Issue #3:** カレンダーページ（Tooltip導入）
5. **Issue #4:** 共通レイアウト（Menu導入）
6. **Issue #5:** ダッシュボード
7. **Issue #9:** タスクフォーム
8. **Issue #11:** 設定ページ
9. **Issue #8:** タスク一覧
10. **Issue #6:** プロジェクト一覧
11. **Issue #10:** レポート
12. **Issue #7:** プロジェクト詳細（最も複雑）
13. **Issue #12:** 完全削除と最終調整

## 7. 成功基準

各 issue 完了時に以下を確認：

1. ✅ before/after スクリーンショットで視覚的に同等
2. ✅ レスポンシブデザインが正しく動作
3. ✅ framer-motion アニメーションが維持されている
4. ✅ インタラクション（ホバー、フォーカス、クリック）が正しく動作
5. ✅ フォームバリデーションが正しく動作
6. ✅ TypeScript エラーがない
7. ✅ ビルドが成功する

## 8. まとめ

### アプローチAの特徴

**メリット:**
- シンプルで理解しやすい
- 各ページが独立しており、並行作業が容易
- 学習コストが低い

**デメリット:**
- スタイルの重複が発生
- デザインの一貫性を保つのが難しい
- 後からの変更コストが高い

**推奨される場合:**
- チームメンバーが CSS に慣れている
- プロジェクトの規模が小さい
- 短期間で移行を完了させたい
- 各ページのデザインが独自性を持っている

**総Issue数:** 12
**推定作業期間:** 8〜15日
