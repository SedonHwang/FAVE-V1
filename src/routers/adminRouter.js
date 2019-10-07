import express from "express";
import routes from "../routes";
import {
  adminGame,
  adminNotice,
  adminLogin,
  postAdminLogin,
  adminLogout,
  uploadNotice
} from "../controllers/adminController";
import { onlyAdmin, onlyPublic } from "../middlewares";

const adminRouter = express.Router();

adminRouter.get(routes.admin_login, onlyPublic, adminLogin);
adminRouter.post(routes.admin_login, onlyPublic, postAdminLogin);
adminRouter.get(routes.admin_logout, adminLogout);
adminRouter.get(routes.admin_game, onlyAdmin, adminGame);
adminRouter.get(routes.admin_notice, onlyAdmin, adminNotice);
adminRouter.get(routes.upload_notice, uploadNotice);

export default adminRouter;
