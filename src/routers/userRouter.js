import express from "express";
import routes from "../routes";
import {
  userPage,
  changePassword,
  changeProfile,
  userPageKr,
  userPageJp,
  changeProfileKr,
  changeProfileJp
} from "../controllers/userController";

import { onlyPrivate, onlyPrivateKr, onlyPrivateJp } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.user_page, onlyPrivate, userPage);
userRouter.get(routes.user_page_ko, onlyPrivateKr, userPageKr);
userRouter.get(routes.user_page_jp, onlyPrivateJp, userPageJp);
userRouter.post(routes.user_page, changeProfile);
userRouter.post(routes.user_page_jp, changeProfileKr);
userRouter.post(routes.user_page_ko, changeProfileJp);
userRouter.get(routes.change_password, changePassword);

export default userRouter;
