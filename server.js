import { app } from "./app.js";
import mongoose from "mongoose";

// Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch((e) => console.log(e));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT}`);
})