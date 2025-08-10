import { Router } from "express";
import { CommentController } from "../controllers/commentController";
import { authenticateToken } from "../middleware/auth";
import { commentValidation, idValidation } from "../middleware/validation";

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Comment routes
router.post(
  "/tasks/:taskId/comments",
  commentValidation,
  CommentController.createComment
);
router.get("/tasks/:taskId/comments", CommentController.getComments);
router.delete("/comments/:id", idValidation, CommentController.deleteComment);

export default router;
