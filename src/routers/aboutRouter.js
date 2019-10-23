import express from "express";
import routes from "../routes";
import {
  fitness,
  game,
  character,
  connection,
  connectionKr,
  connectionJp,
  characterJp,
  characterKr
} from "../controllers/homepageController";

const aboutRouter = express.Router();

aboutRouter.get(routes.fitness, fitness);
aboutRouter.get(routes.game, game);
aboutRouter.get(routes.character, character);
aboutRouter.get(routes.character_kr, characterKr);
aboutRouter.get(routes.character_jp, characterJp);

aboutRouter.get(routes.connection, connection);
aboutRouter.get(routes.connection_kr, connectionKr);
aboutRouter.get(routes.connection_jp, connectionJp);

export default aboutRouter;
