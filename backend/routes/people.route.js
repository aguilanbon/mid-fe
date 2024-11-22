import express from "express";
import {
  fetchPeople,
  createPerson,
  updatePerson,
  deletePerson,
  findPerson,
} from "../controller/people.controller.js";
import { validatePerson } from "../middleware/person.middleware.js";
const peopleRouter = express.Router();

peopleRouter.get("/", fetchPeople);
peopleRouter.post("/", validatePerson, createPerson);
peopleRouter.put("/:id", validatePerson, updatePerson);
peopleRouter.delete("/:id", deletePerson);
peopleRouter.get("/:id", findPerson);

export default peopleRouter;
