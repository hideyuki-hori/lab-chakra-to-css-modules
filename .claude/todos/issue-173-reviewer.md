# Issue #173 Reviewer TODO

対象コンポーネント: Button, IconButton, CloseButton

## レビュー観点

### 1. 機能の互換性
- [ ] colorSchemeが正しく反映されている（blue, primary, red, green）
- [ ] variantが正しく反映されている（solid, outline, ghost, link）
- [ ] sizeが正しく反映されている（xs, sm, md, lg）
- [ ] leftIcon/rightIconが正しく配置されている
- [ ] isLoadingでスピナーが表示される
- [ ] isDisabledで無効状態になる
- [ ] onClick等のイベントハンドラが動作する
- [ ] type="submit"でフォーム送信が動作する

### 2. IconButton固有
- [ ] aria-labelが必須として型定義されている
- [ ] iconが正しく中央配置されている
- [ ] Buttonと同様のvariant/sizeが動作する

### 3. CloseButton固有
- [ ] 固定のXアイコンが表示される
- [ ] sizeバリエーションが動作する

### 4. スタイルの一貫性
- [ ] Chakra UI版と同等の見た目が再現されている
- [ ] hover/active/focus状態のスタイルが適切
- [ ] カラーパレットがCSS変数で管理されている

### 5. カスタムButton.tsx
- [ ] 既存のisAnimatedの挙動が維持されている（またはframer-motion依存が明確に文書化されている）
- [ ] variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'が動作する

### 6. アクセシビリティ
- [ ] キーボード操作が可能
- [ ] フォーカス表示が適切
- [ ] IconButtonでaria-labelが設定されている

### 7. 比較ページ
- [ ] Before/Afterで視覚的な差異がない
- [ ] すべてのvariant/size/colorSchemeの組み合わせが確認できる

### 8. ビルド
- [ ] TypeScriptエラーがない
- [ ] npm run buildが成功する

## スクリーンショット確認

以下のページでBefore/Afterを比較:
- /compare/Button
- /login（Googleログインボタン）
- /tasks（新規タスクボタン）
- /projects（新規プロジェクトボタン）
- /team（メンバー追加ボタン）

## 承認条件

1. 上記すべてのチェック項目がパスしている
2. Before/Afterスクリーンショットで視覚的な差異がない
3. npm run buildが成功する
