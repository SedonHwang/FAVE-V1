import express from "express";
import routes from "../routes";
import {
  getStore,
  getStoreKr,
  getStoreJp,
  getFave350,
  getFave350Kr,
  getFave350Jp,
  getFave450,
  getFave450Kr,
  getFave450jp
} from "../controllers/storeController";

const storeRouter = express.Router();

storeRouter.get("/", getStore);
storeRouter.get("/kr", getStoreKr);
storeRouter.get("/jp", getStoreJp);

storeRouter.get(routes.fave350, getFave350);
storeRouter.get(routes.fave350_kr, getFave350Kr);
storeRouter.get(routes.fave350_jp, getFave350Jp);

storeRouter.get(routes.fave450, getFave450);
storeRouter.get(routes.fave450_kr, getFave450Kr);
storeRouter.get(routes.fave450_jp, getFave450jp);

export default storeRouter;
