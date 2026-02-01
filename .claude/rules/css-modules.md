# CSS Modules コーディング規約

## ファイル配置
- ページ用: `styles/pages/<page-name>.module.css`
- 共通UI: `components/ui/<Component>.module.css`

## 命名規則
- クラス名: camelCase（例: `.cardHeader`, `.buttonPrimary`）
- CSS変数: kebab-case（例: `var(--color-blue-500)`）

## CSS変数
必ず `styles/variables.css` の変数を使用：
- 色: `var(--color-xxx-nnn)`
- スペーシング: `var(--spacing-n)`
- 角丸: `var(--radius-xxx)`
- シャドウ: `var(--shadow-xxx)`
- フォント: `var(--font-xxx)`

## レスポンシブ
モバイルファースト + メディアクエリ:
```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}
```

## framer-motion統合
```tsx
import { motion } from 'framer-motion';
import styles from './xxx.module.css';

<motion.div className={styles.card} {...motionProps}>
```
