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
  logoutJp,
  privacy,
  privacyKr,
  privacyJp,
  termOfUse,
  termOfUseJp,
  termOfUseKr,
  forgotPassword,
  forgotPasswordKr,
  forgotPasswordJp,
  postForgotPassword,
  postForgotPasswordKr,
  postForgotPasswordJp
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

globalRouter.get(routes.privacy, privacy);
globalRouter.get(routes.privacy_kr, privacyKr);
globalRouter.get(routes.privacy_jp, privacyJp);

globalRouter.get(routes.termOfUse, termOfUse);
globalRouter.get(routes.termOfUse_kr, termOfUseKr);
globalRouter.get(routes.termOfUse_jp, termOfUseJp);

globalRouter.get(routes.forgotPassword, onlyPublic, forgotPassword);
globalRouter.get(routes.forgotPassword_kr, onlyPublicKr, forgotPasswordKr);
globalRouter.get(routes.forgotPassword_jp, onlyPublicJp, forgotPasswordJp);

globalRouter.post(routes.forgotPassword, onlyPublic, postForgotPassword);
globalRouter.post(routes.forgotPassword_kr, onlyPublicKr, postForgotPasswordKr);
globalRouter.post(routes.forgotPassword_jp, onlyPublicJp, postForgotPasswordJp);

export default globalRouter;
