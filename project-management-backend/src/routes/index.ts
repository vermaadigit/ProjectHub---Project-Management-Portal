import { Router } from "express";
import authRoutes from "./authRoutes";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";
import teamRoutes from "./teamRoutes";
import commentRoutes from "./commentRoutes";

const router = Router();

router.use("/", authRoutes);
router.use("/", projectRoutes);
router.use("/", taskRoutes);
router.use("/", teamRoutes);
router.use("/", commentRoutes);

export default router;
