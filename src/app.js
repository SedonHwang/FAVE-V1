import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import hpp from "hpp";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import aboutRouter from "./routers/aboutRouter";
import noticeRouter from "./routers/noticeRouter";
import adminRouter from "./routers/adminRouter";
import userRouter from "./routers/userRouter";
import storeRouter from "./routers/storeRouter";
import { localsMiddleware, redirectWWW } from "./middlewares";

dotenv.config();

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(redirectWWW);
app.use(helmet());
app.use(hpp());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.about, aboutRouter);
app.use(routes.notice, noticeRouter);
app.use(routes.admin, adminRouter);
app.use(routes.user, userRouter);
app.use(routes.store, storeRouter);

export default app;
