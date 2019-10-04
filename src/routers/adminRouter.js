import express from "express";
import routes from "../routes";
import {
  adminGame,
  adminNotice,
  adminLogin,
  postAdminLogin
} from "../controllers/adminController";
import { onlyAdmin } from "../middlewares";

const adminRouter = express.Router();

adminRouter.get(routes.admin_login, adminLogin);
adminRouter.post(routes.admin_login, postAdminLogin);
adminRouter.get(routes.admin_game, onlyAdmin, adminGame);
adminRouter.get(routes.admin_notice, onlyAdmin, adminNotice);

export default adminRouter;
