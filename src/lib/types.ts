// ユーザー型定義
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member' | 'guest';
  bio?: string;
  phone?: string;
  status: 'active' | 'away' | 'offline';
}

// プロジェクト型定義
export interface Project {
  id: string;
  name: string;
  description: string;
  owner: User;
  members: User[];
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number; // 0-100
  tags: string[];
}

// タスク型定義
export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignee: User | null;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// カレンダーイベント型定義
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'milestone';
  date: Date;
  projectId?: string;
  taskId?: string;
}

// 統計データ型定義
export interface Statistics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  delayedProjects: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}
