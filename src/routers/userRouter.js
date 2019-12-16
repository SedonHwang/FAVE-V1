import express from "express";
import routes from "../routes";
import {
  userPage,
  userPageKr,
  userPageJp,
  changeProfile,
  changeProfileKr,
  changeProfileJp,
  changePassword,
  changePasswordKr,
  changePasswordJp,
  postChangePassword,
  postChangePasswordKr,
  postChangePasswordJp
} from "../controllers/userController";

import { onlyPrivate, onlyPrivateKr, onlyPrivateJp } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.user_page, onlyPrivate, userPage);
userRouter.get(routes.user_page_kr, onlyPrivateKr, userPageKr);
userRouter.get(routes.user_page_jp, onlyPrivateJp, userPageJp);

userRouter.post(routes.user_page, onlyPrivate, changeProfile);
userRouter.post(routes.user_page_jp, onlyPrivateKr, changeProfileKr);
userRouter.post(routes.user_page_kr, onlyPrivateJp, changeProfileJp);

userRouter.get(routes.change_password, onlyPrivate, changePassword);
userRouter.get(routes.change_password_kr, changePasswordKr);
userRouter.get(routes.change_password_jp, changePasswordJp);

userRouter.post(routes.change_password, onlyPrivate, postChangePassword);
userRouter.post(routes.change_password_kr, onlyPrivateKr, postChangePasswordKr);
userRouter.post(routes.change_password_jp, onlyPrivateJp, postChangePasswordJp);

export default userRouter;
