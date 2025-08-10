import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ProjectAttributes {
  id: number;
  name: string;
  description?: string;
  status: "active" | "completed" | "on-hold";
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id" | "createdAt" | "updatedAt"> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public status!: "active" | "completed" | "on-hold";
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100],
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "on-hold"),
      allowNull: false,
      defaultValue: "active",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
  }
);

export default Project;
