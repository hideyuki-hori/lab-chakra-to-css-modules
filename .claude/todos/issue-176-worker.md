# Issue #176 Worker TODO

## 対象コンポーネント
FormControl, FormLabel, FormErrorMessage, FormHelperText

## 使用箇所

### ページ
- `src/pages/team.tsx` - FormControl, FormLabel
- `src/pages/settings.tsx` - FormControl, FormLabel
- `src/pages/profile.tsx` - FormControl, FormLabel
- `src/pages/projects/[id].tsx` - FormControl, FormLabel
- `src/pages/tasks/[id]/edit.tsx` - FormControl, FormLabel, FormErrorMessage
- `src/pages/tasks/new.tsx` - FormControl, FormLabel, FormErrorMessage

### フォームコンポーネント
- `src/components/form/FormInput.tsx` - FormControl, FormLabel, FormErrorMessage, FormHelperText
- `src/components/form/FormTextarea.tsx` - FormControl, FormLabel, FormErrorMessage, FormHelperText
- `src/components/form/FormSelect.tsx` - FormControl, FormLabel, FormErrorMessage, FormHelperText
- `src/components/form/FormRadioGroup.tsx` - FormControl, FormLabel, FormErrorMessage
- `src/components/form/FormCheckbox.tsx` - FormControl, FormErrorMessage

## 使用されているprops

### FormControl
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| isRequired | boolean | 必須フィールドを示す（アスタリスク表示、aria-required設定） | 全般 |
| isInvalid | boolean | エラー状態を示す（FormErrorMessageの表示制御、aria-invalid設定） | 全般 |
| display | string | Flexレイアウト用（"flex"） | settings.tsx |
| alignItems | string | Flexアイテムの配置（"center"） | settings.tsx |

### FormLabel
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| children | ReactNode | ラベルテキスト | 全般 |
| mb | string/number | マージンボトム（"0"でSwitchと並べる場合） | settings.tsx |
| flex | string/number | Flexアイテム比率（"1"） | settings.tsx |

### FormErrorMessage
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| children | ReactNode | エラーメッセージテキスト | 全般 |

### FormHelperText
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| children | ReactNode | ヘルプテキスト | FormInput, FormTextarea, FormSelect |

## Chakra UI API仕様（参考）

### FormControl
- `isDisabled`: フォーム要素を無効化
- `isInvalid`: エラー状態（FormErrorMessageの表示、aria-invalid設定）
- `isReadOnly`: 読み取り専用
- `isRequired`: 必須フィールド（アスタリスク表示、aria-required設定）
- `label`: ラベルテキスト

### FormLabel
- htmlForは子のInput IDに自動設定
- `_disabled`, `_focus`, `_invalid` のスタイルプロップに対応

### FormErrorMessage
- isInvalid=trueの場合のみ表示
- aria-describedbyを自動設定

### FormHelperText
- aria-describedbyを自動設定

## タスク
1. [done] src/components/ui/FormControl.tsx を作成
2. [done] src/components/ui/FormControl.module.css を作成
3. [done] src/components/ui/FormLabel.tsx を作成
4. [done] src/components/ui/FormLabel.module.css を作成
5. [done] src/components/ui/FormErrorMessage.tsx を作成
6. [done] src/components/ui/FormErrorMessage.module.css を作成
7. [done] src/components/ui/FormHelperText.tsx を作成
8. [done] src/components/ui/FormHelperText.module.css を作成
9. [done] src/components/ui/index.ts にexport追加
10. [done] src/pages/compare/FormControl.tsx を作成（Chakra版と新版を並べて表示）
11. [done] npm run build でエラーがないことを確認

## 実装メモ

### FormControlコンテキスト
FormControlはReact Contextを使用して子コンポーネント（FormLabel, FormErrorMessage, FormHelperText）に状態を共有する必要がある：
- isRequired状態 → FormLabelでアスタリスク表示
- isInvalid状態 → FormErrorMessageの表示/非表示
- 生成されたID → アクセシビリティ属性の関連付け

### アクセシビリティ要件
- FormLabelのhtmlForとInputのidを一致させる
- isInvalid時にaria-invalid="true"を設定
- isRequired時にaria-required="true"を設定
- FormErrorMessage/FormHelperTextをaria-describedbyで関連付け
