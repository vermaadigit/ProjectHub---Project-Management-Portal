import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface TeamAttributes {
  id: number;
  projectId: number;
  userId: number;
  role: "owner" | "admin" | "member";
  joinedAt?: Date;
}

interface TeamCreationAttributes
  extends Optional<TeamAttributes, "id" | "joinedAt"> {}

class Team
  extends Model<TeamAttributes, TeamCreationAttributes>
  implements TeamAttributes
{
  public id!: number;
  public projectId!: number;
  public userId!: number;
  public role!: "owner" | "admin" | "member";
  public readonly joinedAt!: Date;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
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
    role: {
      type: DataTypes.ENUM("owner", "admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Team",
    tableName: "teams",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["projectId", "userId"],
      },
    ],
  }
);

export default Team;
