import express from "express";
import {
  fetchPeople,
  createPeople,
  updatePeople,
} from "../controller/people.controller.js";
const peopleRouter = express.Router();

peopleRouter.get("/", fetchPeople);
peopleRouter.post("/", createPeople);
peopleRouter.put("/:id", updatePeople);

export default peopleRouter;
