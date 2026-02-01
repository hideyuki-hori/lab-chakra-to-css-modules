# Issue #180 Worker TODO

## 対象コンポーネント
- Alert, AlertIcon, AlertTitle, AlertDescription

## 調査結果サマリー

### 使用箇所

| ファイル | コンポーネント | 使用方法 |
|---------|--------------|---------|
| src/components/common/Alert.tsx | Alert, AlertIcon, AlertTitle, AlertDescription | カスタムAlertコンポーネントのラッパー（Chakra UIをラップ） |
| src/pages/login.tsx | Alert, AlertIcon | エラー表示（シンプル、テキスト直接表示） |
| src/pages/profile.tsx | Alert, AlertIcon, AlertTitle, AlertDescription | 成功メッセージ表示 |
| src/pages/settings.tsx | Alert, AlertIcon, AlertTitle, AlertDescription | 成功メッセージ表示 |
| src/pages/tasks/new.tsx | Alert, AlertIcon, AlertTitle, AlertDescription | 成功・エラーメッセージ表示 |
| src/pages/tasks/[id]/edit.tsx | Alert, AlertIcon, AlertTitle, AlertDescription | 成功・エラーメッセージ表示 |

### 使用されているprops

#### Alert
| prop | 使用箇所 | 値 |
|------|---------|-----|
| status | 全箇所 | "error", "success", "info", "warning" |
| borderRadius | 全箇所 | "md" |

#### AlertIcon
| prop | 使用箇所 | 値 |
|------|---------|-----|
| (デフォルト) | 全箇所 | - |

#### AlertTitle
| prop | 使用箇所 | 値 |
|------|---------|-----|
| (デフォルト) | profile.tsx, settings.tsx, tasks/new.tsx, tasks/[id]/edit.tsx | - |

#### AlertDescription
| prop | 使用箇所 | 値 |
|------|---------|-----|
| (デフォルト) | profile.tsx, settings.tsx, tasks/new.tsx, tasks/[id]/edit.tsx | - |

### 使用パターン

1. **シンプルなAlert（login.tsx）**
```tsx
<Alert status="error" borderRadius="md">
  <AlertIcon />
  {error}
</Alert>
```

2. **Title + Description付きAlert（profile.tsx, settings.tsx等）**
```tsx
<Alert status="success" borderRadius="md">
  <AlertIcon />
  <AlertTitle>更新成功！</AlertTitle>
  <AlertDescription>
    プロフィールが正常に更新されました。
  </AlertDescription>
</Alert>
```

3. **Box内にTitle + Description（tasks/new.tsx, tasks/[id]/edit.tsx）**
```tsx
<Alert status="success" borderRadius="md">
  <AlertIcon />
  <Box>
    <AlertTitle>作成成功!</AlertTitle>
    <AlertDescription>
      タスクが正常に作成されました。一覧ページに戻ります...
    </AlertDescription>
  </Box>
</Alert>
```

### 注意事項

- src/components/common/Alert.tsx は Chakra UI Alert をラップしたカスタムコンポーネント（アニメーション、クローズボタン付き）
- 直接 Chakra UI の Alert をインポートしている箇所と、カスタムコンポーネントを使っている箇所がある
- 新しい Alert コンポーネントは低レベルな Alert, AlertIcon, AlertTitle, AlertDescription を実装する必要がある
- アニメーション機能は framer-motion を使用しており、Alert コンポーネント自体には含めない

## TODO

1. [pending] src/components/ui/Alert.tsx を作成（Alert, AlertIcon, AlertTitle, AlertDescription）
2. [pending] src/components/ui/Alert.module.css を作成
3. [pending] 必要なpropsを実装
   - Alert: status ("info" | "warning" | "success" | "error"), borderRadius, children
   - AlertIcon: (デフォルトでstatusに応じたアイコンを表示)
   - AlertTitle: children
   - AlertDescription: children
4. [pending] src/components/ui/index.ts にexport追加（Alert, AlertIcon, AlertTitle, AlertDescription）
5. [pending] src/pages/compare/Alert.tsx を作成（Chakra版と新版を並べて表示）
6. [pending] npm run build でエラーがないことを確認
