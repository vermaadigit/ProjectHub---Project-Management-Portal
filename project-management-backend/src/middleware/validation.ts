import { body, query, param, ValidationChain } from "express-validator";

export const registerValidation: ValidationChain[] = [
  body("username")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("firstName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("First name must be less than 50 characters"),
  body("lastName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Last name must be less than 50 characters"),
];

export const loginValidation: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const projectValidation: ValidationChain[] = [
  body("name")
    .isLength({ min: 1, max: 100 })
    .withMessage("Project name must be between 1 and 100 characters")
    .trim(),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
  body("status")
    .optional()
    .isIn(["active", "completed", "on-hold"])
    .withMessage("Status must be active, completed, or on-hold"),
];

export const taskValidation: ValidationChain[] = [
  body("title")
    .isLength({ min: 1, max: 200 })
    .withMessage("Task title must be between 1 and 200 characters")
    .trim(),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "completed"])
    .withMessage("Status must be todo, in-progress, or completed"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("assignedTo")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Assigned user ID must be a positive integer"),
];

export const teamValidation: ValidationChain[] = [
  body("userId")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  body("role")
    .optional()
    .isIn(["owner", "admin", "member"])
    .withMessage("Role must be owner, admin, or member"),
];

export const commentValidation: ValidationChain[] = [
  body("content")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment content must be between 1 and 1000 characters")
    .trim(),
];

export const paginationValidation: ValidationChain[] = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  query("search")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Search query must be less than 100 characters"),
  query("sort")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Sort field must be less than 50 characters"),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];
export const updateProfileValidation: ValidationChain[] = [
  body("username")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("firstName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("First name must be less than 50 characters"),
  body("lastName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Last name must be less than 50 characters"),
];


export const idValidation: ValidationChain[] = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
];
