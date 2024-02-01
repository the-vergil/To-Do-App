import jwt from "jsonwebtoken";

export const sendCookie = async (res, user, statusCode, message) => {
    const token = jwt.sign({ _id: user._id}, process.env.SECRET_KEY);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    }).json({
        success: true,
        message
    })
}