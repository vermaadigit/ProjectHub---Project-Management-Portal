import { Router } from "express";
import { TeamController } from "../controllers/teamController";
import { authenticateToken } from "../middleware/auth";
import { teamValidation, idValidation } from "../middleware/validation";

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Team routes
router.post(
  "/projects/:projectId/teams",
  teamValidation,
  TeamController.addTeamMember
);
router.get("/projects/:projectId/teams", TeamController.getTeamMembers);
router.delete("/teams/:id", idValidation, TeamController.removeTeamMember);

export default router;
