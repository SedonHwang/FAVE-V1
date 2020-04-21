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
  editNotice,
  postEditNotice,
  deleteNotice,
  payments,
  postPayments,
} from "../controllers/adminController";
import { onlyAdmin, onlyPublic, onlyPrivate, uploadImg } from "../middlewares";

const adminRouter = express.Router();

adminRouter.get(routes.admin_login, onlyPublic, adminLogin);
adminRouter.post(routes.admin_login, onlyPublic, postAdminLogin);

adminRouter.get(routes.admin_logout, onlyAdmin, adminLogout);

adminRouter.get(routes.admin_game, onlyAdmin, adminGame);

adminRouter.get(routes.admin_notice, onlyAdmin, adminNotice);

adminRouter.get(routes.upload_notice, onlyAdmin, uploadNotice);
adminRouter.post(routes.upload_notice, uploadImg, onlyAdmin, postUploadNotice);

adminRouter.get(routes.editNotice(), onlyAdmin, editNotice);
adminRouter.post(routes.editNotice(), onlyAdmin, postEditNotice);

adminRouter.get(routes.deleteNotice(), onlyAdmin, deleteNotice);

adminRouter.get(routes.payments, onlyAdmin, payments);
adminRouter.post(routes.payments, onlyAdmin, postPayments);

export default adminRouter;
