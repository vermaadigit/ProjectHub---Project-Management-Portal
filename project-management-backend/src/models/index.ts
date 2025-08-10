import User from "./User";
import Project from "./Project";
import Task from "./Task";
import Team from "./Team";
import Comment from "./Comment";

// Define associations
User.hasMany(Project, { foreignKey: "userId", as: "projects" });
Project.belongsTo(User, { foreignKey: "userId", as: "owner" });

Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

User.hasMany(Task, { foreignKey: "assignedTo", as: "assignedTasks" });
Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });

Project.hasMany(Team, { foreignKey: "projectId", as: "teamMembers" });
Team.belongsTo(Project, { foreignKey: "projectId", as: "project" });

User.hasMany(Team, { foreignKey: "userId", as: "teamMemberships" });
Team.belongsTo(User, { foreignKey: "userId", as: "user" });

Task.hasMany(Comment, { foreignKey: "taskId", as: "comments" });
Comment.belongsTo(Task, { foreignKey: "taskId", as: "task" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

export { User, Project, Task, Team, Comment };
