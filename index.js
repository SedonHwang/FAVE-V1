import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import aboutRouter from "./routers/aboutRouter";
import noticeRouter from "./routers/noticeRouter";

const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes.home, globalRouter);
app.use(routes.about, aboutRouter);
app.use(routes.notice, noticeRouter);
