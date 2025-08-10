import { Response } from "express";
import { validationResult } from "express-validator";
import { TaskService } from "../services/taskService";
import { AuthRequest } from "../middleware/auth";
import {
  PaginatedRequest,
  createPaginatedResponse,
} from "../middleware/pagination";

export class TaskController {
  /**
   * @swagger
   * /api/projects/{projectId}/tasks:
   *   post:
   *     summary: Create a new task in a project
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: projectId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Project ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *             properties:
   *               title:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 200
   *               description:
   *                 type: string
   *                 maxLength: 1000
   *               status:
   *                 type: string
   *                 enum: [todo, in-progress, completed]
   *               priority:
   *                 type: string
   *                 enum: [low, medium, high]
   *               assignedTo:
   *                 type: integer
   *                 description: User ID to assign the task to
   *     responses:
   *       201:
   *         description: Task created successfully
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project not found
   */
  static async createTask(req: AuthRequest, res: Response): Promise<void> {
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
      const projectId = parseInt(req.params.projectId);
      const { title, description, status, priority, assignedTo } = req.body;

      const task = await TaskService.createTask(projectId, userId, {
        title,
        description,
        status,
        priority,
        assignedTo,
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
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
   * /api/projects/{projectId}/tasks:
   *   get:
   *     summary: Get all tasks in a project with pagination, search, and sorting
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: projectId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Project ID
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
   *         description: Search term for task title or status
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
   *         description: Tasks retrieved successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project not found
   */
  static async getTasks(
    req: AuthRequest & PaginatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = parseInt(req.params.projectId);
      const pagination = req.pagination!;

      const { tasks, total } = await TaskService.getTasks(
        projectId,
        userId,
        pagination
      );

      const response = createPaginatedResponse(
        tasks,
        total,
        pagination.page,
        pagination.limit
      );

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        ...response,
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
   * /api/tasks/{id}:
   *   put:
   *     summary: Update a task
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Task ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 200
   *               description:
   *                 type: string
   *                 maxLength: 1000
   *               status:
   *                 type: string
   *                 enum: [todo, in-progress, completed]
   *               priority:
   *                 type: string
   *                 enum: [low, medium, high]
   *               assignedTo:
   *                 type: integer
   *                 description: User ID to assign the task to
   *     responses:
   *       200:
   *         description: Task updated successfully
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Task not found
   */
  static async updateTask(req: AuthRequest, res: Response): Promise<void> {
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
      const taskId = parseInt(req.params.id);
      const { title, description, status, priority, assignedTo } = req.body;

      const task = await TaskService.updateTask(taskId, userId, {
        title,
        description,
        status,
        priority,
        assignedTo,
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task,
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
   * /api/tasks/{id}:
   *   delete:
   *     summary: Delete a task
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Task ID
   *     responses:
   *       200:
   *         description: Task deleted successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Task not found
   */
  static async deleteTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const taskId = parseInt(req.params.id);

      const result = await TaskService.deleteTask(taskId, userId);

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
