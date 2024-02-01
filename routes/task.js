import express from "express";
import { newTask, allTasks, updateTask, deleteTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/all", isAuthenticated, allTasks);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export const taskRoutes = router;