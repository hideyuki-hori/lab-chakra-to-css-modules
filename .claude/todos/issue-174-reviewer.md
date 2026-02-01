# Issue #174 Reviewer TODO

対象コンポーネント: Input, InputGroup, InputLeftElement, InputRightElement, Textarea, Select

## レビュー観点

### 1. Input機能の互換性
- [ ] type属性が正しく動作する（text, email, tel, password, file, date, number）
- [ ] placeholder, value, defaultValue が正しく動作する
- [ ] onChange, onFocus, onBlur イベントが動作する
- [ ] size（xs, sm, md, lg）が正しく反映される
- [ ] variant（outline, filled, flushed, unstyled）が正しく反映される
- [ ] bg="white" のスタイルが適用される
- [ ] isDisabled, isInvalid, isReadOnly, isRequired 状態が動作する
- [ ] focusBorderColor, errorBorderColor が適用される
- [ ] forwardRefで参照が正しく転送される
- [ ] react-hook-formのregisterと連携できる

### 2. InputGroup機能の互換性
- [ ] InputLeftElement/InputRightElementが正しく配置される
- [ ] pointerEvents="none"でアイコンがクリックを通過させる
- [ ] Inputのpaddingが適切に調整される
- [ ] sizeがInput/Elementに伝播する
- [ ] maxW, flex, minWなどのレイアウトpropsが動作する

### 3. Textarea機能の互換性
- [ ] rows属性が正しく動作する
- [ ] resize属性が正しく動作する
- [ ] placeholder, value, defaultValue が正しく動作する
- [ ] size, variant が正しく反映される
- [ ] forwardRefで参照が正しく転送される
- [ ] react-hook-formのregisterと連携できる

### 4. Select機能の互換性
- [ ] placeholder（無効オプション）が表示される
- [ ] optionの選択が正しく動作する
- [ ] value, defaultValue が正しく動作する
- [ ] size, variant が正しく反映される
- [ ] maxWなどのレイアウトpropsが動作する
- [ ] forwardRefで参照が正しく転送される
- [ ] react-hook-formのregisterと連携できる

### 5. Formコンポーネントラッパー
- [ ] FormInputがCSS Modules版Inputを正しく使用
- [ ] FormTextareaがCSS Modules版Textareaを正しく使用
- [ ] FormSelectがCSS Modules版Selectを正しく使用
- [ ] SearchInputがCSS Modules版InputGroupを正しく使用
- [ ] label, error, helperText, isRequiredが正しく表示される
- [ ] leftElement, rightElementが正しく配置される

### 6. スタイルの一貫性
- [ ] Chakra UI版と同等の見た目が再現されている
- [ ] hover/focus/disabled状態のスタイルが適切
- [ ] invalid状態の赤い境界線が表示される
- [ ] カラーパレットがCSS変数で管理されている

### 7. アクセシビリティ
- [ ] キーボード操作が可能
- [ ] フォーカス表示が適切
- [ ] ラベルとの関連付けが正しい
- [ ] エラーメッセージとaria-describedbyの関連付け

### 8. 比較ページ
- [ ] Before/Afterで視覚的な差異がない
- [ ] すべてのvariant/sizeの組み合わせが確認できる
- [ ] InputGroupの組み合わせが確認できる

### 9. ビルド
- [ ] TypeScriptエラーがない
- [ ] npm run buildが成功する

## スクリーンショット確認

以下のページでBefore/Afterを比較:
- /compare/Input
- /projects（検索入力）
- /tasks（検索入力、フィルターSelect）
- /tasks/new（フォーム全体）
- /tasks/[id]/edit（フォーム全体）
- /profile（フォーム全体）
- /settings（フォーム全体）
- /team（検索入力、メンバー追加モーダル）
- /projects/[id]（設定タブのフォーム）

## 承認条件

1. 上記すべてのチェック項目がパスしている
2. Before/Afterスクリーンショットで視覚的な差異がない
3. npm run buildが成功する
4. 既存のFormコンポーネント（FormInput, FormTextarea, FormSelect, SearchInput）が正しく動作する
