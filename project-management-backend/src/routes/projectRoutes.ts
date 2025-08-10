import { Router } from "express";
import { ProjectController } from "../controllers/projectController";
import { authenticateToken } from "../middleware/auth";
import { paginationMiddleware } from "../middleware/pagination";
import {
  projectValidation,
  paginationValidation,
  idValidation,
} from "../middleware/validation";

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

router.post("/projects", projectValidation, ProjectController.createProject);
router.get(
  "/projects",
  paginationValidation,
  paginationMiddleware,
  ProjectController.getProjects
);

// 🆕 Add this route for getting a specific project
router.get("/projects/:id", idValidation, ProjectController.getProjectById);

router.put(
  "/projects/:id",
  idValidation,
  projectValidation,
  ProjectController.updateProject
);

// 🔧 Fix: Missing slash before projects
router.delete("/projects/:id", idValidation, ProjectController.deleteProject);

export default router;
