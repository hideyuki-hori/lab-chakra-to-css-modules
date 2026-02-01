# Chakra UI コンポーネント置換表

| Chakra UI | HTML + CSS Modules |
|-----------|-------------------|
| `<Box>` | `<div className={styles.xxx}>` |
| `<Text>` | `<span>` or `<p>` |
| `<Flex>` | `<div className={styles.flex}>` |
| `<VStack>` | `<div className={styles.vstack}>` |
| `<HStack>` | `<div className={styles.hstack}>` |
| `<Button>` | `<button className={styles.button}>` |
| `<Input>` | `<input className={styles.input}>` |
| `<Textarea>` | `<textarea className={styles.textarea}>` |
| `<Select>` | `<select className={styles.select}>` |
| `<Checkbox>` | `<input type="checkbox">` |
| `<Radio>` | `<input type="radio">` |
| `<Avatar>` | `<img className={styles.avatar}>` |
| `<Badge>` | `<span className={styles.badge}>` |
| `<Card>` | `<div className={styles.card}>` |
| `<Table>` | `<table className={styles.table}>` |
| `<Alert>` | `<div className={styles.alert}>` |
| `<Progress>` | `<div className={styles.progress}>` |
| `<Spinner>` | `<div className={styles.spinner}>` |

## 複雑なコンポーネント（共通化推奨）
- Modal → `components/ui/Modal.tsx`
- Menu → `components/ui/Menu.tsx`
- Tabs → `components/ui/Tabs.tsx`
- Tooltip → `components/ui/Tooltip.tsx`

## Hooks置換
| Chakra UI | 代替 |
|-----------|------|
| `useDisclosure` | `useState` |
| `useToast` | `react-hot-toast` |
| `useColorModeValue` | CSS変数 or 削除 |
