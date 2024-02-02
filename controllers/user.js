import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.json({
            success: true,
            users
        })
    } catch (error) {
        next(error);
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.find({_id: req.user});

        res.json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.find({email});

        if (user.length > 0) {
            return next(new ErrorHandler("User already exists.", 404));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });

        sendCookie(res, user, 201, "Registered Successfully.")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email}).select("+password");

        const doesPasswordMatch = await bcrypt.compare(password, user.password);

        if (!doesPasswordMatch) {
            return next(new ErrorHandler("Invalid id", 404));
        }

        sendCookie(res, user, 200, `Welcome back ${user.name}`);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            sameSite: process.send.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            success: true,
            message: "Logged out successfully."
        })
    } catch (error) {
        next(error);
    }
}