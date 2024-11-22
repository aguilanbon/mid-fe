import express from "express";
import { fetchPeople } from "../controller/people.controller.js";
const peopleRouter = express.Router();

peopleRouter.get("/", fetchPeople);

export default peopleRouter;
