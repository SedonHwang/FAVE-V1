import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  login,
  postLogin,
  logout,
  adminGame,
  adminNotice
} from "../controllers/adminController";
import { onlyPrivate } from "../middlewares";

const adminRouter = express.Router();

adminRouter.get(routes.admin_login, login);
adminRouter.post(
  routes.admin_login,
  passport.authenticate("local", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/notice"
  })
);
adminRouter.get(routes.admin_logout, logout);
adminRouter.get(routes.admin_game, onlyPrivate, adminGame);
adminRouter.get(routes.admin_notice, onlyPrivate, adminNotice);

export default adminRouter;
