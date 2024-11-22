import express from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks.route.js";
import { initDatabase } from "./config/db.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/tasks", tasksRouter);

initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
