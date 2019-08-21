import express from "express";
import routes from "../routes";
import {
  home,
  homeKr,
  homeJp,
  company
} from "../controllers/homepageController";
import { signup, login, logout } from "../controllers/adminController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.homeKr, homeKr);
globalRouter.get(routes.homeJp, homeJp);

globalRouter.get(routes.signup, signup);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.company, company);

export default globalRouter;
