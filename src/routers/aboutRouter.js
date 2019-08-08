import express from "express";
import routes from "../routes";
import {
  fitness,
  game,
  character,
  connection
} from "../controllers/homepageController";

const aboutRouter = express.Router();

aboutRouter.get(routes.fitness, fitness);
aboutRouter.get(routes.game, game);
aboutRouter.get(routes.character, character);
aboutRouter.get(routes.connection, connection);

export default aboutRouter;
