# Issue #172 Worker TODO

対象コンポーネント: Text, Heading

## 使用箇所一覧

### Text（98箇所）
- src/pages/profile.tsx (15箇所)
- src/pages/reports.tsx (4箇所)
- src/pages/settings.tsx (4箇所)
- src/pages/login.tsx (1箇所)
- src/pages/calendar.tsx (10箇所)
- src/pages/index.tsx (14箇所)
- src/pages/team.tsx (4箇所)
- src/pages/tasks/[id]/edit.tsx (5箇所)
- src/pages/tasks/new.tsx (1箇所)
- src/pages/tasks/index.tsx (7箇所)
- src/pages/projects/index.tsx (10箇所)
- src/pages/projects/[id].tsx (18箇所)
- src/pages/compare/Layout.tsx (2箇所)
- src/components/layout/Sidebar.tsx (3箇所)
- src/components/layout/Header.tsx (3箇所)
- src/components/common/PageHeader.tsx (1箇所)
- src/components/common/FilterBar.tsx (1箇所)
- src/components/data/MemberCard.tsx (3箇所)
- src/components/data/ProjectCard.tsx (4箇所)
- src/components/data/TaskCard.tsx (4箇所)
- src/components/ui/EmptyState.tsx (2箇所)
- src/components/ui/ProgressBar.tsx (2箇所)
- src/components/modal/ConfirmModal.tsx (1箇所)

### Heading（18箇所）
- src/pages/compare/Layout.tsx (2箇所)
- src/pages/projects/[id].tsx (7箇所)
- src/pages/projects/index.tsx (1箇所)
- src/pages/login.tsx (1箇所)
- src/pages/tasks/[id]/edit.tsx (2箇所)
- src/pages/tasks/new.tsx (1箇所)
- src/pages/tasks/index.tsx (1箇所)
- src/pages/index.tsx (3箇所)
- src/components/common/PageHeader.tsx (1箇所)

## 使用されているprops

### Text
| prop | 使用例 |
|------|--------|
| fontSize | fontSize="3xl", fontSize="xl", fontSize="lg", fontSize="sm", fontSize="xs" |
| fontWeight | fontWeight="bold", fontWeight="semibold", fontWeight="medium", fontWeight="normal" |
| color | color="gray.600", color="gray.500", color="gray.400", color="gray.700", color="blue.600", color="green.600", color="red.500", color="primary.600" |
| mb | mb={4}, mb={3}, mb={2}, mb={1} |
| mt | mt={2}, mt={1} |
| noOfLines | noOfLines={1}, noOfLines={2} |
| textAlign | textAlign="center" |
| maxW | maxW="md" |
| minW | minW="200px" |
| style | style={{ borderBottom: '...', letterSpacing: '...' }} |
| （子要素のみ） | `<Text>テキスト内容</Text>` |

### Heading
| prop | 使用例 |
|------|--------|
| size | size="lg", size="md" |
| mb | mb={8}, mb={4}, mb={2}, mb={0}（条件付き） |
| color | color="primary.600", color="gray.600" |
| （子要素のみ） | `<Heading>見出し内容</Heading>` |

## 実装上の注意点

### noOfLines対応
- CSS Modulesで行数制限を実装する必要がある
- `-webkit-line-clamp`を使用したテキスト省略を実装

### fontSizeの対応
- Chakra UIのfontSizeプリセット（3xl, xl, lg, sm, xs）をCSS変数またはクラスで対応

### colorの対応
- Chakra UIのカラーパレット（gray.600, primary.600など）をCSS変数で対応

### Headingのsize対応
- size="lg", size="md"などをフォントサイズとマージンに変換

## タスク

### コンポーネント作成
1. [done] src/components/ui/Text.tsx を作成
2. [done] src/components/ui/Text.module.css を作成
3. [done] src/components/ui/Heading.tsx を作成
4. [done] src/components/ui/Heading.module.css を作成

### エクスポート追加
5. [done] src/components/ui/index.ts にexport追加

### 比較ページ作成
6. [done] src/pages/compare/Text.tsx を作成（Chakra版と新版を並べて表示）

### ビルド確認
7. [done] npm run build でエラーがないことを確認
