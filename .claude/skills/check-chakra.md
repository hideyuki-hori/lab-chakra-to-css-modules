---
description: Chakra UIコンポーネントの使用状況を確認する
args: なし
---

# check-chakra

プロジェクト内でChakra UIコンポーネントがどのように使用されているかを確認します。

## 使用方法

```
/check-chakra
```

## 実行内容

### 1. 必須コンポーネントの使用確認

step1.mdで指定されている以下のコンポーネントが最低1回使用されているかチェックします：

```
Box, Text, Flex, Input, Image, Modal, FormControl, Link,
VStack, HStack, Button, Alert, Tooltip, Table, Tabs,
Textarea, Checkbox, Radio, Menu, Avatar, Badge
```

### 2. 検索方法

各コンポーネントをプロジェクト全体から検索します：

```bash
# 例: Boxコンポーネントの使用箇所を検索
grep -r "import.*Box.*from '@chakra-ui/react'" src/

# または
grep -r "<Box" src/
```

### 3. レポート生成

各コンポーネントの使用状況をレポートします：

```
✅ Box - 使用中 (15箇所)
✅ Text - 使用中 (23箇所)
✅ Flex - 使用中 (8箇所)
❌ Modal - 未使用
...
```

### 4. framer-motionアニメーションの確認

framer-motionが使用されている箇所を確認します：

```bash
grep -r "motion\." src/
grep -r "framer-motion" src/
```

## チェックリスト

### 必須コンポーネント（20個）
- [ ] Box
- [ ] Text
- [ ] Flex
- [ ] Input
- [ ] Image
- [ ] Modal
- [ ] FormControl
- [ ] Link
- [ ] VStack
- [ ] HStack
- [ ] Button
- [ ] Alert
- [ ] Tooltip
- [ ] Table
- [ ] Tabs
- [ ] Textarea
- [ ] Checkbox
- [ ] Radio
- [ ] Menu
- [ ] Avatar
- [ ] Badge

### framer-motionアニメーション
- [ ] 10箇所以上でアニメーションを使用

## 注意事項

- すべての必須コンポーネントが使用されていることを確認
- コンポーネントは適切な場所で使用されているか確認
- framer-motionのアニメーションが効果的に使用されているか確認

## 未使用コンポーネントの対応

未使用のコンポーネントがある場合は、step1.mdの仕様を確認し、適切なページに追加します。
