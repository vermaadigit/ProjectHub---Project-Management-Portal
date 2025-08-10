import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { User } from "../models";
import { AuthPayload } from "../types";

export class AuthService {
  static generateToken(user: any): string {
    const payload: AuthPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!);
  }

  static async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const existingUser = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const existingUsername = await User.findOne({
      where: {
        username: userData.username,
      },
    });

    if (existingUsername) {
      throw new Error("Username is already taken");
    }

    const user = await User.create(userData);
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  }

  static async getProfile(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "createdAt",
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async updateProfile(
    userId: number,
    updateData: {
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    }
  ) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check for duplicate username (excluding current user)
    if (updateData.username) {
      const existingUser = await User.findOne({
        where: {
          username: updateData.username,
          id: { [Op.ne]: userId },
        },
      });
      if (existingUser) {
        throw new Error("Username is already taken");
      }
    }

    // Check for duplicate email (excluding current user)
    if (updateData.email) {
      const existingEmail = await User.findOne({
        where: {
          email: updateData.email,
          id: { [Op.ne]: userId },
        },
      });
      if (existingEmail) {
        throw new Error("Email is already taken");
      }
    }

    await user.update(updateData);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
