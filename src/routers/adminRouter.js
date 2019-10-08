import express from "express";
import routes from "../routes";
import {
  adminGame,
  adminNotice,
  adminLogin,
  postAdminLogin,
  adminLogout,
  uploadNotice,
  postUploadNotice,
  deleteNotice
} from "../controllers/adminController";
import { onlyAdmin, onlyPublic, uploadImg } from "../middlewares";

const adminRouter = express.Router();

adminRouter.get(routes.admin_login, onlyPublic, adminLogin);
adminRouter.post(routes.admin_login, onlyPublic, postAdminLogin);
adminRouter.get(routes.admin_logout, adminLogout);
adminRouter.get(routes.admin_game, onlyAdmin, adminGame);
adminRouter.get(routes.admin_notice, onlyAdmin, adminNotice);
adminRouter.get(routes.upload_notice, uploadNotice);
adminRouter.post(routes.upload_notice, uploadImg, postUploadNotice);
adminRouter.get(routes.deleteNotice(), deleteNotice);

export default adminRouter;
