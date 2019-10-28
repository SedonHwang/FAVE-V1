import express from "express";
import routes from "../routes";
import {
  noticeHome,
  noticeHomeJp,
  noticeDetail,
  noticeHomeKr
} from "../controllers/homepageController";

const noticeRouter = express.Router();

noticeRouter.get(routes.notice_home, noticeHome);
noticeRouter.get(routes.notice_home_kr, noticeHomeKr);
noticeRouter.get(routes.notice_home_jp, noticeHomeJp);
noticeRouter.get(routes.notice_detail, noticeDetail);

export default noticeRouter;
