import express from "express";
import routes from "../routes";
import {
  noticeHome,
  noticeHomeJp,
  noticeDetail,
  noticeHomeKr,
  noticeDetailKr,
  noticeDetailJp
} from "../controllers/homepageController";

const noticeRouter = express.Router();

noticeRouter.get(routes.notice_home, noticeHome);
noticeRouter.get(routes.notice_home_kr, noticeHomeKr);
noticeRouter.get(routes.notice_home_jp, noticeHomeJp);
noticeRouter.get(routes.notice_detail, noticeDetail);
noticeRouter.get(routes.notice_detail_kr, noticeDetailKr);
noticeRouter.get(routes.notice_detail_jp, noticeDetailJp);

export default noticeRouter;
