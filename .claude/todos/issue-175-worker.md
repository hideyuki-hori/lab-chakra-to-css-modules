# Issue #175 Worker TODO

## 対象コンポーネント
Checkbox, Radio, RadioGroup, Switch

## 使用箇所

### Checkbox
| ファイル | 使用方法 |
|---------|---------|
| src/pages/settings.tsx | 通知内容の設定（isChecked, onChange, children） |
| src/pages/projects/[id].tsx | タスク一覧のチェックボックス（単独、isChecked, colorScheme） |
| src/pages/tasks/index.tsx | タスク一覧のチェックボックス（isChecked, onChange, colorScheme） |
| src/components/form/FormCheckbox.tsx | フォーム用ラッパーコンポーネント（CheckboxPropsを継承） |

### Radio / RadioGroup
| ファイル | 使用方法 |
|---------|---------|
| src/pages/settings.tsx | テーマ選択（RadioGroup: value, onChange / Radio: value, children） |
| src/pages/tasks/new.tsx | 優先度選択（RadioGroup: value, onChange / Radio: value, colorScheme, children） |
| src/pages/tasks/[id]/edit.tsx | 優先度選択（RadioGroup: value, onChange / Radio: value, colorScheme, children） |
| src/components/form/FormRadioGroup.tsx | フォーム用ラッパーコンポーネント（RadioGroupPropsを継承） |

### Switch
| ファイル | 使用方法 |
|---------|---------|
| src/pages/settings.tsx | 通知方法切り替え（isChecked, onChange, colorScheme）、2段階認証（colorScheme のみ）、表示設定（colorScheme, defaultChecked） |

## 使用されているprops

### Checkbox
- `isChecked`: boolean - チェック状態
- `onChange`: (e: ChangeEvent) => void - 変更ハンドラ
- `colorScheme`: string - カラースキーム（"primary"）
- `children`: ReactNode - ラベルテキスト
- `ref`: Ref - フォワードref

### Radio
- `value`: string - 値
- `colorScheme`: string - カラースキーム（"gray", "blue", "orange", "red", "primary"）
- `children`: ReactNode - ラベルテキスト

### RadioGroup
- `value`: string - 選択されている値
- `onChange`: (value: string) => void - 変更ハンドラ
- `children`: ReactNode - Radio要素

### Switch
- `isChecked`: boolean - チェック状態
- `onChange`: (e: ChangeEvent) => void - 変更ハンドラ
- `colorScheme`: string - カラースキーム（"blue"）
- `defaultChecked`: boolean - 初期チェック状態

## タスク
1. [pending] src/components/ui/Checkbox.tsx を作成
2. [pending] src/components/ui/Checkbox.module.css を作成
3. [pending] src/components/ui/Radio.tsx を作成
4. [pending] src/components/ui/Radio.module.css を作成
5. [pending] src/components/ui/RadioGroup.tsx を作成
6. [pending] src/components/ui/RadioGroup.module.css を作成
7. [pending] src/components/ui/Switch.tsx を作成
8. [pending] src/components/ui/Switch.module.css を作成
9. [pending] src/components/ui/index.ts にexport追加
10. [pending] src/pages/compare/FormSelection.tsx を作成（Chakra版と新版を並べて表示）
11. [pending] npm run build でエラーがないことを確認
