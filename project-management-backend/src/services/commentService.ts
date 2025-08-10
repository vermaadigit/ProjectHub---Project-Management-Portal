import { Op } from "sequelize";
import { Comment, User, Task, Team } from "../models";

export class CommentService {
  static async createComment(taskId: number, userId: number, content: string) {
    // Check if task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    // Check if user has access to the project containing this task
    const teamMember = await Team.findOne({
      where: { projectId: task.projectId, userId },
    });

    if (!teamMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    const comment = await Comment.create({
      content,
      taskId,
      userId,
    });

    return await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
        {
          model: Task,
          as: "task",
          attributes: ["id", "title"],
        },
      ],
    });
  }

  static async getComments(taskId: number, userId: number) {
    // Check if task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    // Check if user has access to the project containing this task
    const teamMember = await Team.findOne({
      where: { projectId: task.projectId, userId },
    });

    if (!teamMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    const comments = await Comment.findAll({
      where: { taskId },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return comments;
  }

  static async deleteComment(commentId: number, userId: number) {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Allow deletion if user is the author
    if (comment.userId === userId) {
      await comment.destroy();
      return { message: "Comment deleted successfully" };
    }

    // For admin/owner check, fetch the task separately
    const task = await Task.findByPk(comment.taskId);
    if (!task) {
      throw new Error("Associated task not found");
    }

    // Check if user has admin or owner access to the project
    const teamMember = await Team.findOne({
      where: {
        projectId: task.projectId,
        userId,
        role: { [Op.in]: ["owner", "admin"] },
      },
    });

    if (!teamMember) {
      throw new Error(
        "Access denied. You can only delete your own comments or need admin/owner access."
      );
    }

    await comment.destroy();
    return { message: "Comment deleted successfully" };
  }
}
