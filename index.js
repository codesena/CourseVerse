import express from "express";
import userRouter from "./route/user.js";
import adminRouter from "./route/admin.js";
import courseRouter from "./route/course.js";
import { connectDB } from "./middleware/db.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/course", courseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
