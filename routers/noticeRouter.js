import express from "express";
import routes from "../routes";

const noticeRouter = express.Router();

noticeRouter.get(routes.notice_home, (req, res) => res.send("notice"));
noticeRouter.get(routes.notice_detail, (req, res) => res.send("notice_detail"));

export default noticeRouter;
