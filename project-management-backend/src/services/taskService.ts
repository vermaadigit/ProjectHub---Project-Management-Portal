import { Op } from "sequelize";
import { Task, User, Project, Team } from "../models";

export class TaskService {
  static async createTask(
    projectId: number,
    userId: number,
    taskData: {
      title: string;
      description?: string;
      status?: "todo" | "in-progress" | "completed";
      priority?: "low" | "medium" | "high";
      assignedTo?: number;
    }
  ) {
    try {
      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      // Check if user has access to this project
      const teamMember = await Team.findOne({
        where: { projectId, userId },
      });

      if (!teamMember) {
        throw new Error("Access denied. You are not a member of this project.");
      }

      // If assignedTo is provided, check if the assigned user is a team member
      if (taskData.assignedTo) {
        const assignedUser = await User.findByPk(taskData.assignedTo);
        if (!assignedUser) {
          throw new Error("Assigned user does not exist");
        }

        const assignedTeamMember = await Team.findOne({
          where: { projectId, userId: taskData.assignedTo },
        });

        if (!assignedTeamMember) {
          throw new Error(
            "Cannot assign task to user who is not a project member."
          );
        }
      }

      const task = await Task.create({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || "todo",
        priority: taskData.priority || "medium",
        projectId,
        assignedTo: taskData.assignedTo,
      });

      return await Task.findByPk(task.id, {
        include: [
          {
            model: User,
            as: "assignee",
            attributes: ["id", "username", "email"],
            required: false, // Left join in case assignedTo is null
          },
          {
            model: Project,
            as: "project",
            attributes: ["id", "name"],
          },
        ],
      });
    } catch (error: any) {
      console.error("Error creating task:", error);
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  static async getTasks(
    projectId: number,
    userId: number,
    options: {
      page: number;
      limit: number;
      offset: number;
      search?: string;
      sort: string;
      order: "ASC" | "DESC";
    }
  ) {
    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    // Check if user has access to this project
    const teamMember = await Team.findOne({
      where: { projectId, userId },
    });

    if (!teamMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    const whereClause: any = { projectId };

    if (options.search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${options.search}%` } },
        { status: { [Op.iLike]: `%${options.search}%` } },
      ];
    }

    const { count, rows } = await Task.findAndCountAll({
      where: whereClause,
      limit: options.limit,
      offset: options.offset,
      order: [[options.sort, options.order]],
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "email"],
          required: false, // Left join in case assignedTo is null
        },
        {
          model: Project,
          as: "project",
          attributes: ["id", "name"],
        },
      ],
    });

    return { tasks: rows, total: count };
  }

  static async updateTask(
    taskId: number,
    userId: number,
    updateData: {
      title?: string;
      description?: string;
      status?: "todo" | "in-progress" | "completed";
      priority?: "low" | "medium" | "high";
      assignedTo?: number;
    }
  ) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    // Check if user has access to this project
    const teamMember = await Team.findOne({
      where: { projectId: task.projectId, userId },
    });

    if (!teamMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    // If assignedTo is being updated, check if the assigned user is a team member
    if (updateData.assignedTo !== undefined) {
      if (updateData.assignedTo !== null) {
        const assignedUser = await User.findByPk(updateData.assignedTo);
        if (!assignedUser) {
          throw new Error("Assigned user does not exist");
        }

        const assignedTeamMember = await Team.findOne({
          where: { projectId: task.projectId, userId: updateData.assignedTo },
        });

        if (!assignedTeamMember) {
          throw new Error(
            "Cannot assign task to user who is not a project member."
          );
        }
      }
    }

    await task.update(updateData);

    return await Task.findByPk(taskId, {
      include: [
        {
          model: User,
          as: "assignee",
          attributes: ["id", "username", "email"],
          required: false, // Left join in case assignedTo is null
        },
        {
          model: Project,
          as: "project",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  static async deleteTask(taskId: number, userId: number) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
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
        "Access denied. You need admin or owner access to delete tasks."
      );
    }

    await task.destroy();
    return { message: "Task deleted successfully" };
  }
}
