import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

const handleHome = (req, res) => {
  res.send("Hello from home!!!!");
};

const handleProfile = (req, res) => {
  res.send("This is Profile!!!");
};

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", handleHome);

app.get("/profile", handleProfile);
