# Issue #176 Reviewer TODO

## 対象コンポーネント
FormControl, FormLabel, FormErrorMessage, FormHelperText

## タスク
1. [pending] コードレビュー（型定義、props、スタイル）
2. [pending] /compare/FormControl ページで動作確認
3. [pending] スクリーンショット取得
4. [pending] 問題があれば修正

## レビュー観点

### 型定義
- [ ] propsの型が正しく定義されているか
- [ ] 型アサーション（as）が使われていないか
- [ ] オプショナルプロパティが適切に設定されているか

### props
- [ ] FormControl: isRequired, isInvalid, display, alignItems をサポートしているか
- [ ] FormLabel: children, mb, flex をサポートしているか
- [ ] FormErrorMessage: children をサポートしているか
- [ ] FormHelperText: children をサポートしているか

### スタイル
- [ ] Chakra UIと同等のスタイルが再現されているか
- [ ] CSS Modulesの命名規則に従っているか
- [ ] レスポンシブ対応が必要な場合、対応されているか

### アクセシビリティ
- [ ] FormLabelのhtmlForが正しく設定されているか
- [ ] aria-invalid, aria-required が正しく設定されているか
- [ ] aria-describedby でエラーメッセージ/ヘルプテキストが関連付けられているか

### Context
- [ ] FormControlContextが正しく実装されているか
- [ ] 子コンポーネントがContextを正しく参照しているか

## 比較ページ確認項目
- [ ] 必須フィールドのアスタリスク表示
- [ ] エラー状態の表示（赤いボーダー、エラーメッセージ）
- [ ] ヘルプテキストの表示
- [ ] Flexレイアウト（display="flex"使用時）
- [ ] ラベルのスタイル（mb="0", flex="1"使用時）
