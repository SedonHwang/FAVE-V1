import express from "express";
import routes from "../routes";
import {
  home,
  homeKr,
  homeJp,
  company
} from "../controllers/homepageController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.homeKr, homeKr);
globalRouter.get(routes.homeJp, homeJp);

globalRouter.get(routes.company, company);

export default globalRouter;
