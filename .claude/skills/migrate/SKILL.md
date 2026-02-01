---
name: migrate
description: 指定したページまたはコンポーネントをCSS Modulesに移行する
argument-hint: "<page-name>"
user-invocable: true
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# $ARGUMENTS の移行

## 手順

1. 対象ファイルを読み込む
2. 使用されているChakra UIコンポーネントを特定
3. CSS Modulesファイルを作成（styles/pages/$ARGUMENTS.module.css）
4. Chakra UIコンポーネントをHTML要素 + CSS Modulesに置換
5. framer-motionアニメーションを維持
6. TypeScriptエラーがないことを確認

## 置換ルール
@.claude/rules/chakra-replacement.md を参照

## 注意事項
- CSS変数は styles/variables.css を使用
- レスポンシブはメディアクエリで対応
- useDisclosure → useState に置換
- useToast → react-hot-toast に置換
