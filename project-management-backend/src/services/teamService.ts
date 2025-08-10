import { Op } from "sequelize";
import { Team, User, Project } from "../models";

export class TeamService {
  static async addTeamMember(
    projectId: number,
    requesterId: number,
    memberData: {
      userId: number;
      role?: "owner" | "admin" | "member";
    }
  ) {
    // Check if requester has admin or owner access
    const requesterMember = await Team.findOne({
      where: {
        projectId,
        userId: requesterId,
        role: { [Op.in]: ["owner", "admin"] },
      },
    });

    if (!requesterMember) {
      throw new Error(
        "Access denied. You need admin or owner access to add team members."
      );
    }

    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    // Check if user exists
    const user = await User.findByPk(memberData.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if user is already a team member
    const existingMember = await Team.findOne({
      where: { projectId, userId: memberData.userId },
    });

    if (existingMember) {
      throw new Error("User is already a team member");
    }

    const teamMember = await Team.create({
      projectId,
      userId: memberData.userId,
      role: memberData.role || "member",
    });

    return await Team.findByPk(teamMember.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
        {
          model: Project,
          as: "project",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  static async getTeamMembers(projectId: number, userId: number) {
    // Check if user has access to this project
    const teamMember = await Team.findOne({
      where: { projectId, userId },
    });

    if (!teamMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    const teamMembers = await Team.findAll({
      where: { projectId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email", "firstName", "lastName"],
        },
      ],
      order: [["joinedAt", "ASC"]],
    });

    return teamMembers;
  }

  static async removeTeamMember(teamId: number, requesterId: number) {
    const teamMember = await Team.findByPk(teamId);
    if (!teamMember) {
      throw new Error("Team member not found");
    }

    // Check if requester has admin or owner access OR is removing themselves
    const requesterMember = await Team.findOne({
      where: {
        projectId: teamMember.projectId,
        userId: requesterId,
      },
    });

    if (!requesterMember) {
      throw new Error("Access denied. You are not a member of this project.");
    }

    // Allow if requester is admin/owner OR is removing themselves
    const canRemove =
      ["owner", "admin"].includes(requesterMember.role) ||
      teamMember.userId === requesterId;

    if (!canRemove) {
      throw new Error(
        "Access denied. You can only remove yourself or need admin/owner access."
      );
    }

    // Prevent removal of the last owner
    if (teamMember.role === "owner") {
      const ownerCount = await Team.count({
        where: { projectId: teamMember.projectId, role: "owner" },
      });

      if (ownerCount <= 1) {
        throw new Error("Cannot remove the last owner from the project.");
      }
    }

    await teamMember.destroy();
    return { message: "Team member removed successfully" };
  }
}
