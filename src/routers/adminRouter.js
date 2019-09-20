import express from "express";
import passport from "passport";
import routes from "../routes";
import { adminGame, adminNotice } from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.get(routes.admin_game, adminGame);
adminRouter.get(routes.admin_notice, adminNotice);

export default adminRouter;
