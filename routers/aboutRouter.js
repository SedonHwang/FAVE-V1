import express from "express";
import routes from "../routes";

const aboutRouter = express.Router();

aboutRouter.get(routes.fitness, (req, res) => res.send("fitness"));
aboutRouter.get(routes.game, (req, res) => res.send("game"));
aboutRouter.get(routes.character, (req, res) => res.send("character"));
aboutRouter.get(routes.connection, (req, res) => res.send("connection"));

export default aboutRouter;
