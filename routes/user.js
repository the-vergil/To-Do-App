import express from "express";
import { getUsers, register, login, logout, getMe } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Register User 
router.post("/register", register);

// Login User
router.post("/login", login);

// Logout
router.get("/logout", isAuthenticated, logout);

// Get all users
router.get("/all", getUsers);

// Get single user
router.get("/me", isAuthenticated, getMe);

export const userRoutes = router;