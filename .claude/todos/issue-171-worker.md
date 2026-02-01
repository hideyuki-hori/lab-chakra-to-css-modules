# Issue #171 Worker TODO

対象コンポーネント: Box, Flex, VStack, HStack, Stack, Center, SimpleGrid, Wrap, WrapItem

## 使用箇所一覧

### Box（55箇所）
- src/pages/profile.tsx
- src/pages/settings.tsx
- src/pages/team.tsx
- src/pages/login.tsx
- src/pages/index.tsx
- src/pages/calendar.tsx
- src/pages/reports.tsx
- src/pages/tasks/index.tsx
- src/pages/tasks/new.tsx
- src/pages/tasks/[id]/edit.tsx
- src/pages/projects/index.tsx
- src/pages/projects/[id].tsx
- src/components/layout/Layout.tsx
- src/components/layout/Sidebar.tsx
- src/components/layout/Header.tsx
- src/components/data/MemberCard.tsx
- src/components/data/DataTable.tsx
- src/components/auth/AuthGuard.tsx
- src/components/common/Alert.tsx
- src/components/common/PageHeader.tsx
- src/components/ui/ProgressBar.tsx

### Flex（5箇所）
- src/pages/calendar.tsx
- src/pages/tasks/index.tsx
- src/components/common/FilterBar.tsx
- src/components/common/PageHeader.tsx
- src/components/layout/Header.tsx

### VStack（45箇所）
- src/pages/profile.tsx
- src/pages/calendar.tsx
- src/pages/projects/[id].tsx
- src/pages/projects/index.tsx
- src/pages/login.tsx
- src/pages/team.tsx
- src/pages/tasks/[id]/edit.tsx
- src/pages/tasks/new.tsx
- src/pages/settings.tsx
- src/pages/reports.tsx
- src/pages/tasks/index.tsx
- src/components/data/MemberCard.tsx
- src/pages/index.tsx
- src/components/data/ProjectCard.tsx
- src/components/layout/Sidebar.tsx
- src/components/modal/FormModal.tsx
- src/components/ui/EmptyState.tsx
- src/components/modal/ConfirmModal.tsx

### HStack（80箇所）
- src/pages/profile.tsx
- src/pages/calendar.tsx
- src/pages/projects/[id].tsx
- src/pages/projects/index.tsx
- src/pages/team.tsx
- src/pages/tasks/[id]/edit.tsx
- src/pages/tasks/new.tsx
- src/pages/tasks/index.tsx
- src/pages/settings.tsx
- src/pages/index.tsx
- src/pages/reports.tsx
- src/components/layout/Header.tsx
- src/components/data/ProjectCard.tsx
- src/components/ui/ProgressBar.tsx
- src/components/data/StatCard.tsx
- src/components/modal/ConfirmModal.tsx
- src/components/data/TaskCard.tsx
- src/components/common/PageHeader.tsx
- src/components/common/FilterBar.tsx

### Stack（6箇所）
- src/pages/tasks/[id]/edit.tsx
- src/pages/settings.tsx
- src/pages/tasks/new.tsx
- src/components/form/FormRadioGroup.tsx

### Center（1箇所）
- src/components/auth/AuthGuard.tsx

### SimpleGrid（10箇所）
- src/pages/projects/[id].tsx
- src/pages/team.tsx
- src/pages/reports.tsx
- src/pages/index.tsx

### Wrap（1箇所）
- src/pages/profile.tsx

### WrapItem（1箇所）
- src/pages/profile.tsx

## 使用されているprops

### Box
| prop | 使用例 |
|------|--------|
| p | p={8}, p={6}, p={4} |
| bg | bg="white", bg="gray.50", bg="gray.200", bg="primary.500" |
| borderRadius | borderRadius="lg", borderRadius="md", borderRadius="xl", borderRadius="full" |
| borderWidth | borderWidth="1px" |
| borderTopWidth | borderTopWidth="1px" |
| borderColor | borderColor="gray.200" |
| minH | minH="100vh" |
| minW | minW="150px", minW={{ base: '100%', lg: '300px' }} |
| ml | ml="250px" |
| mt | mt="64px", mt={4} |
| mb | mb={6}, mb={4}, mb={2} |
| pt | pt={4} |
| pb | pb={2} |
| px | px={3} |
| w | w="100%", w="full", w={`${percent}%`} |
| h | h="6px", h="full", h="100vh" |
| flex | flex="1" |
| display | display="flex" |
| alignItems | alignItems="center" |
| justifyContent | justifyContent="center" |
| textAlign | textAlign="center", textAlign="right" |
| overflow | overflow="hidden" |
| overflowX | overflowX="auto" |
| boxShadow | boxShadow="xl", boxShadow="sm" |
| border | border="1px" |
| _hover | _hover={{ bg: 'blue.50', borderColor: 'blue.300' }} |
| transition | transition="all 0.2s", transition="width 0.3s" |
| style | style={{ ... }} |

### Flex
| prop | 使用例 |
|------|--------|
| gap | gap={4} |
| flexWrap | flexWrap="wrap" |
| align | align="center" |
| justify | justify="space-between" |
| h | h="full" |
| mb | mb={2} |

### VStack
| prop | 使用例 |
|------|--------|
| spacing | spacing={6}, spacing={4}, spacing={3}, spacing={2}, spacing={1} |
| align | align="stretch", align="start", align="center", align="end" |
| justify | justify="center" |
| minH | minH="400px" |
| maxW | maxW="800px" |
| mx | mx="auto" |
| bg | bg="white" |
| p | p={6} |
| borderRadius | borderRadius="lg" |
| borderWidth | borderWidth="1px" |
| w | w="100%" |
| mt | mt={2} |

### HStack
| prop | 使用例 |
|------|--------|
| spacing | spacing={8}, spacing={4}, spacing={3}, spacing={2}, spacing={1} |
| justify | justify="space-between", justify="flex-end", justify="center" |
| align | align="start", align="center" |
| flexWrap | flexWrap="wrap", flexWrap={{ base: 'wrap', lg: 'nowrap' }} |
| flex | flex="1" |
| mb | mb={2}, mb={1} |
| borderBottomWidth | borderBottomWidth="1px" |
| pb | pb={2} |
| pt | pt={4} |
| fontSize | fontSize="sm", fontSize="xs" |
| color | color="gray.600" |
| cursor | cursor="pointer" |

### Stack
| prop | 使用例 |
|------|--------|
| direction | direction="row", direction="column" |
| spacing | spacing={6}, spacing={4}, spacing={3} |

### Center
| prop | 使用例 |
|------|--------|
| h | h="100vh" |
| bg | bg="gray.50" |

### SimpleGrid
| prop | 使用例 |
|------|--------|
| columns | columns={{ base: 1, md: 2, lg: 4 }}, columns={{ base: 1, lg: 2 }}, columns={{ base: 1, md: 2, lg: 3 }}, columns={{ base: 1, md: 2 }}, columns={{ base: 1, md: 3 }} |
| spacing | spacing={6}, spacing={4} |

### Wrap
| prop | 使用例 |
|------|--------|
| spacing | spacing={4} |

### WrapItem
| prop | 使用例 |
|------|--------|
| key | key={...} |

## タスク

### コンポーネント作成
1. [completed] src/components/ui/Box.tsx を作成
2. [completed] src/components/ui/Box.module.css を作成
3. [completed] src/components/ui/Flex.tsx を作成
4. [completed] src/components/ui/Flex.module.css を作成
5. [completed] src/components/ui/VStack.tsx を作成
6. [completed] src/components/ui/VStack.module.css を作成
7. [completed] src/components/ui/HStack.tsx を作成
8. [completed] src/components/ui/HStack.module.css を作成
9. [completed] src/components/ui/Stack.tsx を作成
10. [completed] src/components/ui/Stack.module.css を作成
11. [completed] src/components/ui/Center.tsx を作成
12. [completed] src/components/ui/Center.module.css を作成
13. [completed] src/components/ui/SimpleGrid.tsx を作成
14. [completed] src/components/ui/SimpleGrid.module.css を作成
15. [completed] src/components/ui/Wrap.tsx を作成
16. [completed] src/components/ui/Wrap.module.css を作成
17. [completed] src/components/ui/WrapItem.tsx を作成
18. [completed] src/components/ui/WrapItem.module.css を作成

### エクスポート追加
19. [completed] src/components/ui/index.ts にexport追加

### 比較ページ作成
20. [completed] src/pages/compare/Layout.tsx を作成（Chakra版と新版を並べて表示）

### ビルド確認
21. [completed] npm run build でエラーがないことを確認

## 実装上の注意点

### レスポンシブ対応
- SimpleGridのcolumnsはレスポンシブオブジェクト（base, md, lg）をサポートする必要がある
- HStack/VStackのflexWrapもレスポンシブオブジェクトをサポートする必要がある
- minWもレスポンシブオブジェクトをサポートする必要がある

### スタイルprops
- Chakra UIのスタイルprops（p, m, bg, borderRadiusなど）をCSS variablesまたはインラインスタイルで対応
- _hoverなどの疑似セレクターはCSS Modulesで対応
- transitionプロパティも対応が必要

### motion対応
- framer-motionのmotion()でラップされるケースがある（MotionBox = motion(Box)）
- 新コンポーネントもmotion()でラップ可能にする必要がある
