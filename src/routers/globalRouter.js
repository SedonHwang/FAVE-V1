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
  contactUs,
  contactUsKr,
  contactUsJp,
  getSignupJp,
  getLoginKr,
  getLoginJp,
  postLoginKr,
  postLoginJp,
  postSignupJp,
  getSignupKr,
  postSignupKr,
  logoutKr,
  logoutJp
} from "../controllers/homepageController";
import {
  onlyAdmin,
  onlyPublic,
  onlyPublicKr,
  uploadImg,
  onlyPrivate,
  onlyPrivateKr,
  onlyPrivateJp,
  onlyPublicJp
} from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.homeKr, homeKr);
globalRouter.get(routes.homeJp, homeJp);

globalRouter.get(routes.signup, onlyPublic, getSignup);
globalRouter.get(routes.signup_kr, onlyPublicKr, getSignupKr);
globalRouter.get(routes.signup_jp, onlyPublicJp, getSignupJp);

globalRouter.post(routes.signup, onlyPublic, postSignup, postLogin);
globalRouter.post(routes.signup_kr, onlyPublicKr, postSignupKr, postLoginKr);
globalRouter.post(routes.signup_jp, onlyPublicJp, postSignupJp, postLoginJp);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.get(routes.login_kr, onlyPublicKr, getLoginKr);
globalRouter.get(routes.login_jp, onlyPublicJp, getLoginJp);

globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.post(routes.login_kr, onlyPublicKr, postLoginKr);
globalRouter.post(routes.login_jp, onlyPublicJp, postLoginJp);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.logout_kr, onlyPrivateKr, logoutKr);
globalRouter.get(routes.logout_jp, onlyPrivateJp, logoutJp);

globalRouter.get(routes.company, company);
globalRouter.get(routes.companyKr, companyKr);
globalRouter.get(routes.companyJp, companyJp);

globalRouter.post(routes.contact, contactUs);
globalRouter.post(routes.contactKr, contactUsKr);
globalRouter.post(routes.contactJp, contactUsJp);
export default globalRouter;
