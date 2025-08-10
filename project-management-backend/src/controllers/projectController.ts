import { Response } from "express";
import { validationResult } from "express-validator";
import { ProjectService } from "../services/projectService";
import { AuthRequest } from "../middleware/auth";
import {
  PaginatedRequest,
  createPaginatedResponse,
} from "../middleware/pagination";

export class ProjectController {
  /**
   * @swagger
   * /api/projects:
   *   post:
   *     summary: Create a new project
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: string
   *                 enum: [active, completed, on-hold]
   *     responses:
   *       201:
   *         description: Project created successfully
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   */
  static async createProject(req: AuthRequest, res: Response): Promise<void> {
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
      const { name, description, status } = req.body;

      const project = await ProjectService.createProject(userId, {
        name,
        description,
        status,
      });

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
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
   * /api/projects:
   *   get:
   *     summary: Get all projects with pagination, search, and sorting
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *         description: Number of items per page
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search term for project names
   *       - in: query
   *         name: sort
   *         schema:
   *           type: string
   *         description: Field to sort by
   *       - in: query
   *         name: order
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *         description: Sort order
   *     responses:
   *       200:
   *         description: Projects retrieved successfully
   *       401:
   *         description: Unauthorized
   */
  static async getProjects(
    req: AuthRequest & PaginatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const pagination = req.pagination!;

      const { projects, total } = await ProjectService.getProjects(
        userId,
        pagination
      );

      const response = createPaginatedResponse(
        projects,
        total,
        pagination.page,
        pagination.limit
      );

      res.status(200).json({
        success: true,
        message: "Projects retrieved successfully",
        ...response,
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
   * /api/projects/{id}:
   *   get:
   *     summary: Get a specific project by ID
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Project ID
   *     responses:
   *       200:
   *         description: Project retrieved successfully
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
   *                     id:
   *                       type: integer
   *                     name:
   *                       type: string
   *                     description:
   *                       type: string
   *                     status:
   *                       type: string
   *                     ownerId:
   *                       type: integer
   *                     createdAt:
   *                       type: string
   *                       format: date-time
   *                     updatedAt:
   *                       type: string
   *                       format: date-time
   *                     tasks:
   *                       type: array
   *                       items:
   *                         type: object
   *                     teamMembers:
   *                       type: array
   *                       items:
   *                         type: object
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project not found
   */
  static async getProjectById(req: AuthRequest, res: Response): Promise<void> {
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
      const projectId = parseInt(req.params.id);

      // Validate that the ID is a valid number
      if (isNaN(projectId)) {
        res.status(400).json({
          success: false,
          message: "Invalid project ID",
        });
        return;
      }

      const project = await ProjectService.getProjectById(projectId, userId);

      res.status(200).json({
        success: true,
        message: "Project retrieved successfully",
        data: project,
      });
    } catch (error: any) {
      const statusCode = error.message.includes("Access denied")
        ? 403
        : error.message.includes("not found")
        ? 404
        : 400;

      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/projects/{id}:
   *   put:
   *     summary: Update a project
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: string
   *                 enum: [active, completed, on-hold]
   *     responses:
   *       200:
   *         description: Project updated successfully
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project not found
   */
  static async updateProject(req: AuthRequest, res: Response): Promise<void> {
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
      const projectId = parseInt(req.params.id);
      const { name, description, status } = req.body;

      const project = await ProjectService.updateProject(projectId, userId, {
        name,
        description,
        status,
      });

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project,
      });
    } catch (error: any) {
      const statusCode = error.message.includes("Access denied")
        ? 403
        : error.message.includes("not found")
        ? 404
        : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/projects/{id}:
   *   delete:
   *     summary: Delete a project
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Project deleted successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project not found
   */
  static async deleteProject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = parseInt(req.params.id);

      const result = await ProjectService.deleteProject(projectId, userId);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      const statusCode = error.message.includes("Access denied")
        ? 403
        : error.message.includes("not found")
        ? 404
        : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }
}
