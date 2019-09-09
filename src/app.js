import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import aboutRouter from "./routers/aboutRouter";
import noticeRouter from "./routers/noticeRouter";
import adminRouter from "./routers/adminRouter";
import { localsMiddleware } from "./middlewares";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "asdasd",
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.about, aboutRouter);
app.use(routes.notice, noticeRouter);
app.use(routes.admin, adminRouter);

export default app;
