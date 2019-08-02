import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => res.send("Home"));
globalRouter.get(routes.signup, (req, res) => res.send("signup"));
globalRouter.get(routes.login, (req, res) => res.send("login"));
globalRouter.get(routes.logout, (req, res) => res.send("logout"));
globalRouter.get(routes.company, (req, res) => res.send("company"));

export default globalRouter;
