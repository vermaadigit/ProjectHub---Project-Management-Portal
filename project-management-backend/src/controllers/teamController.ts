import { Response } from "express";
import { validationResult } from "express-validator";
import { TeamService } from "../services/teamService";
import { AuthRequest } from "../middleware/auth";

export class TeamController {
  /**
   * @swagger
   * /api/projects/{projectId}/teams:
   *   post:
   *     summary: Add a team member to a project
   *     tags: [Teams]
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
   *               - userId
   *             properties:
   *               userId:
   *                 type: integer
   *                 minimum: 1
   *                 description: ID of the user to add to the team
   *               role:
   *                 type: string
   *                 enum: [owner, admin, member]
   *                 default: member
   *                 description: Role of the team member
   *     responses:
   *       201:
   *         description: Team member added successfully
   *       400:
   *         description: Validation error or user already exists
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project or user not found
   */
  static async addTeamMember(req: AuthRequest, res: Response): Promise<void> {
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

      const requesterId = req.user!.id;
      const projectId = parseInt(req.params.projectId);
      const { userId, role } = req.body;

      const teamMember = await TeamService.addTeamMember(
        projectId,
        requesterId,
        {
          userId,
          role,
        }
      );

      res.status(201).json({
        success: true,
        message: "Team member added successfully",
        data: teamMember,
      });
    } catch (error: any) {
      const statusCode = error.message.includes("Access denied")
        ? 403
        : error.message.includes("not found")
        ? 404
        : error.message.includes("already")
        ? 400
        : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * @swagger
   * /api/projects/{projectId}/teams:
   *   get:
   *     summary: Get all team members of a project
   *     tags: [Teams]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: projectId
   *         required: true
   *         schema:
   *           type: integer
   *         description: Project ID
   *     responses:
   *       200:
   *         description: Team members retrieved successfully
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
   *                     properties:
   *                       id:
   *                         type: integer
   *                       role:
   *                         type: string
   *                       joinedAt:
   *                         type: string
   *                         format: date-time
   *                       user:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: integer
   *                           username:
   *                             type: string
   *                           email:
   *                             type: string
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Project not found
   */
  static async getTeamMembers(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const projectId = parseInt(req.params.projectId);

      const teamMembers = await TeamService.getTeamMembers(projectId, userId);

      res.status(200).json({
        success: true,
        message: "Team members retrieved successfully",
        data: teamMembers,
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
   * /api/teams/{id}:
   *   delete:
   *     summary: Remove a team member from a project
   *     tags: [Teams]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Team member ID
   *     responses:
   *       200:
   *         description: Team member removed successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Access denied
   *       404:
   *         description: Team member not found
   */
  static async removeTeamMember(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const requesterId = req.user!.id;
      const teamId = parseInt(req.params.id);

      const result = await TeamService.removeTeamMember(teamId, requesterId);

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
