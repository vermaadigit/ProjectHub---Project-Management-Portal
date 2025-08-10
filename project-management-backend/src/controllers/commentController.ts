import { Response } from "express";
import { validationResult } from "express-validator";
import { CommentService } from "../services/commentService";
import { AuthRequest } from "../middleware/auth";

export class CommentController {
  /**
   * @swagger
   * /api/tasks/{taskId}/comments:
   *   post:
   *     summary: Add a comment to a task
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: taskId
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
   *             required:
   *               - content
   *             properties:
   *               content:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 1000
   *                 description: Comment content
   *     responses:
   *       201:
   *         description: Comment created successfully
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
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Task not found
   */
  static async createComment(req: AuthRequest, res: Response): Promise<void> {
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
      const taskId = parseInt(req.params.taskId);
      const { content } = req.body;

      const comment = await CommentService.createComment(
        taskId,
        userId,
        content
      );

      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: comment,
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
   * /api/tasks/{taskId}/comments:
   *   get:
   *     summary: Get all comments for a task
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Task ID
   *     responses:
   *       200:
   *         description: Comments retrieved successfully
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
   *                   type: array
   *                   items:
   *                     type: object
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Task not found
   */
  static async getComments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const taskId = parseInt(req.params.taskId);

      const comments = await CommentService.getComments(taskId, userId);

      res.status(200).json({
        success: true,
        message: "Comments retrieved successfully",
        data: comments,
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
   * /api/comments/{id}:
   *   delete:
   *     summary: Delete a comment
   *     tags: [Comments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Comment ID
   *     responses:
   *       200:
   *         description: Comment deleted successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Comment not found
   */
  static async deleteComment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const commentId = parseInt(req.params.id);

      const result = await CommentService.deleteComment(commentId, userId);

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
