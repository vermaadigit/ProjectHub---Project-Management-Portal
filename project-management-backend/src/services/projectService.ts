import { Op } from "sequelize";
import { Project, User, Task, Team } from "../models";

export class ProjectService {
  static async createProject(
    userId: number,
    projectData: {
      name: string;
      description?: string;
      status?: "active" | "completed" | "on-hold";
    }
  ) {
    try {
      // Verify user exists first
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const project = await Project.create({
        name: projectData.name,
        description: projectData.description,
        status: projectData.status || "active",
        userId,
      });

      // Add the creator as owner in the team
      await Team.create({
        projectId: project.id,
        userId,
        role: "owner",
      });

      return project;
    } catch (error: any) {
      console.error("Error creating project:", error);
      throw new Error(`Failed to create project: ${error.message}`);
    }
  }

  static async getProjects(
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
    const whereClause: any = {};

    // Only show projects where user is a team member or owner
    const userTeamProjects = await Team.findAll({
      where: { userId },
      attributes: ["projectId"],
    });

    const projectIds = userTeamProjects.map((team) => team.projectId);

    if (projectIds.length === 0) {
      return { projects: [], total: 0 };
    }

    whereClause.id = { [Op.in]: projectIds };

    if (options.search) {
      whereClause.name = {
        [Op.iLike]: `%${options.search}%`,
      };
    }

    const { count, rows } = await Project.findAndCountAll({
      where: whereClause,
      limit: options.limit,
      offset: options.offset,
      order: [[options.sort, options.order]],
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "username", "email"],
        },
        {
          model: Task,
          as: "tasks",
          attributes: ["id", "title", "status"],
        },
      ],
    });

    return { projects: rows, total: count };
  }

  static async getProjectById(projectId: number, userId: number) {
    // Check if user has access to this project
    const teamMember = await Team.findOne({
      where: { projectId, userId },
    });

    if (!teamMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "username", "email"],
        },
        {
          model: Task,
          as: "tasks",
          include: [
            {
              model: User,
              as: "assignee",
              attributes: ["id", "username", "email"],
            },
          ],
        },
        {
          model: Team,
          as: "teamMembers",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "email"],
            },
          ],
        },
      ],
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  static async updateProject(
    projectId: number,
    userId: number,
    updateData: {
      name?: string;
      description?: string;
      status?: "active" | "completed" | "on-hold";
    }
  ) {
    // Check if user has admin or owner access
    const teamMember = await Team.findOne({
      where: { projectId, userId, role: { [Op.in]: ["owner", "admin"] } },
    });

    if (!teamMember) {
      throw new Error(
        "Access denied. You need admin or owner access to update this project."
      );
    }

    const [updatedRows] = await Project.update(updateData, {
      where: { id: projectId },
    });

    if (updatedRows === 0) {
      throw new Error("Project not found");
    }

    return await this.getProjectById(projectId, userId);
  }

  static async deleteProject(projectId: number, userId: number) {
    // Check if user is the owner
    const teamMember = await Team.findOne({
      where: { projectId, userId, role: "owner" },
    });

    if (!teamMember) {
      throw new Error(
        "Access denied. Only project owners can delete projects."
      );
    }

    const deletedRows = await Project.destroy({
      where: { id: projectId },
    });

    if (deletedRows === 0) {
      throw new Error("Project not found");
    }

    return { message: "Project deleted successfully" };
  }
}
