import express from "express";
import routes from "../routes";
import {
  home,
  homeKr,
  homeJp,
  company,
  getSignup,
  postSignup,
  login,
  logout
} from "../controllers/homepageController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.homeKr, homeKr);
globalRouter.get(routes.homeJp, homeJp);

globalRouter.get(routes.signup, getSignup);
globalRouter.post(routes.signup, postSignup);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.company, company);

export default globalRouter;
