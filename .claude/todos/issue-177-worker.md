# Issue #177 Worker TODO

## 対象コンポーネント
Avatar, AvatarGroup, AvatarBadge

## 使用箇所

### ページ
- `src/pages/profile.tsx` - Avatar (motion wrapped)
- `src/pages/projects/index.tsx` - Avatar, AvatarGroup
- `src/pages/projects/[id].tsx` - Avatar, AvatarGroup
- `src/pages/calendar.tsx` - Avatar
- `src/pages/team.tsx` - Avatar
- `src/pages/index.tsx` - Avatar
- `src/pages/tasks/index.tsx` - Avatar

### コンポーネント
- `src/components/common/UserAvatar.tsx` - Avatar, AvatarBadge（カスタムラッパー）
- `src/components/data/MemberCard.tsx` - Avatar
- `src/components/data/ProjectCard.tsx` - Avatar
- `src/components/data/TaskCard.tsx` - Avatar
- `src/components/layout/Header.tsx` - Avatar

## 使用されているprops

### Avatar
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| size | "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" | アバターのサイズ | 全般 |
| name | string | ユーザー名（イニシャル生成・フォールバック用） | 全般 |
| src | string \| undefined | 画像URL | 全般 |

使用されているsizeの種類:
- `xs`: index.tsx, ProjectCard.tsx, TaskCard.tsx
- `sm`: projects/index.tsx, projects/[id].tsx, calendar.tsx, tasks/index.tsx, Header.tsx
- `md`: projects/[id].tsx
- `xl`: MemberCard.tsx, team.tsx
- `2xl`: profile.tsx

### AvatarGroup
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| size | string | 子Avatarのサイズ | projects/index.tsx |
| max | number | 表示する最大Avatar数（超過分は+Xで表示） | projects/index.tsx |

使用例:
```tsx
<AvatarGroup size="sm" max={3}>
  {members.map((member) => (
    <Avatar key={member.id} name={member.name} src={member.avatar} />
  ))}
</AvatarGroup>
```

### AvatarBadge
| prop | 型 | 説明 | 使用箇所 |
|------|-----|------|---------|
| boxSize | string | バッジのサイズ（"1em"等） | UserAvatar.tsx |
| bg | string | 背景色（ステータス表示用） | UserAvatar.tsx |
| border | string | ボーダー（"2px solid white"等） | UserAvatar.tsx |

使用例:
```tsx
<Avatar {...props}>
  {showStatus && status && (
    <AvatarBadge
      boxSize="1em"
      bg={statusColors[status]}
      border="2px solid white"
    />
  )}
</Avatar>
```

## Chakra UI API仕様（参考）

### Avatar
- `colorScheme`: カラースキーム
- `size`: サイズ（"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"）、デフォルトは"md"
- `src`: 画像URL
- `name`: ユーザー名（イニシャル生成、フォールバック背景色生成に使用）
- `icon`: カスタムフォールバックアイコン
- `showBorder`: ボーダー表示
- `ignoreFallback`: フォールバックロジックを無効化
- `onError`: 画像読み込みエラー時のコールバック
- `getInitials`: イニシャル生成のカスタム関数
- `srcSet`, `loading`, `crossOrigin`, `referrerPolicy`: 画像関連属性

### AvatarGroup
- `max`: 表示する最大Avatar数
- `spacing`: Avatar間のスペース（デフォルト: "-0.75rem"）
- `size`: 子Avatarのサイズ
- `variant`: バリアント

### AvatarBadge
- `boxSize`: バッジのサイズ
- `placement`: 配置位置（デフォルト: "bottom-end"）
- Boxコンポーネントを継承するためスタイルprops使用可能

## タスク
1. [pending] src/components/ui/Avatar.tsx を作成
2. [pending] src/components/ui/Avatar.module.css を作成
3. [pending] src/components/ui/AvatarGroup.tsx を作成
4. [pending] src/components/ui/AvatarGroup.module.css を作成
5. [pending] src/components/ui/AvatarBadge.tsx を作成
6. [pending] src/components/ui/AvatarBadge.module.css を作成
7. [pending] src/components/ui/index.ts にexport追加
8. [pending] src/pages/compare/Avatar.tsx を作成（Chakra版と新版を並べて表示）
9. [pending] npm run build でエラーがないことを確認

## 実装メモ

### サイズ定義
Chakra UIのAvatarサイズをピクセル値に変換:
- `2xs`: 16px
- `xs`: 24px
- `sm`: 32px
- `md`: 48px（デフォルト）
- `lg`: 64px
- `xl`: 96px
- `2xl`: 128px

### イニシャル生成ロジック
`name` propから最大2文字のイニシャルを生成:
- "John Doe" → "JD"
- "山田太郎" → "山田" or "山"（日本語対応検討）
- "Alice" → "A"

### フォールバック背景色
`name` propからハッシュ値を生成し、一貫した背景色を割り当てる

### AvatarGroup スタッキング
- 子Avatarを重ねて表示
- `max`を超える場合は"+X"ラベルを表示
- 負のマージンで重なりを表現

### AvatarBadge 配置
- Avatar内の右下（デフォルト）に絶対配置
- ステータスインジケーター等に使用

### motion対応
profile.tsxでは `motion(Avatar)` として使用されているため、コンポーネントがforwardRefで実装されていることを確認
