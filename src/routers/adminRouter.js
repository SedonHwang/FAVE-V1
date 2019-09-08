import express from "express";
import routes from "../routes";
import {
  login,
  postLogin,
  logout,
  adminGame,
  adminNotice
} from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.get(routes.admin_login, login);
adminRouter.post(routes.admin_login, postLogin);
adminRouter.get(routes.admin_logout, logout);
adminRouter.get(routes.admin_game, adminGame);
adminRouter.get(routes.admin_notice, adminNotice);

export default adminRouter;
