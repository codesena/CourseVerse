import express from "express";
import cors from "cors";
const app = express();
import connectDB from "./config/db";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
