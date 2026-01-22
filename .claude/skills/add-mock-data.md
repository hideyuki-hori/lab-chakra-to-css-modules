---
description: モックデータを追加・更新する
args: データタイプ（例: projects, tasks, users）
---

# add-mock-data

プロジェクトのモックデータを追加または更新します。

## 使用方法

```
/add-mock-data projects
/add-mock-data tasks
/add-mock-data users
```

## 実行内容

### 1. モックデータファイルの確認

`src/lib/mockData.ts`を確認します。

### 2. データの追加・更新

step1.mdのデータモデルに従ってモックデータを追加します。

#### Projectデータ
```typescript
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Company website redesign project',
    owner: mockUsers[0],
    members: [mockUsers[0], mockUsers[1]],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
    status: 'active',
    progress: 65,
    tags: ['design', 'frontend']
  },
  // ... more projects
];
```

#### Taskデータ
```typescript
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Create wireframes',
    description: 'Design wireframes for main pages',
    projectId: '1',
    assignee: mockUsers[0],
    dueDate: new Date('2024-02-15'),
    priority: 'high',
    status: 'in-progress',
    tags: ['design'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  // ... more tasks
];
```

#### Userデータ
```typescript
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Taro Yamada',
    email: 'taro@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    bio: 'Senior Project Manager',
    phone: '090-1234-5678',
    status: 'active'
  },
  // ... more users
];
```

### 3. データの関連付け

プロジェクト、タスク、ユーザーの関連付けを適切に行います：

- タスクはプロジェクトに紐づける（`task.projectId`）
- タスクには担当者を設定（`task.assignee`）
- プロジェクトにはオーナーとメンバーを設定

### 4. バリエーションの作成

実際のアプリケーションを想定して、様々なデータを作成します：

- 異なるステータス（planning, active, completed, on-hold）
- 異なる優先度（low, medium, high, urgent）
- 期限切れのタスク
- 進行中のプロジェクト
- 完了したタスク

## データ量の目安

- プロジェクト: 8-12件
- タスク: 30-50件
- ユーザー: 6-10人

## 注意事項

- step1.mdの型定義に従う
- 日本人の名前を使用
- 実際のメールアドレスは使用しない
- アバター画像はプレースホルダーサービス（pravatar.cc等）を使用
- データの整合性を保つ（存在しないユーザーIDを参照しない等）
