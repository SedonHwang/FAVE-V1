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
  getFave450jp,
  postPayment,
  getPaymentKr,
  paymentComplete,
  orders,
  ordersKr,
  ordersJp,
  ordersCheck,
  ordersCheckKr,
  ordersCheckJp,
  postOrdersCheck,
  postOrdersCheckKr,
  postOrdersCheckJp,
  paymentInfo,
  paymentCompleteMobile,
  refundKr,
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

storeRouter.post(routes.payment, postPayment);

storeRouter.get(routes.payment_kr, getPaymentKr);

storeRouter.post(routes.payment_complete, paymentComplete);
storeRouter.get(routes.payment_complete_mobile, paymentCompleteMobile);

storeRouter.get(routes.orders, orders);
storeRouter.get(routes.orders_kr, ordersKr);
storeRouter.get(routes.orders_jp, ordersJp);

storeRouter.get(routes.orders_check, ordersCheck);
storeRouter.get(routes.orders_check_kr, ordersCheckKr);
storeRouter.get(routes.orders_check_jp, ordersCheckJp);

storeRouter.post(routes.orders_check, postOrdersCheck);
storeRouter.post(routes.orders_check_kr, postOrdersCheckKr);
storeRouter.post(routes.orders_check_jp, postOrdersCheckJp);

storeRouter.post(routes.refund_kr, refundKr);

export default storeRouter;
