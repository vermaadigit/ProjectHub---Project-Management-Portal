import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize"; // Add this import
import { AuthService } from "../services/authService";
import { AuthRequest } from "../middleware/auth";
import { User } from "../models"; // Add this import

export class AuthController {
  /**
   * @swagger
   * /api/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 minLength: 3
   *                 maxLength: 50
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 minLength: 6
   *               firstName:
   *                 type: string
   *                 maxLength: 50
   *               lastName:
   *                 type: string
   *                 maxLength: 50
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       type: object
   *                     token:
   *                       type: string
   *       400:
   *         description: Validation error or user already exists
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const { username, email, password, firstName, lastName } = req.body;

      const result = await AuthService.register({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *       400:
   *         description: Invalid credentials
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/profile:
   *   get:
   *     summary: Get user profile
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Profile retrieved successfully
   *       401:
   *         description: Unauthorized
   */
  static async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const user = await AuthService.getProfile(userId);

      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/profile:
   *   put:
   *     summary: Update user profile
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *     responses:
   *       200:
   *         description: Profile updated successfully
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   */
  static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const userId = req.user!.id;
      const { username, email, firstName, lastName } = req.body;

      // Check if username is taken by another user
      const existingUser = await User.findOne({
        where: {
          username,
          id: { [Op.ne]: userId }, // Exclude current user
        },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "Username is already taken",
        });
        return;
      }

      // Check if email is taken by another user
      const existingEmail = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: userId }, // Exclude current user
        },
      });

      if (existingEmail) {
        res.status(400).json({
          success: false,
          message: "Email is already taken",
        });
        return;
      }

      // Update user
      await User.update(
        { username, email, firstName, lastName },
        { where: { id: userId } }
      );

      // Get updated user
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
