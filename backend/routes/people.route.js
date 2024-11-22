import express from "express";
import { fetchPeople, createPeople } from "../controller/people.controller.js";
const peopleRouter = express.Router();

peopleRouter.get("/", fetchPeople);
peopleRouter.post("/", createPeople);

export default peopleRouter;
