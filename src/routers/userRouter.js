import express from "express";
import routes from "../routes";
import {
  userPage,
  changePassword,
  changeProfit
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.user_page, userPage);
userRouter.get(routes.change_password, changePassword);
userRouter.get(routes.change_profit, changeProfit);

export default userRouter;
