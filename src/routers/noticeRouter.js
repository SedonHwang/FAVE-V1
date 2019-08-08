import express from "express";
import routes from "../routes";
import { noticeHome, noticeDetail } from "../controllers/homepageController";

const noticeRouter = express.Router();

noticeRouter.get(routes.notice_home, noticeHome);
noticeRouter.get(routes.notice_detail, noticeDetail);

export default noticeRouter;
