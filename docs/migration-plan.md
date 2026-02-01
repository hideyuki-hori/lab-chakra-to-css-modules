# 移行計画

## 方針

chakra-uiのcomponentをsrc/components/ui/*につくる

issueは次のように作る:
1. src/components/uiの数だけ
2. pageで使われてるsrc/components/*はそのまま使う
3. 置き換えたcomponents/uiを使ってsrc/components/*を置き換える
4. 置き換えたcomponents/uiを使ってsrc/pages/*を置き換える

## 使用中のChakra UIコンポーネント

| 使用回数 | コンポーネント |
|---------|---------------|
| 34 | Box |
| 29 | Text |
| 26 | VStack |
| 26 | HStack |
| 20 | Button |
| 18 | Badge |
| 16 | Avatar |
| 14 | FormControl |
| 13 | Input |
| 13 | FormLabel |
| 10 | Heading |
| 9 | IconButton |
| 9 | AlertIcon |
| 8 | Select |
| 8 | Alert |
| 7 | SimpleGrid |
| 7 | MenuList |
| 7 | MenuItem |
| 7 | MenuButton |
| 7 | Menu |
| 7 | FormErrorMessage |
| 7 | AlertTitle |
| 7 | AlertDescription |
| 6 | Tr |
| 6 | Tooltip |
| 6 | Thead |
| 6 | Th |
| 6 | Textarea |
| 6 | Td |
| 6 | Tbody |
| 6 | Table |
| 6 | StatNumber |
| 6 | StatLabel |
| 6 | StatHelpText |
| 6 | Stat |
| 6 | ModalOverlay |
| 6 | ModalHeader |
| 6 | ModalFooter |
| 6 | ModalContent |
| 6 | ModalCloseButton |
| 6 | ModalBody |
| 6 | Modal |
| 6 | Icon |
| 6 | Flex |
| 6 | CardBody |
| 6 | Card |
| 5 | useColorModeValue |
| 5 | Tabs |
| 5 | TabPanels |
| 5 | TabPanel |
| 5 | TabList |
| 5 | Tab |
| 5 | StatArrow |
| 5 | Stack |
| 5 | RadioGroup |
| 5 | Radio |
| 5 | Checkbox |
| 4 | useToast |
| 4 | useDisclosure |
| 4 | InputLeftElement |
| 4 | InputGroup |
| 3 | FormHelperText |
| 3 | CardHeader |
| 2 | WrapItem |
| 2 | Wrap |
| 2 | Switch |
| 2 | Spinner |
| 2 | Progress |
| 2 | MenuDivider |
| 2 | InputRightElement |
| 2 | Image |
| 2 | ChakraProvider |
| 2 | AvatarGroup |
| 1 | Center |
| 1 | CloseButton |
| 1 | Link |

## Issue構成

### Phase 1: src/components/ui 作成

| # | タイトル | コンポーネント |
|---|---------|---------------|
| 1 | レイアウト系 | Box, Flex, VStack, HStack, Stack, Center, SimpleGrid, Wrap, WrapItem |
| 2 | テキスト系 | Text, Heading |
| 3 | ボタン系 | Button, IconButton, CloseButton |
| 4 | フォーム基本 | Input, InputGroup, InputLeftElement, InputRightElement, Textarea, Select |
| 5 | フォーム選択 | Checkbox, Radio, RadioGroup, Switch |
| 6 | フォーム制御 | FormControl, FormLabel, FormErrorMessage, FormHelperText |
| 7 | Avatar | Avatar, AvatarGroup, AvatarBadge |
| 8 | Badge | Badge |
| 9 | Card | Card, CardHeader, CardBody |
| 10 | Alert | Alert, AlertIcon, AlertTitle, AlertDescription |
| 11 | Modal | Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton |
| 12 | Menu | Menu, MenuButton, MenuList, MenuItem, MenuDivider |
| 13 | Table | Table, Thead, Tbody, Tr, Th, Td |
| 14 | Tabs | Tabs, TabList, Tab, TabPanels, TabPanel |
| 15 | Stat | Stat, StatLabel, StatNumber, StatHelpText, StatArrow |
| 16 | その他 | Icon, Tooltip, Spinner, Progress, Image, Link |
| 17 | Hooks | useDisclosure, useToast, useColorModeValue |

### Phase 2: src/components/* 置き換え

| # | タイトル |
|---|---------|
| 18 | src/components/common 置き換え |
| 19 | src/components/data 置き換え |
| 20 | src/components/form 置き換え |
| 21 | src/components/layout 置き換え |
| 22 | src/components/modal 置き換え |
| 23 | src/components/auth 置き換え |

### Phase 3: src/pages/* 置き換え

| # | タイトル |
|---|---------|
| 24 | pages/login 置き換え |
| 25 | pages/index 置き換え |
| 26 | pages/calendar 置き換え |
| 27 | pages/profile 置き換え |
| 28 | pages/team 置き換え |
| 29 | pages/settings 置き換え |
| 30 | pages/reports 置き換え |
| 31 | pages/projects/index 置き換え |
| 32 | pages/projects/[id] 置き換え |
| 33 | pages/tasks/index 置き換え |
| 34 | pages/tasks/new 置き換え |
| 35 | pages/tasks/[id]/edit 置き換え |

### Phase 4: 完了

| # | タイトル |
|---|---------|
| 36 | Chakra UI削除・最終確認 |
