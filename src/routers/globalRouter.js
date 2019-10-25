import express from "express";
import routes from "../routes";
import {
  home,
  homeKr,
  homeJp,
  company,
  companyKr,
  companyJp,
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
  contactUs
} from "../controllers/homepageController";
import {
  onlyAdmin,
  onlyPublic,
  onlyPublicKr,
  uploadImg,
  onlyPrivateKr,
  onlyPublicJp
} from "../middlewares";

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
globalRouter.get(routes.companyKr, companyKr);
globalRouter.get(routes.companyJp, companyJp);

globalRouter.post(routes.contact, contactUs);
export default globalRouter;
