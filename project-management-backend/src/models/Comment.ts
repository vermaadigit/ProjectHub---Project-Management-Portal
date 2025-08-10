import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface CommentAttributes {
  id: number;
  content: string;
  taskId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id" | "createdAt" | "updatedAt"> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public content!: string;
  public taskId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1000],
        notEmpty: true,
      },
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
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
    modelName: "Comment",
    tableName: "comments",
  }
);

export default Comment;
