import { app } from "./app.js";
import mongoose from "mongoose";

// Connect to database
mongoose.connect(process.env.MONGO_URI)
.then((c) => console.log(`Database connected with ${c.connection.host}`))
.catch((e) => console.log(e));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);
})