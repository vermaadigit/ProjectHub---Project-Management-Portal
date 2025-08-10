import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} from "../middleware/validation";

const router = Router();

router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);
router.get("/profile", authenticateToken, AuthController.getProfile);
router.put(
  "/profile",
  authenticateToken,
  updateProfileValidation,
  AuthController.updateProfile
); // Add this line

export default router;
