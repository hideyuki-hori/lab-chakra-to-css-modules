# Issue #173 Worker TODO

対象コンポーネント: Button, IconButton, CloseButton

## 使用箇所一覧

### Button（36箇所）

#### ページ
- src/pages/profile.tsx (3箇所)
  - L123-130: `<Button as="label" htmlFor="avatar-upload" colorScheme="blue" size="sm" cursor="pointer">`
  - L175: `<Button variant="outline">キャンセル</Button>`
  - L180: `<Button colorScheme="blue" type="submit">保存</Button>`

- src/pages/login.tsx (1箇所)
  - L69-78: `<Button variant="outline" size="lg" w="full" leftIcon={<FcGoogle />} onClick={...} isLoading={loading}>`

- src/pages/calendar.tsx (3箇所)
  - L120: `<Button onClick={handlePrevMonth}>前月</Button>`
  - L124: `<Button onClick={handleNextMonth}>次月</Button>`
  - L260: `<Button colorScheme="blue" mr={3} onClick={onClose}>閉じる</Button>`

- src/pages/tasks/[id]/edit.tsx (4箇所)
  - L168: `<Button colorScheme="primary" onClick={...}>タスク一覧に戻る</Button>`
  - L194-201: `<Button leftIcon={<FiTrash2 />} colorScheme="red" variant="outline" size="sm" onClick={handleDelete}>`
  - L398-404: `<Button leftIcon={<FiX />} variant="ghost" onClick={...} isDisabled={isSubmitting}>`
  - L406-412: `<Button leftIcon={<FiSave />} colorScheme="primary" type="submit" isLoading={isSubmitting} loadingText="保存中...">`

- src/pages/tasks/new.tsx (2箇所)
  - L289-295: `<Button leftIcon={<FiX />} variant="ghost" onClick={...} isDisabled={isSubmitting}>`
  - L297-303: `<Button leftIcon={<FiSave />} colorScheme="primary" type="submit" isLoading={isSubmitting} loadingText="作成中...">`

- src/pages/tasks/index.tsx (1箇所)
  - L216-221: `<Button leftIcon={<FiPlus />} colorScheme="primary" onClick={...}>新規タスク</Button>`

- src/pages/team.tsx (3箇所)
  - L97: `<Button colorScheme="blue" onClick={onOpen} style={{ boxShadow: '...' }}>メンバー追加</Button>`
  - L214: `<Button variant="ghost" mr={3} onClick={onClose}>キャンセル</Button>`
  - L217: `<Button colorScheme="blue" type="submit">追加</Button>`

- src/pages/settings.tsx (8箇所)
  - L159: `<Button variant="outline">キャンセル</Button>`
  - L160: `<Button colorScheme="blue" type="submit">保存</Button>`
  - L269: `<Button variant="outline">キャンセル</Button>`
  - L270: `<Button colorScheme="blue" onClick={...}>保存</Button>`
  - L320: `<Button variant="outline">キャンセル</Button>`
  - L321: `<Button colorScheme="blue">保存</Button>`
  - L376: `<Button variant="outline">キャンセル</Button>`
  - L377: `<Button colorScheme="blue" onClick={...}>保存</Button>`

- src/pages/projects/index.tsx (1箇所)
  - L119-128: `<Button leftIcon={<FiPlus />} colorScheme="primary" onClick={...}>新規プロジェクト</Button>`

- src/pages/projects/[id].tsx (5箇所)
  - L72: `<Button mt={4} onClick={...}>プロジェクト一覧へ</Button>`
  - L225: `<Button leftIcon={<FiEdit2 />} colorScheme="primary">編集</Button>`
  - L425: `<Button leftIcon={<FiCheckCircle />} size="sm" colorScheme="primary">新規タスク</Button>`
  - L525: `<Button leftIcon={<FiUsers />} size="sm" colorScheme="primary">メンバー追加</Button>`
  - L675-676: `<Button variant="outline">キャンセル</Button>`, `<Button colorScheme="primary">保存</Button>`

- src/pages/reports.tsx (2箇所)
  - L71-75: `<Button colorScheme="green" onClick={...}>Excelエクスポート</Button>`
  - L77: `<Button colorScheme="blue" onClick={...}>PDFエクスポート</Button>`

#### コンポーネント
- src/components/modal/ConfirmModal.tsx (2箇所)
  - L68: `<Button variant="ghost" onClick={onClose} isDisabled={isLoading}>`
  - L71-75: `<Button colorScheme={confirmColorScheme} onClick={onConfirm} isLoading={isLoading}>`

- src/components/modal/FormModal.tsx (2箇所)
  - L62: `<Button variant="ghost" mr={3} onClick={onClose} isDisabled={isLoading}>`
  - L65: `<Button colorScheme={submitColorScheme} type="submit" isLoading={isLoading}>`

- src/components/ui/EmptyState.tsx (1箇所)
  - L43: `<Button colorScheme="primary" size="sm" onClick={onAction}>`

- src/components/ui/Button.tsx (カスタムラッパー)
  - Chakra UIのButtonをラップしたカスタムコンポーネント

### IconButton（3箇所）
- src/pages/projects/[id].tsx (1箇所)
  - L209-214: `<IconButton icon={<FiArrowLeft />} aria-label="戻る" variant="ghost" onClick={...} />`

- src/components/form/SearchInput.tsx (1箇所)
  - L45-51: `<IconButton aria-label="クリア" icon={<FiX />} size="sm" variant="ghost" onClick={handleClear} />`

- src/components/layout/Header.tsx (1箇所)
  - L57-63: `<IconButton aria-label="通知" icon={<FiBell />} variant="ghost" position="relative" size="lg">`

### CloseButton（1箇所）
- src/components/common/Alert.tsx (1箇所)
  - L42-48: `<CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose} />`

## 使用されているprops

### Button
| prop | 使用例 |
|------|--------|
| colorScheme | "blue", "primary", "red", "green" |
| variant | "outline", "ghost", "solid"(デフォルト) |
| size | "sm", "md"(デフォルト), "lg" |
| type | "submit", "button"(デフォルト) |
| leftIcon | `<FiPlus />`, `<FiSave />`, `<FiX />`, `<FiTrash2 />`, `<FiEdit2 />`, `<FiCheckCircle />`, `<FiUsers />`, `<FcGoogle />` |
| onClick | イベントハンドラ |
| isLoading | true/false |
| loadingText | "保存中...", "作成中..." |
| isDisabled | true/false |
| as | "label" |
| htmlFor | フォーム要素のID |
| cursor | "pointer" |
| mr | {3} |
| mt | {4} |
| w | "full" |
| style | インラインスタイル（boxShadow, borderWidth） |

### IconButton
| prop | 使用例 |
|------|--------|
| icon | `<FiArrowLeft />`, `<FiX />`, `<FiBell />` |
| aria-label | "戻る", "クリア", "通知"（必須） |
| variant | "ghost" |
| size | "sm", "lg" |
| onClick | イベントハンドラ |
| position | "relative" |

### CloseButton
| prop | 使用例 |
|------|--------|
| alignSelf | "flex-start" |
| position | "relative" |
| right | {-1} |
| top | {-1} |
| onClick | イベントハンドラ |

## Chakra UI API仕様（v2）

### Button
- colorScheme: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | "whiteAlpha" | "blackAlpha"
- variant: "solid" | "outline" | "ghost" | "link"
- size: "xs" | "sm" | "md" | "lg"
- isLoading: boolean
- isDisabled: boolean
- leftIcon / rightIcon: ReactElement
- loadingText: string

### IconButton
- Buttonと同じpropsに加えて:
- icon: ReactElement（必須）
- aria-label: string（必須）

### CloseButton
- size: "sm" | "md" | "lg"

## カスタムButton.tsx（src/components/ui/Button.tsx）

既存のカスタムButtonコンポーネントが存在:
- variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
- size: 'sm' | 'md' | 'lg'
- isAnimated: boolean（framer-motionによるアニメーション）

このカスタムコンポーネントは、Chakra UI直接使用とは別の抽象化レイヤーを提供している。

## 実装上の注意点

### colorSchemeの対応
- Chakra UIのcolorSchemeをCSS変数とクラスで対応
- primary, blue, red, greenなどのカラーパレット

### variantの対応
- solid, outline, ghost, linkの各スタイルをCSS Modulesで実装

### sizeの対応
- xs, sm, md, lgの各サイズをCSS Modulesで実装

### leftIcon対応
- アイコンとテキストの配置をflexboxで実装
- iconSpacingの調整

### isLoading対応
- ローディングスピナーの表示
- loadingTextの表示

### isDisabled対応
- 無効状態のスタイリング

### カスタムButton.tsx（src/components/ui/Button.tsx）の扱い
- 既存のカスタムButtonコンポーネントをCSS Modules版に移行
- isAnimatedはframer-motionに依存（CSS Modulesでは対応不可）

### IconButton
- Buttonの一種として実装
- aria-label必須を型で保証

### CloseButton
- 固定のXアイコンを持つ特殊なボタン
- サイズバリエーションのみ

## タスク

### コンポーネント作成
1. [ ] src/components/ui/Button.module.css を作成
2. [ ] src/components/ui/Button.tsx をCSS Modules版に更新
3. [ ] src/components/ui/IconButton.tsx を作成
4. [ ] src/components/ui/IconButton.module.css を作成
5. [ ] src/components/ui/CloseButton.tsx を作成
6. [ ] src/components/ui/CloseButton.module.css を作成

### エクスポート追加
7. [ ] src/components/ui/index.ts にexport追加

### 比較ページ作成
8. [ ] src/pages/compare/Button.tsx を作成（Chakra版と新版を並べて表示）

### ビルド確認
9. [ ] npm run build でエラーがないことを確認
