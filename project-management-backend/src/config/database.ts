import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.DB_NAME!;
const username = process.env.DB_USER!;
const password = process.env.DB_PASSWORD!;
const host = process.env.DB_HOST || "localhost";
const port = parseInt(process.env.DB_PORT || "5432");

export const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: false,
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ force: false });
      console.log("✅ Database synchronized");
    }
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    process.exit(1);
  }
};
