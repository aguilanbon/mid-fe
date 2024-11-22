import express from "express";
import {
  fetchPeople,
  createPerson,
  updatePerson,
  deletePerson,
  findPerson,
} from "../controller/people.controller.js";
const peopleRouter = express.Router();

peopleRouter.get("/", fetchPeople);
peopleRouter.post("/", createPerson);
peopleRouter.put("/:id", updatePerson);
peopleRouter.delete("/:id", deletePerson);
peopleRouter.get("/:id", findPerson);

export default peopleRouter;
