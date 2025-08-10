export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: "active" | "completed" | "on-hold";
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  projectId: number;
  assignedTo?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: number;
  projectId: number;
  userId: number;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

export interface Comment {
  id: number;
  content: string;
  taskId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface AuthPayload {
  id: number;
  email: string;
  username: string;
}
