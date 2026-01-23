# TaskFlow Project Skills

このディレクトリには、TaskFlowプロジェクトの開発を効率化するためのカスタムスキルが含まれています。

## 利用可能なスキル

### 1. init-project
プロジェクトの初期化を行います。Next.js、Chakra UI、必要な依存関係をセットアップします。

```
/init-project
```

**使用タイミング**: プロジェクト開始時、最初に1回だけ実行

### 2. create-page
新しいページを作成します。

```
/create-page <ページ名>
```

**例**:
```
/create-page projects
/create-page tasks/new
/create-page projects/[id]
```

**使用タイミング**: 新しいページを追加するとき

### 3. create-component
新しいコンポーネントを作成します。

```
/create-component <カテゴリ/名前>
```

**例**:
```
/create-component layout/Sidebar
/create-component common/Card
/create-component projects/ProjectCard
```

**使用タイミング**: 新しいコンポーネントが必要なとき

### 4. dev
開発サーバーを起動します。

```
/dev
```

**使用タイミング**: ローカルでアプリケーションを確認したいとき

### 5. check-chakra
Chakra UIコンポーネントの使用状況を確認します。

```
/check-chakra
```

**使用タイミング**: 実装が完了し、すべての必須コンポーネントが使用されているか確認したいとき

### 6. add-mock-data
モックデータを追加・更新します。

```
/add-mock-data <データタイプ>
```

**例**:
```
/add-mock-data projects
/add-mock-data tasks
/add-mock-data users
```

**使用タイミング**: モックデータが必要なとき、既存データを拡充したいとき

## 開発フロー例

### Step2: Chakra UI実装フェーズ

1. **プロジェクト初期化**
   ```
   /init-project
   ```

2. **基本レイアウトの作成**
   ```
   /create-component layout/Sidebar
   /create-component layout/Header
   /create-component layout/Layout
   ```

3. **モックデータの準備**
   ```
   /add-mock-data users
   /add-mock-data projects
   /add-mock-data tasks
   ```

4. **各ページの実装**
   ```
   /create-page projects
   /create-page tasks
   /create-page team
   ... (step1.mdの順序に従って)
   ```

5. **動作確認**
   ```
   /dev
   ```

6. **コンポーネント使用状況の確認**
   ```
   /check-chakra
   ```

## 注意事項

- すべてのスキルは`.claude/rules`に従って動作します
- スキル実行前に`.claude/rules`とstep1.mdを確認してください
- 各スキルの詳細は個別のマークダウンファイルを参照してください

## カスタマイズ

必要に応じて新しいスキルを追加できます。スキルファイルは以下の形式で作成してください：

```markdown
---
description: スキルの説明
args: 引数の説明
---

# スキル名

詳細な説明...
```
