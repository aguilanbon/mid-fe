import express from "express";
import {
  fetchPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from "../controller/people.controller.js";
const peopleRouter = express.Router();

peopleRouter.get("/", fetchPeople);
peopleRouter.post("/", createPerson);
peopleRouter.put("/:id", updatePerson);
peopleRouter.delete("/:id", deletePerson);

export default peopleRouter;
