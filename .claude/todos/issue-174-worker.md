# Issue #174 Worker TODO

対象コンポーネント: Input, InputGroup, InputLeftElement, InputRightElement, Textarea, Select

## 使用箇所一覧

### Input（30箇所以上）

#### 専用フォームコンポーネント
- src/components/form/FormInput.tsx
  - L47: `<Input ref={ref} bg="white" {...props} />`
  - L51: `<Input ref={ref} bg="white" {...props} />`
  - InputPropsを拡張して使用

- src/components/form/SearchInput.tsx
  - L36-42: `<Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} bg="white" {...props} />`

#### ページ
- src/pages/projects/index.tsx
  - L111-116: `<Input placeholder="プロジェクトを検索..." value={searchQuery} onChange={...} bg="white" />`

- src/pages/tasks/index.tsx
  - L158-163: `<Input placeholder="タスクを検索..." value={searchQuery} onChange={...} bg="white" />`

- src/pages/profile.tsx
  - L116-122: `<Input type="file" accept="image/*" onChange={handleImageUpload} display="none" id="avatar-upload" />`
  - L156: `<Input {...register('name')} />`
  - L161: `<Input {...register('email')} type="email" />`
  - L166: `<Input {...register('phone')} type="tel" />`

- src/pages/team.tsx
  - L102-107: `<Input placeholder="メンバーを検索..." value={searchQuery} onChange={...} size="lg" />`
  - L197: `<Input {...register('name')} placeholder="山田太郎" />`
  - L201-205: `<Input {...register('email')} type="email" placeholder="yamada@example.com" />`
  - L209: `<Input {...register('role')} placeholder="メンバー" />`

- src/pages/settings.tsx
  - L116-119: `<Input {...register('username')} defaultValue="山田太郎" />`
  - L124-128: `<Input {...register('email')} type="email" defaultValue="yamada@example.com" />`
  - L294: `<Input type="password" placeholder="現在のパスワード" />`
  - L299: `<Input type="password" placeholder="新しいパスワード" />`
  - L304: `<Input type="password" placeholder="パスワード確認" />`

- src/pages/projects/[id].tsx
  - L619: `<Input defaultValue={project.name} />`
  - L630-634: `<Input type="date" defaultValue={...} />`
  - L640-643: `<Input type="date" defaultValue={...} />`
  - L660-665: `<Input type="number" min="0" max="100" defaultValue={project.progress} />`
  - L671: `<Input defaultValue={project.tags.join(', ')} />`

- src/pages/tasks/new.tsx
  - L130-141: `<Input {...register('title', {...})} placeholder="例: トップページのUIデザイン作成" onFocus={...} onBlur={...} />`
  - L274-281: `<Input type="date" {...register('dueDate', {...})} onFocus={...} onBlur={...} />`

- src/pages/tasks/[id]/edit.tsx
  - L239-250: `<Input {...register('title', {...})} placeholder="例: トップページのUIデザイン作成" onFocus={...} onBlur={...} />`
  - L383-390: `<Input type="date" {...register('dueDate', {...})} onFocus={...} onBlur={...} />`

### InputGroup（4箇所）

- src/components/form/FormInput.tsx
  - L43-49: `<InputGroup>` (InputLeftElement, Input, InputRightElementを包含)

- src/components/form/SearchInput.tsx
  - L32-54: `<InputGroup>` (InputLeftElement, Input, InputRightElementを包含)

- src/pages/projects/index.tsx
  - L107-117: `<InputGroup maxW="400px">` (InputLeftElement, Inputを包含)

- src/pages/tasks/index.tsx
  - L154-164: `<InputGroup maxW="400px" flex="1" minW="200px">` (InputLeftElement, Inputを包含)

### InputLeftElement（4箇所）

- src/components/form/FormInput.tsx
  - L45: `<InputLeftElement pointerEvents="none">{leftElement}</InputLeftElement>`

- src/components/form/SearchInput.tsx
  - L33-35: `<InputLeftElement pointerEvents="none"><FiSearch color="gray" /></InputLeftElement>`

- src/pages/projects/index.tsx
  - L108-110: `<InputLeftElement pointerEvents="none"><FiSearch color="gray" /></InputLeftElement>`

- src/pages/tasks/index.tsx
  - L155-157: `<InputLeftElement pointerEvents="none"><FiSearch color="gray" /></InputLeftElement>`

### InputRightElement（2箇所）

- src/components/form/FormInput.tsx
  - L48: `<InputRightElement>{rightElement}</InputRightElement>`

- src/components/form/SearchInput.tsx
  - L44-52: `<InputRightElement><IconButton ... /></InputRightElement>`

### Textarea（5箇所）

#### 専用フォームコンポーネント
- src/components/form/FormTextarea.tsx
  - L23: `<Textarea ref={ref} bg="white" {...props} />`
  - TextareaPropsを拡張して使用

#### ページ
- src/pages/profile.tsx
  - L171: `<Textarea {...register('bio')} rows={5} />`

- src/pages/projects/[id].tsx
  - L624: `<Textarea defaultValue={project.description} rows={4} />`

- src/pages/tasks/new.tsx
  - L154-166: `<Textarea {...register('description', {...})} placeholder="..." rows={5} onFocus={...} onBlur={...} />`

- src/pages/tasks/[id]/edit.tsx
  - L263-275: `<Textarea {...register('description', {...})} placeholder="..." rows={5} onFocus={...} onBlur={...} />`

### Select（14箇所）

#### 専用フォームコンポーネント
- src/components/form/FormSelect.tsx
  - L41: `<Select ref={ref} bg="white" placeholder={placeholder} {...props}>`
  - SelectPropsを拡張して使用

#### コンポーネント
- src/components/common/FilterBar.tsx
  - L58-71: `<Select value={...} onChange={...} bg="white" maxW={...} size="md">` (3箇所、フィルター用)

#### ページ
- src/pages/tasks/index.tsx
  - L173-186: `<Select value={filterProject} onChange={...} bg="white" maxW="200px" size="md">`
  - L188-199: `<Select value={filterStatus} onChange={...} bg="white" maxW="150px" size="md">`
  - L201-213: `<Select value={filterPriority} onChange={...} bg="white" maxW="150px" size="md">`

- src/pages/settings.tsx
  - L133-137: `<Select {...register('language')} defaultValue="ja">`
  - L142-155: `<Select {...register('timezone')} defaultValue="Asia/Tokyo">`
  - L354-358: `<Select defaultValue="medium">` (フォントサイズ)

- src/pages/projects/[id].tsx
  - L650-655: `<Select defaultValue={project.status}>` (ステータス)

- src/pages/tasks/new.tsx
  - L179-191: `<Select {...register('projectId', {...})} placeholder="プロジェクトを選択" onFocus={...} onBlur={...}>`
  - L205-217: `<Select {...register('assigneeId', {...})} placeholder="担当者を選択" onFocus={...} onBlur={...}>`
  - L251-261: `<Select {...register('status', {...})} onFocus={...} onBlur={...}>`

- src/pages/tasks/[id]/edit.tsx
  - L288-301: `<Select {...register('projectId', {...})} placeholder="プロジェクトを選択" onFocus={...} onBlur={...}>`
  - L314-325: `<Select {...register('assigneeId', {...})} placeholder="担当者を選択" onFocus={...} onBlur={...}>`
  - L360-370: `<Select {...register('status', {...})} onFocus={...} onBlur={...}>`

## 使用されているprops

### Input
| prop | 使用例 |
|------|--------|
| type | "text"(デフォルト), "email", "tel", "password", "file", "date", "number" |
| placeholder | 検索やフォーム入力のヒント |
| value | 制御コンポーネント用 |
| onChange | イベントハンドラ |
| defaultValue | 非制御コンポーネント用 |
| bg | "white" |
| size | "md"(デフォルト), "lg" |
| display | "none"（ファイル入力の非表示用） |
| id | "avatar-upload"（label連携用） |
| accept | "image/*"（ファイル種類制限） |
| min | "0"（数値入力） |
| max | "100"（数値入力） |
| onFocus | フォーカスイベント |
| onBlur | ブラーイベント |
| ref | forwardRefによる参照 |
| {...register()} | react-hook-form連携 |

### InputGroup
| prop | 使用例 |
|------|--------|
| maxW | "400px" |
| flex | "1" |
| minW | "200px" |

### InputLeftElement / InputRightElement
| prop | 使用例 |
|------|--------|
| pointerEvents | "none" |
| children | アイコンやボタン |

### Textarea
| prop | 使用例 |
|------|--------|
| placeholder | フォーム入力のヒント |
| rows | {4}, {5} |
| defaultValue | 非制御コンポーネント用 |
| bg | "white" |
| onFocus | フォーカスイベント |
| onBlur | ブラーイベント |
| ref | forwardRefによる参照 |
| {...register()} | react-hook-form連携 |

### Select
| prop | 使用例 |
|------|--------|
| placeholder | "選択してください", "プロジェクトを選択" |
| value | 制御コンポーネント用 |
| onChange | イベントハンドラ |
| defaultValue | "ja", "Asia/Tokyo", "medium" |
| bg | "white" |
| maxW | "200px", "150px" |
| size | "md" |
| onFocus | フォーカスイベント |
| onBlur | ブラーイベント |
| ref | forwardRefによる参照 |
| {...register()} | react-hook-form連携 |
| children | `<option>` 要素 |

## Chakra UI API仕様（v2）

### Input
- variant: "outline" | "filled" | "flushed" | "unstyled"（デフォルト: "outline"）
- size: "xs" | "sm" | "md" | "lg"（デフォルト: "md"）
- isDisabled: boolean
- isInvalid: boolean
- isReadOnly: boolean
- isRequired: boolean
- focusBorderColor: string
- errorBorderColor: string

### InputGroup
- size: "xs" | "sm" | "md" | "lg"
- Inputのサイズと同期してInputLeftElement/InputRightElementのサイズも調整

### InputLeftElement / InputRightElement
- pointerEvents: "none" | "auto"（入力フィールドへのクリックを許可/禁止）
- InputGroup内で使用し、Input内にアイコンや要素を配置

### Textarea
- variant: "outline" | "filled" | "flushed" | "unstyled"（デフォルト: "outline"）
- size: "xs" | "sm" | "md" | "lg"（デフォルト: "md"）
- resize: "none" | "both" | "horizontal" | "vertical"（デフォルト: "vertical"）
- rows: number
- isDisabled/isInvalid/isReadOnly/isRequired: boolean

### Select
- variant: "outline" | "filled" | "flushed" | "unstyled"（デフォルト: "outline"）
- size: "xs" | "sm" | "md" | "lg"（デフォルト: "md"）
- placeholder: string（最初の無効なオプションとして表示）
- icon: ReactElement（ドロップダウンアイコンのカスタマイズ）
- iconSize: string
- isDisabled/isInvalid/isReadOnly/isRequired: boolean

## 既存のFormコンポーネントラッパー

### FormInput (src/components/form/FormInput.tsx)
- InputをFormControlでラップ
- label, error, helperText, isRequired, leftElement, rightElement を追加props
- forwardRefで参照を転送

### FormTextarea (src/components/form/FormTextarea.tsx)
- TextareaをFormControlでラップ
- label, error, helperText, isRequired を追加props
- forwardRefで参照を転送

### FormSelect (src/components/form/FormSelect.tsx)
- SelectをFormControlでラップ
- label, error, helperText, isRequired, options, placeholder を追加props
- forwardRefで参照を転送

### SearchInput (src/components/form/SearchInput.tsx)
- InputGroup + InputLeftElement + Input + InputRightElement の組み合わせ
- 検索アイコン、クリアボタン付き
- value, onChange, onClear, showClearButton を追加props

## 実装上の注意点

### 共通
- すべてのフォーム要素でreact-hook-formとの連携が必要
- forwardRefパターンの維持が必須
- bg="white" がほぼ全箇所で使用されている

### InputGroup + Element
- InputGroupはInputとElement群をグループ化するコンテナ
- InputLeftElement/InputRightElementはabsolute positionで配置
- pointerEvents="none"でアイコンがクリックを通過させる
- InputのpaddingLeft/paddingRightを調整してElementとの重なりを防ぐ

### Select
- ネイティブの`<select>`要素をスタイリング
- ブラウザのデフォルトドロップダウンUIを使用
- placeholderは`<option disabled>`として実装

### サイズバリエーション
- xs, sm, md, lgのサイズに対応
- InputGroupのsizeがInputとElementに伝播

### バリアント
- outline（デフォルト）: 境界線スタイル
- filled: 背景色付き
- flushed: 下線のみ
- unstyled: スタイルなし

## タスク

### コンポーネント作成
1. [ ] src/components/ui/Input.module.css を作成
2. [ ] src/components/ui/Input.tsx を作成
3. [ ] src/components/ui/InputGroup.module.css を作成
4. [ ] src/components/ui/InputGroup.tsx を作成（InputLeftElement, InputRightElement含む）
5. [ ] src/components/ui/Textarea.module.css を作成
6. [ ] src/components/ui/Textarea.tsx を作成
7. [ ] src/components/ui/Select.module.css を作成
8. [ ] src/components/ui/Select.tsx を作成

### Formコンポーネント更新
9. [ ] src/components/form/FormInput.tsx をCSS Modules版Inputを使用するよう更新
10. [ ] src/components/form/FormTextarea.tsx をCSS Modules版Textareaを使用するよう更新
11. [ ] src/components/form/FormSelect.tsx をCSS Modules版Selectを使用するよう更新
12. [ ] src/components/form/SearchInput.tsx をCSS Modules版InputGroupを使用するよう更新

### エクスポート追加
13. [ ] src/components/ui/index.ts にexport追加

### 比較ページ作成
14. [ ] src/pages/compare/Input.tsx を作成（Chakra版と新版を並べて表示）

### ビルド確認
15. [ ] npm run build でエラーがないことを確認
