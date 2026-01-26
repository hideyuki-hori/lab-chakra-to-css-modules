# Step3-B: Chakra UI から CSS Modules への移行計画（アプローチB: 共通UIコンポーネント方式）

## アプローチB の概要

**共通UIコンポーネントライブラリ構築方式**

- Chakra UI の代替となる共通UIコンポーネントライブラリを構築
- 各ページは共通UIコンポーネントを使用
- デザインの一貫性が高く、メンテナンスしやすい
- 初期コストは高いが、長期的には効率的

### メリット
- ✅ デザインの一貫性が保たれる
- ✅ コードの再利用性が高い
- ✅ メンテナンスが容易（1箇所修正すれば全体に反映）
- ✅ Chakra UI と同様の使い勝手を維持
- ✅ 後からのカスタマイズが容易

### デメリット
- ❌ 初期の実装コストが高い
- ❌ 共通コンポーネント設計に時間がかかる
- ❌ 学習コストがやや高い（コンポーネントAPIの理解が必要）
- ❌ 最初の issue が完了するまで他の issue に着手しにくい

## 1. 現状分析サマリー

### 使用されているChakra UIコンポーネント

**最頻出コンポーネント（上位15）:**
1. Box - 55+ 使用箇所
2. Text - 40+ 使用箇所
3. VStack/HStack - 35+ 使用箇所ずつ
4. Button - 30+ 使用箇所
5. Badge - 25+ 使用箇所
6. Card/CardHeader/CardBody - 20+ 使用箇所
7. Input - 20+ 使用箇所
8. Avatar - 15+ 使用箇所
9. Table関連 - 15+ セット
10. FormControl/FormLabel - 15+ 使用箇所
11. Select - 12+ 使用箇所
12. Modal関連 - 10+ 使用箇所
13. Menu関連 - 10+ 使用箇所
14. Tabs関連 - 8+ 使用箇所
15. その他（Alert, Tooltip, Checkbox, Radio, Progress, Stat, Switch等）

→ これらすべてを `components/ui/` 配下に共通コンポーネントとして実装

## 2. ディレクトリ構造

```
components/
├── layout/
│   ├── Layout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
└── ui/                          # 共通UIコンポーネントライブラリ
    ├── Box.tsx                  # 基本コンテナ
    ├── Box.module.css
    ├── Text.tsx                 # テキスト表示
    ├── Text.module.css
    ├── Button.tsx               # ボタン
    ├── Button.module.css
    ├── Badge.tsx                # バッジ
    ├── Badge.module.css
    ├── Card.tsx                 # カード（Card, CardHeader, CardBody）
    ├── Card.module.css
    ├── Input.tsx                # 入力フィールド
    ├── Input.module.css
    ├── Textarea.tsx             # テキストエリア
    ├── Textarea.module.css
    ├── Select.tsx               # セレクトボックス
    ├── Select.module.css
    ├── Checkbox.tsx             # チェックボックス
    ├── Checkbox.module.css
    ├── Radio.tsx                # ラジオボタン
    ├── Radio.module.css
    ├── Switch.tsx               # トグルスイッチ
    ├── Switch.module.css
    ├── Avatar.tsx               # アバター
    ├── Avatar.module.css
    ├── Table.tsx                # テーブル（Table, Thead, Tbody, Tr, Th, Td）
    ├── Table.module.css
    ├── Modal.tsx                # モーダル（framer-motion使用）
    ├── Modal.module.css
    ├── Menu.tsx                 # ドロップダウンメニュー
    ├── Menu.module.css
    ├── Tabs.tsx                 # タブ（Tabs, TabList, Tab, TabPanels, TabPanel）
    ├── Tabs.module.css
    ├── Alert.tsx                # アラート
    ├── Alert.module.css
    ├── Tooltip.tsx              # ツールチップ
    ├── Tooltip.module.css
    ├── Progress.tsx             # プログレスバー
    ├── Progress.module.css
    ├── Stat.tsx                 # 統計カード
    ├── Stat.module.css
    ├── Stack.tsx                # VStack, HStack
    ├── Stack.module.css
    ├── FormControl.tsx          # フォーム関連
    ├── FormControl.module.css
    ├── Spinner.tsx              # ローディングスピナー
    ├── Spinner.module.css
    ├── IconButton.tsx           # アイコンボタン
    ├── IconButton.module.css
    └── index.ts                 # 一括エクスポート

styles/
├── globals.css                  # グローバルスタイル、リセットCSS
├── variables.css                # CSS変数（カラー、スペーシング等）
└── pages/                       # ページ固有のスタイル（必要に応じて）
    ├── index.module.css
    ├── profile.module.css
    ├── team.module.css
    ├── calendar.module.css
    ├── projects.module.css
    ├── projectDetail.module.css
    ├── tasks.module.css
    ├── taskForm.module.css
    ├── reports.module.css
    └── settings.module.css
```

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
  --color-blue-100: #BEE3F8;
  --color-blue-500: #3182CE;
  --color-blue-600: #2C5282;
  --color-blue-700: #2A4365;

  --color-teal-50: #E6FFFA;
  --color-teal-100: #B2F5EA;
  --color-teal-500: #38B2AC;
  --color-teal-600: #319795;

  --color-green-50: #F0FFF4;
  --color-green-100: #C6F6D5;
  --color-green-500: #38A169;
  --color-green-600: #2F855A;

  --color-orange-50: #FFFAF0;
  --color-orange-100: #FEEBC8;
  --color-orange-500: #DD6B20;
  --color-orange-600: #C05621;

  --color-red-50: #FFF5F5;
  --color-red-100: #FED7D7;
  --color-red-500: #E53E3E;
  --color-red-600: #C53030;

  /* Spacing - Chakra UI のスペーシングスケール */
  --spacing-0: 0;
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
  --spacing-20: 5rem;     /* 80px */

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  /* Shadows - Chakra UI のシャドウ */
  --shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Typography */
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-heading: var(--font-body);
  --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", monospace;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-md: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Transitions */
  --transition-base: all 0.2s ease-in-out;
  --transition-fast: all 0.1s ease-in-out;
  --transition-slow: all 0.3s ease-in-out;

  /* Z-index */
  --z-index-hide: -1;
  --z-index-base: 0;
  --z-index-dropdown: 1000;
  --z-index-sticky: 1100;
  --z-index-modal: 1300;
  --z-index-popover: 1400;
  --z-index-tooltip: 1500;
}
```

## 4. 共通UIコンポーネントの設計例

### Button コンポーネント

```typescript
// components/ui/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'blue' | 'teal' | 'green' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  colorScheme = 'blue',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[colorScheme],
    styles[size],
    isLoading && styles.loading,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className={styles.spinner} />}
      {!isLoading && leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
      {!isLoading && rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  );
};
```

```css
/* components/ui/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  cursor: pointer;
  border: 1px solid transparent;
  font-family: var(--font-body);
  white-space: nowrap;
}

.button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Sizes */
.sm {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  min-height: 32px;
}

.md {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-md);
  min-height: 40px;
}

.lg {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
  min-height: 48px;
}

/* Variants - Blue */
.solid.blue {
  background-color: var(--color-blue-500);
  color: white;
}

.solid.blue:hover:not(:disabled) {
  background-color: var(--color-blue-600);
}

.outline.blue {
  border-color: var(--color-blue-500);
  color: var(--color-blue-500);
}

.outline.blue:hover:not(:disabled) {
  background-color: var(--color-blue-50);
}

.ghost.blue {
  color: var(--color-blue-500);
}

.ghost.blue:hover:not(:disabled) {
  background-color: var(--color-blue-50);
}

/* Variants - Teal */
.solid.teal {
  background-color: var(--color-teal-500);
  color: white;
}

.solid.teal:hover:not(:disabled) {
  background-color: var(--color-teal-600);
}

/* ... 他のカラースキーム ... */

/* Loading */
.loading {
  position: relative;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.leftIcon,
.rightIcon {
  display: inline-flex;
  align-items: center;
}
```

### Card コンポーネント

```typescript
// components/ui/Card.tsx
import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outline' | 'filled';
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  className,
  children,
  ...props
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`${styles.cardHeader} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={`${styles.cardBody} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
```

```css
/* components/ui/Card.module.css */
.card {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.elevated {
  background-color: white;
  box-shadow: var(--shadow-md);
}

.outline {
  background-color: white;
  border: 1px solid var(--color-gray-200);
}

.filled {
  background-color: var(--color-gray-50);
}

.cardHeader {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-gray-200);
}

.cardBody {
  padding: var(--spacing-6);
}
```

### Modal コンポーネント（framer-motion使用）

```typescript
// components/ui/Modal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`${styles.modal} ${styles[size]}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className={styles.modalHeader} {...props}>
    {children}
  </div>
);

export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className={styles.modalBody} {...props}>
    {children}
  </div>
);

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className={styles.modalFooter} {...props}>
    {children}
  </div>
);

export const ModalCloseButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  ...props
}) => (
  <button className={styles.closeButton} onClick={onClick} {...props}>
    ✕
  </button>
);
```

## 5. タスク分割とIssue一覧

### Issue #1: 基盤構築 - CSS変数とユーティリティ

**作業内容:**
1. `styles/variables.css` の作成（デザイントークン定義）
2. `styles/globals.css` の更新（リセットCSS、グローバルスタイル）
3. react-hot-toast のインストール
4. `components/ui/index.ts` の作成（エクスポート用）

**成果物:**
- CSS変数システム
- グローバルスタイル

**難易度:** ⭐ 低
**推定時間:** 0.5日

---

### Issue #2: 基本UIコンポーネント（レイアウト系）

**対象コンポーネント:**
- Box
- Text
- Stack (VStack, HStack)

**実装内容:**
- `components/ui/Box.tsx`, `Box.module.css`
- `components/ui/Text.tsx`, `Text.module.css`
- `components/ui/Stack.tsx`, `Stack.module.css`

**API設計例:**
```typescript
// Box: Chakra UIと同等のAPI
<Box p={4} bg="gray.50" borderRadius="md">

// Text
<Text fontSize="lg" fontWeight="bold" color="blue.500">

// Stack
<VStack spacing={4} align="stretch">
<HStack spacing={2}>
```

**難易度:** ⭐ 低
**推定時間:** 1日

---

### Issue #3: フォーム関連UIコンポーネント

**対象コンポーネント:**
- Button
- Input
- Textarea
- Select
- FormControl, FormLabel, FormErrorMessage
- Checkbox
- Radio
- Switch

**実装内容:**
- 各コンポーネントの `.tsx` と `.module.css` を作成
- Chakra UI と同等のprops APIを提供
- アクセシビリティ対応（aria属性、フォーカス管理）

**難易度:** ⭐⭐⭐ 高
**推定時間:** 2〜3日

---

### Issue #4: 表示系UIコンポーネント

**対象コンポーネント:**
- Badge
- Avatar (AvatarGroup含む)
- Card (CardHeader, CardBody含む)
- Alert
- Spinner

**実装内容:**
- 各コンポーネントの `.tsx` と `.module.css` を作成
- カラースキーム対応（blue, teal, green, red, orange等）

**難易度:** ⭐⭐ 中
**推定時間:** 1.5日

---

### Issue #5: インタラクティブUIコンポーネント（その1）

**対象コンポーネント:**
- Modal (ModalHeader, ModalBody, ModalFooter, ModalCloseButton含む)
- Tooltip

**実装内容:**
- framer-motion を使用したアニメーション実装
- ポータル機能（document.body に描画）
- フォーカストラップ（Modal）
- Escキーで閉じる機能

**難易度:** ⭐⭐⭐ 高
**推定時間:** 1.5日

---

### Issue #6: インタラクティブUIコンポーネント（その2）

**対象コンポーネント:**
- Menu (MenuButton, MenuList, MenuItem, MenuDivider含む)
- Tabs (TabList, Tab, TabPanels, TabPanel含む)

**実装内容:**
- キーボードナビゲーション対応
- アクティブ状態管理
- framer-motion アニメーション（Tabs）

**難易度:** ⭐⭐⭐⭐ 最高
**推定時間:** 2日

---

### Issue #7: テーブル・統計系UIコンポーネント

**対象コンポーネント:**
- Table (Thead, Tbody, Tr, Th, Td含む)
- Stat (StatLabel, StatNumber, StatHelpText, StatArrow含む)
- Progress
- IconButton

**実装内容:**
- レスポンシブテーブル対応
- ホバー、ストライプなどのバリアント
- 統計カードのレイアウト

**難易度:** ⭐⭐ 中
**推定時間:** 1.5日

---

### Issue #8: 共通レイアウトコンポーネントの移行

**対象ファイル:**
- `components/layout/Layout.tsx`
- `components/layout/Header.tsx`
- `components/layout/Sidebar.tsx`

**置き換え内容:**
- Chakra UI コンポーネントを Issue #2〜#7 で作成した共通UIコンポーネントに置き換え
- framer-motion アニメーション維持（Sidebar の layoutId）

**難易度:** ⭐⭐⭐ 高（全ページに影響）
**推定時間:** 1日

---

### Issue #9: プロフィールページの移行

**対象ファイル:**
- `pages/profile.tsx`
- 新規作成: `styles/pages/profile.module.css`（ページ固有スタイル用）

**置き換え内容:**
- すべてのChakra UIコンポーネントを共通UIコンポーネントに置き換え
- framer-motion アニメーション維持

**難易度:** ⭐ 低
**推定時間:** 0.5日

---

### Issue #10: チームメンバーページの移行

**対象ファイル:**
- `pages/team.tsx`
- 新規作成: `styles/pages/team.module.css`

**置き換え内容:**
- Card, Avatar, Badge, Modal, Menu等を共通UIコンポーネントに置き換え
- react-hot-toast を使用（useToastの代替）

**難易度:** ⭐⭐ 中
**推定時間:** 0.5日

---

### Issue #11: カレンダーページの移行

**対象ファイル:**
- `pages/calendar.tsx`
- 新規作成: `styles/pages/calendar.module.css`

**置き換え内容:**
- Modal, Tooltip, Badge等を共通UIコンポーネントに置き換え
- framer-motion のスライドアニメーション維持

**難易度:** ⭐⭐ 中
**推定時間:** 0.5日

---

### Issue #12: ダッシュボードの移行

**対象ファイル:**
- `pages/index.tsx`
- 新規作成: `styles/pages/index.module.css`

**置き換え内容:**
- Card, Stat, Badge等を共通UIコンポーネントに置き換え

**難易度:** ⭐ 低
**推定時間:** 0.5日

---

### Issue #13: プロジェクト一覧ページの移行

**対象ファイル:**
- `pages/projects/index.tsx`
- 新規作成: `styles/pages/projects.module.css`

**置き換え内容:**
- Table, Menu, Progress, Tooltip等を共通UIコンポーネントに置き換え
- framer-motion のテーブル行アニメーション維持

**難易度:** ⭐⭐ 中
**推定時間:** 1日

---

### Issue #14: プロジェクト詳細ページの移行

**対象ファイル:**
- `pages/projects/[id].tsx`
- 新規作成: `styles/pages/projectDetail.module.css`

**置き換え内容:**
- Tabs, Card, Stat, Table等を共通UIコンポーネントに置き換え
- Tabsの切り替えアニメーション維持

**難易度:** ⭐⭐⭐ 高
**推定時間:** 1日

---

### Issue #15: タスク一覧ページの移行

**対象ファイル:**
- `pages/tasks/index.tsx`
- 新規作成: `styles/pages/tasks.module.css`

**置き換え内容:**
- Table, Menu, Select, Checkbox等を共通UIコンポーネントに置き換え
- framer-motion の削除アニメーション維持

**難易度:** ⭐⭐ 中
**推定時間:** 1日

---

### Issue #16: タスク作成/編集ページの移行

**対象ファイル:**
- `pages/tasks/new.tsx`
- `pages/tasks/[id]/edit.tsx`
- 新規作成: `styles/pages/taskForm.module.css`

**置き換え内容:**
- FormControl, Input, Textarea, Select, Radio, Alert等を共通UIコンポーネントに置き換え

**難易度:** ⭐⭐ 中
**推定時間:** 1日

---

### Issue #17: レポートページの移行

**対象ファイル:**
- `pages/reports.tsx`
- 新規作成: `styles/pages/reports.module.css`

**置き換え内容:**
- Tabs, Stat, Table等を共通UIコンポーネントに置き換え
- react-hot-toast を使用

**難易度:** ⭐⭐ 中
**推定時間:** 0.5日

---

### Issue #18: 設定ページの移行

**対象ファイル:**
- `pages/settings.tsx`
- 新規作成: `styles/pages/settings.module.css`

**置き換え内容:**
- Tabs, FormControl, Checkbox, Radio, Switch等を共通UIコンポーネントに置き換え

**難易度:** ⭐⭐ 中
**推定時間:** 0.5日

---

### Issue #19: Chakra UI完全削除と最終調整

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
2. `pages/_app.tsx` から ChakraProvider の削除、Toaster の追加
3. `pages/_document.tsx` から Emotion 関連の削除
4. すべてのページで動作確認
5. レスポンシブデザインの最終確認
6. アクセシビリティチェック
7. パフォーマンステスト
8. バンドルサイズの確認
9. TypeScript エラーの最終チェック

**難易度:** ⭐⭐ 中
**推定時間:** 1日

---

## 6. 推奨作業順序

アプローチBは依存関係が明確なため、以下の順序で進める必要があります：

1. **Issue #1:** 基盤構築（CSS変数）
2. **Issue #2:** 基本UIコンポーネント（Box, Text, Stack）
3. **Issue #3:** フォーム関連UIコンポーネント
4. **Issue #4:** 表示系UIコンポーネント
5. **Issue #5:** インタラクティブUIコンポーネント（その1）
6. **Issue #6:** インタラクティブUIコンポーネント（その2）
7. **Issue #7:** テーブル・統計系UIコンポーネント

**↓ ここまで完了したら、以下は並行作業可能 ↓**

8. **Issue #8:** 共通レイアウト（優先）
9. **Issue #9:** プロフィール
10. **Issue #10:** チームメンバー
11. **Issue #11:** カレンダー
12. **Issue #12:** ダッシュボード
13. **Issue #13:** プロジェクト一覧
14. **Issue #14:** プロジェクト詳細
15. **Issue #15:** タスク一覧
16. **Issue #16:** タスクフォーム
17. **Issue #17:** レポート
18. **Issue #18:** 設定
19. **Issue #19:** 完全削除と最終調整

## 7. 共通UIコンポーネントのエクスポート

```typescript
// components/ui/index.ts
export { Box } from './Box';
export type { BoxProps } from './Box';

export { Text } from './Text';
export type { TextProps } from './Text';

export { VStack, HStack } from './Stack';
export type { StackProps } from './Stack';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

export { Select } from './Select';
export type { SelectProps } from './Select';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { Radio, RadioGroup } from './Radio';
export type { RadioProps, RadioGroupProps } from './Radio';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Avatar, AvatarGroup } from './Avatar';
export type { AvatarProps, AvatarGroupProps } from './Avatar';

export { Card, CardHeader, CardBody } from './Card';
export type { CardProps } from './Card';

export { Alert } from './Alert';
export type { AlertProps } from './Alert';

export { Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';

export { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from './Modal';
export type { ModalProps } from './Modal';

export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from './Menu';
export type { MenuProps } from './Menu';

export { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
export type { TabsProps } from './Tabs';

export { Table, Thead, Tbody, Tr, Th, Td } from './Table';
export type { TableProps } from './Table';

export { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from './Stat';
export type { StatProps } from './Stat';

export { Progress } from './Progress';
export type { ProgressProps } from './Progress';

export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';

export { FormControl, FormLabel, FormErrorMessage } from './FormControl';
export type { FormControlProps } from './FormControl';
```

## 8. 使用例（移行前後の比較）

### Before (Chakra UI)
```typescript
import { Box, Button, Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';

<Box p={8} bg="gray.50">
  <Card>
    <CardHeader>
      <Heading size="md">プロジェクト</Heading>
    </CardHeader>
    <CardBody>
      <Text>プロジェクトの説明</Text>
      <Button colorScheme="blue" size="md" mt={4}>
        詳細を見る
      </Button>
    </CardBody>
  </Card>
</Box>
```

### After (共通UIコンポーネント)
```typescript
import { Box, Button, Card, CardHeader, CardBody, Text } from '@/components/ui';

<Box p={8} bg="gray.50">
  <Card>
    <CardHeader>
      <Text as="h3" fontSize="lg" fontWeight="semibold">プロジェクト</Text>
    </CardHeader>
    <CardBody>
      <Text>プロジェクトの説明</Text>
      <Button colorScheme="blue" size="md" mt={4}>
        詳細を見る
      </Button>
    </CardBody>
  </Card>
</Box>
```

**ほぼ同じAPI！**

## 9. 成功基準

各 issue 完了時に以下を確認：

1. ✅ before/after スクリーンショットで視覚的に同等
2. ✅ レスポンシブデザインが正しく動作
3. ✅ framer-motion アニメーションが維持されている
4. ✅ インタラクション（ホバー、フォーカス、クリック）が正しく動作
5. ✅ フォームバリデーションが正しく動作
6. ✅ TypeScript エラーがない
7. ✅ ビルドが成功する
8. ✅ 共通UIコンポーネントのAPIがChakra UIと同等

## 10. まとめ

### アプローチBの特徴

**メリット:**
- デザインの一貫性が保たれる
- コードの再利用性が高い
- メンテナンスが容易
- Chakra UI と同様の使い勝手を維持
- 後からのカスタマイズが容易

**デメリット:**
- 初期の実装コストが高い
- 共通コンポーネント設計に時間がかかる
- Issue #1〜#7 が完了するまで他の issue に着手できない

**推奨される場合:**
- 長期的にメンテナンスするプロジェクト
- チームで作業する場合
- デザインシステムを構築したい場合
- Chakra UI の使い勝手を維持したい場合
- 将来的なカスタマイズを想定している場合

**総Issue数:** 19
**推定作業期間:** 15〜25日
**並行作業:** Issue #8 以降は並行作業可能
