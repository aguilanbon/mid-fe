import express from "express";
import dotenv from "dotenv";
import peopleRouter from "./routes/people.route.js";
import { initDatabase } from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/people", peopleRouter);

initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
