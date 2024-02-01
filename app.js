import express from "express";
import { config } from "dotenv";
import { userRoutes } from "./routes/user.js";
import cookieParser from "cookie-parser";
import { taskRoutes } from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";

export const app = express();

config();

// use middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task/", taskRoutes);

// Home page
app.get("/", (req, res) => {
    res.send("Nice");
})

// Error middleware
app.use(errorMiddleware);