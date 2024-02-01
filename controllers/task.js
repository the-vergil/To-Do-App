import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        await Task.create({ title, description, user: req.user });

        res.status(201).json({
            success: true,
            message: "Task added successfully."
        })
    } catch (error) {
        next(error);
    }
}

export const allTasks = async (req, res) => {
    try {
        const id = req.user._id;

        const tasks = await Task.find({ user: id});

        res.json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return next(new ErrorHandler("Invalid id", 404));
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.json({
            success: true,
            message: "Task updated."
        })
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return next(new ErrorHandler("Invalid id", 404));
        }

        res.json({
            success: true,
            message: "Task deleted."
        })
    } catch (error) {
        next(error);
    }
}