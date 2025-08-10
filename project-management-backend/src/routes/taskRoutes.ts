import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth";
import { paginationMiddleware } from "../middleware/pagination";
import {
  taskValidation,
  paginationValidation,
  idValidation,
} from "../middleware/validation";

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Task routes
router.post(
  "/projects/:projectId/tasks",
  taskValidation,
  TaskController.createTask
);
router.get(
  "/projects/:projectId/tasks",
  paginationValidation,
  paginationMiddleware,
  TaskController.getTasks
);

router.put(
  "/tasks/:id",
  idValidation,
  taskValidation,
  TaskController.updateTask
);
router.delete("/tasks/:id", idValidation, TaskController.deleteTask);

export default router;
