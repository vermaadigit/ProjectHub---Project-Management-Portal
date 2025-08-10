export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

export const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const PROJECT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  ON_HOLD: "on-hold",
};

export const TEAM_ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  MEMBER: "member",
};

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  TASKS: "/projects/:projectId/tasks",
  PROFILE: "/profile",
};
