import express from "express";
import routes from "../routes";
import {
  home,
  homeKr,
  homeJp,
  company,
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
  contactUs
} from "../controllers/homepageController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.homeKr, homeKr);
globalRouter.get(routes.homeJp, homeJp);

globalRouter.get(routes.signup, getSignup);
globalRouter.post(routes.signup, postSignup, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.company, company);

globalRouter.post(routes.contact, contactUs);
export default globalRouter;
