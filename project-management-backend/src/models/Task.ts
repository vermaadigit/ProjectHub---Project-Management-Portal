import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  projectId: number;
  assignedTo?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "createdAt" | "updatedAt"> {}

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: "todo" | "in-progress" | "completed";
  public priority!: "low" | "medium" | "high";
  public projectId!: number;
  public assignedTo?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [1, 200],
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "todo",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "medium",
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
  }
);

export default Task;
