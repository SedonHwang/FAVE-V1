import routes from "../routes";
import numberWithCommas from "../lib/numberWithComma";
import numberUnCommas from "../lib/numberUnCommas";
import shipPay from "../lib/shipPay";
import paymentInfo from "../lib/paymentInfo";
import hideInfo from "../lib/hideInfo";
import Purchaselist from "../models/purchaseLists";
import User from "../models/users";
import axios from "axios";
import productPriceSum from "../lib/productPriceSum";

export const getStore = (req, res) => res.render("store");
export const getStoreKr = (req, res) => res.render("store_kr");
export const getStoreJp = (req, res) => res.render("store_jp");

export const getFave350 = (req, res) => res.send("Fave 350");
export const getFave350Kr = (req, res) => res.render("fave350_kr");
export const getFave350Jp = (req, res) => res.send("Fave 350 Jp");

export const getFave450 = (req, res) => res.send("Fave 450");
export const getFave450Kr = (req, res) => res.render("fave450_kr");
export const getFave450jp = (req, res) => res.send("Fave 450 Jp");

export const postPayment = async (req, res) => {
  const {
    name,
    buyer_name,
    recipient_name,
    buyer_tel,
    recipient_tel,
    buyer_email,
    recipientCountry,
    recipient_addr,
    recipient_postcode,
    shipMessage,
  } = req.body;
  let { pinkCnt, greenCnt } = req.body;
  if (!pinkCnt || !greenCnt) {
    console.log("선택 안한게 있다.");
    pinkCnt = pinkCnt === undefined ? "0" : pinkCnt;
    greenCnt = greenCnt === undefined ? "0" : greenCnt;
  }
  console.log("pinkCnt is", pinkCnt);
  console.log("greenCnt is", greenCnt);
  try {
    const merchant_uid = await paymentInfo();
    const productList = new Purchaselist({
      recipientName: recipient_name,
      ordererName: buyer_name,
      recipientPhoneNum: recipient_tel,
      ordererPhoneNum: buyer_tel,
      ordererEmail: buyer_email,
      country: recipientCountry,
      address: recipient_addr,
      postalCode: recipient_postcode,
      productName: name,
      pinkCnt,
      greenCnt,
      purchaseInfo: merchant_uid,
      shipMessage,
      shipStatus: "Payment completed",
      shipStatus_kr: "결제완료",
      shipStatus_jp: "決済済み",
    });
    await productList.save();
    return res.json({ productList });
  } catch (e) {
    console.log(e);
    return res.json({ status: "fail" });
  }
};

export const getPaymentKr = (req, res) => {
  console.log(req.user);
  const { product, PinkCnt, GreenCnt, totalPrice } = req.query;
  const redirectName = product.replace(" ", "").toLowerCase();
  if (!PinkCnt && !GreenCnt) return res.redirect(`/store/${redirectName}/kr`);
  console.log("product is", product);
  console.log("PinkCnt is", PinkCnt);
  console.log("GreenCnt is", GreenCnt);
  console.log("totalPrice is", totalPrice);
  // 쿼리를 받아옴
  res.render("payment_kr", {
    product,
    PinkCnt,
    GreenCnt,
    totalPrice,
    numberWithCommas,
    numberUnCommas,
    shipPay,
  });
};

export const paymentComplete = async (req, res) => {
  try {
    const { imp_uid, merchant_uid } = req.body;
    console.log("imp_uid is", imp_uid);
    console.log("merchant_uid is", merchant_uid);
    //액세스 토큰(access token)발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.REST_API,
        imp_secret: process.env.REST_SECRET,
      },
    });
    const { access_token } = getToken.data.response;
    // 가지고 온 access 토큰과 imp_uid를 통해서 아임포트 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: { Authorization: access_token },
    });
    const paymentData = getPaymentData.data.response;
    const purchaseList = await Purchaselist.findOne({
      purchaseInfo: paymentData.merchant_uid,
    });
    console.log("purchaseList is", purchaseList);

    // DB에서 결제되어야 하는 금액을 찾는다
    console.log("purchaseList.country is ", purchaseList.country);
    console.log("purchaseList.pinkCnt is", purchaseList.pinkCnt);
    console.log("purchaseList.greenCnt is", purchaseList.greenCnt);
    console.log("purchaseList.productName is", purchaseList.productName);

    const { country, productName, pinkCnt, greenCnt } = purchaseList;
    const getShipPay = shipPay(country, pinkCnt, greenCnt);
    const getProductPay = productPriceSum(
      country,
      productName,
      Number(pinkCnt) + Number(greenCnt)
    );
    const amountToBePaid = getShipPay + getProductPay;
    const { amount, status } = paymentData;
    if (amount === amountToBePaid) {
      const updatePrices = {
        shipPrice: getShipPay,
        productPrice: getProductPay,
        totalPrice: amountToBePaid,
      };
      console.log(updatePrices);
      const purchaselist = await Purchaselist.findOneAndUpdate(
        { purchaseInfo: paymentData.merchant_uid },
        updatePrices,
        { new: true }
      );
      if (req.user) {
        const user = await User.findById(req.user._id);
        user.purchaselists.push(purchaselist.id);
        user.save();
      }
      // 들어가야 하는 데이터는 shipPrice, productPrice, totalPrice
      // 값이 똑같다는 거니까
      // 주문내역에 값을 다 추가해줘야함
      switch (status) {
        case "paid":
          res.send({ status: "success", message: "일반결제 성공" });
      }
    } else {
      // 값이 위조된경우에는 자동으로 환불되게 신청한다.
      // /payment/cancel
      const getCancelData = await axios({
        url: "https://api.iamport.kr/payments/cancel",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        data: {
          reason: "잘못된 결제시도",
          imp_uid,
        },
      });
      const { response } = getCancelData.data;
      console.log(response);
      const updateData = {
        shipStatus: "cancellation of payment",
        shipStatus_kr: "결제취소",
        shipStatus_jp: "決済取消し",
      };
      await Purchaselist.findOneAndUpdate(
        { purchaseInfo: paymentData.merchant_uid },
        updateData
      );
      // 결제시도에 대해서
      throw { status: "forgery", message: "위조된 결제시도" };
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
    // throw를 통해서 저 메시지를 콘솔에 띄우고, 프론트엔드에서는 받아오는 데이터가 안생기네?
    // 만약 성공한다면?
  }
};

export const paymentCompleteMobile = async (req, res) => {
  try {
    const { imp_uid, merchant_uid } = req.query;
    //액세스 토큰(access token)발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: process.env.REST_API,
        imp_secret: process.env.REST_SECRET,
      },
    });
    const { access_token } = getToken.data.response;
    // 가지고 온 access 토큰과 imp_uid를 통해서 아임포트 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: { Authorization: access_token },
    });
    const paymentData = getPaymentData.data.response;
    const purchaseList = await Purchaselist.findOne({
      purchaseInfo: paymentData.merchant_uid,
    });
    console.log("purchaseList is", purchaseList);

    // DB에서 결제되어야 하는 금액을 찾는다

    const { country, productName, pinkCnt, greenCnt } = purchaseList;
    const getShipPay = shipPay(country, pinkCnt, greenCnt);
    const getProductPay = productPriceSum(
      country,
      productName,
      Number(pinkCnt) + Number(greenCnt)
    );
    const amountToBePaid = getShipPay + getProductPay;
    const { amount, status } = paymentData;
    if (amount === amountToBePaid) {
      const updatePrices = {
        shipPrice: getShipPay,
        productPrice: getProductPay,
        totalPrice: amountToBePaid,
      };
      const purchaselist = await Purchaselist.findOneAndUpdate(
        { purchaseInfo: paymentData.merchant_uid },
        updatePrices,
        { new: true }
      );
      if (req.user) {
        const user = await User.findById(req.user._id);
        user.purchaselists.push(purchaselist.id);
        user.save();
      }
      // 들어가야 하는 데이터는 shipPrice, productPrice, totalPrice
      // 값이 똑같다는 거니까
      // 주문내역에 값을 다 추가해줘야함
      switch (status) {
        case "paid":
          res.send({ status: "success", message: "일반결제 성공" });
      }
    } else {
      // 값이 위조된경우에는 자동으로 환불되게 신청한다.
      // /payment/cancel
      const getCancelData = await axios({
        url: "https://api.iamport.kr/payments/cancel",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        data: {
          reason: "잘못된 결제시도",
          imp_uid,
        },
      });
      const { response } = getCancelData.data;
      console.log(response);
      const updateData = {
        shipStatus: "cancellation of payment",
        shipStatus_kr: "결제취소",
        shipStatus_jp: "決済取消し",
      };
      await Purchaselist.findOneAndUpdate(
        { purchaseInfo: paymentData.merchant_uid },
        updateData
      );
      // 결제시도에 대해서
      throw { status: "forgery", message: "위조된 결제시도" };
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
    // throw를 통해서 저 메시지를 콘솔에 띄우고, 프론트엔드에서는 받아오는 데이터가 안생기네?
    // 만약 성공한다면?
  }
};

export const orders = (req, res) => {
  const passedPurchaseLists = req.session.purchaseLists;
  console.log("passedPurchaseLists is", passedPurchaseLists);
  console.log(passedPurchaseLists);
  req.session.purchaseLists = [];
  const isData =
    passedPurchaseLists !== undefined && passedPurchaseLists.length !== 0;
  // undefined이거나 [] 일 때 false가 나와야함
  return res.render("orders", { passedPurchaseLists, hideInfo, isData });
};
export const ordersKr = async (req, res) => {
  console.log("req.user is", req.user);
  let passedPurchaseLists;
  // 유저에 저장된 구매 목록을 불러와서 리버스해서 위의 변수에 넣는다.
  if (req.user) {
    const user = await User.findById(req.user._id).populate("purchaselists");
    passedPurchaseLists = user.purchaselists.reverse();
  } else {
    passedPurchaseLists = req.session.purchaseLists;
  }
  console.log("ordersKr in", passedPurchaseLists);
  req.session.purchaseLists = [];
  const isData =
    passedPurchaseLists !== undefined && passedPurchaseLists.length !== 0;
  return res.render("orders_kr", { passedPurchaseLists, hideInfo, isData });
};
export const ordersJp = (req, res) => {
  const passedPurchaseLists = req.session.purchaseLists;
  req.session.purchaseLists = [];
  const isData =
    passedPurchaseLists !== undefined && passedPurchaseLists.length !== 0;
  return res.render("orders_jp", { passedPurchaseLists, hideInfo, isData });
};

export const ordersCheck = (req, res) => res.render("orders_check");
export const ordersCheckKr = (req, res) => res.render("orders_check_kr");
export const ordersCheckJp = (req, res) => res.render("orders_check_jp");

export const postOrdersCheck = async (req, res) => {
  const { orderInfo, email } = req.body;
  console.log("orderInfo is", orderInfo);
  console.log("email is", email);
  try {
    const purchaseLists = await Purchaselist.find({
      purchaseInfo: orderInfo,
      ordererEmail: email,
    });
    req.session.purchaseLists = purchaseLists;
    res.redirect(`/store${routes.orders}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_check}`);
  }
};

export const postOrdersCheckKr = async (req, res) => {
  const { orderInfo, email } = req.body;
  console.log("orderInfo is", orderInfo);
  console.log("email is", email);
  try {
    const purchaseLists = await Purchaselist.find({
      purchaseInfo: orderInfo,
      ordererEmail: email,
    });
    console.log("postOrdersCheckKr", purchaseLists);
    req.session.purchaseLists = purchaseLists;
    res.redirect(`/store${routes.orders_kr}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_check_kr}`);
  }
};

export const postOrdersCheckJp = async (req, res) => {
  const { orderInfo, email } = req.body;
  console.log("orderInfo is", orderInfo);
  console.log("email is", email);
  try {
    const purchaseLists = await Purchaselist.find({
      purchaseInfo: orderInfo,
      ordererEmail: email,
    });
    console.log(purchaseLists);
    req.session.purchaseLists = purchaseLists;
    res.redirect(`/store${routes.orders_jp}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_check_jp}`);
  }
};
