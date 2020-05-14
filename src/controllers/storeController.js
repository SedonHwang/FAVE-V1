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

export const getFave350 = (req, res) => res.render("fave350");
export const getFave350Kr = (req, res) => res.render("fave350_kr");
export const getFave350Jp = (req, res) => res.render("fave350_jp");

export const getFave450 = (req, res) => res.render("fave450");
export const getFave450Kr = (req, res) => res.render("fave450_kr");
export const getFave450jp = (req, res) => res.render("fave450_jp");

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
    pinkCnt = pinkCnt === undefined ? "0" : pinkCnt;
    greenCnt = greenCnt === undefined ? "0" : greenCnt;
  }
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
      shipStatus_kr: "결제 완료",
      shipStatus_jp: "決済済み",
    });
    await productList.save();
    return res.json({ productList });
  } catch (e) {
    console.log(e);
    return res.json({ status: "fail" });
  }
};

export const getPayment = (req, res) => {
  const { product, PinkCnt, GreenCnt, totalPrice } = req.query;
  const redirectName = product.replace(" ", "").toLowerCase();
  if (!PinkCnt && !GreenCnt) return res.redirect(`/store/${redirectName}/kr`);
  // 쿼리를 받아옴
  res.render("payment", {
    product,
    PinkCnt,
    GreenCnt,
    totalPrice,
    numberWithCommas,
    numberUnCommas,
    shipPay,
  });
};

export const getPaymentKr = (req, res) => {
  const { product, PinkCnt, GreenCnt, totalPrice } = req.query;
  const redirectName = product.replace(" ", "").toLowerCase();
  if (!PinkCnt && !GreenCnt) return res.redirect(`/store/${redirectName}/kr`);
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

export const getPaymentJp = (req, res) => {
  const { product, PinkCnt, GreenCnt, totalPrice } = req.query;
  const redirectName = product.replace(" ", "").toLowerCase();
  if (!PinkCnt && !GreenCnt) return res.redirect(`/store/${redirectName}/jp`);
  // 쿼리를 받아옴
  res.render("payment_jp", {
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
        imp_uid,
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
        shipStatus: "cancel",
        shipStatus_kr: "결제 취소",
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
          req.session.purchaseLists = [purchaselist];
          res.redirect(`/store${routes.orders_kr}`);
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
        shipStatus: "cancel",
        shipStatus_kr: "결제 취소",
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
    res.status(400).redirect("/kr");
  }
};

export const paymentCompletePaypal = async (req, res) => {
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
      switch (status) {
        case "paid":
          req.session.purchaseLists = [purchaselist];
          res.redirect(`/store${routes.orders}`);
      }
    } else {
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
        shipStatus: "cancel",
        shipStatus_kr: "결제 취소",
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
    res.status(400).redirect("/");
  }
};

export const paymentCompletePaypalJp = async (req, res) => {
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
          req.session.purchaseLists = [purchaselist];
          res.redirect(`/store${routes.orders_jp}`);
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
      const updateData = {
        shipStatus: "cancel",
        shipStatus_kr: "결제 취소",
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
    res.status(400).redirect("/jp");
  }
};

export const orders = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  let lastPage = 1;
  if (currentPage < 1) {
    return res.redirect(`/store${routes.orders}`);
  }
  let passedPurchaseLists;
  if (req.user) {
    const viewLists = 2;
    const user = await User.findById(req.user._id).populate("purchaselists");
    passedPurchaseLists = user.purchaselists
      .reverse()
      .slice(
        viewLists * (currentPage - 1),
        viewLists * (currentPage - 1) + viewLists
      );
    lastPage = Math.ceil(user.purchaselists.length / viewLists);
  } else {
    passedPurchaseLists = req.session.purchaseLists;
  }
  req.session.purchaseLists = [];
  const isData =
    passedPurchaseLists !== undefined && passedPurchaseLists.length !== 0;
  // undefined이거나 [] 일 때 false가 나와야함
  return res.render("orders", {
    passedPurchaseLists,
    hideInfo,
    isData,
    lastPage,
    currentPage,
  });
};
export const ordersKr = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  let lastPage = 1;
  if (currentPage < 1) {
    return res.redirect(`/store${routes.orders_kr}`);
  }
  let passedPurchaseLists;
  // 유저에 저장된 구매 목록을 불러와서 리버스해서 위의 변수에 넣는다.
  if (req.user) {
    const viewLists = 2;
    const user = await User.findById(req.user._id).populate("purchaselists");
    passedPurchaseLists = user.purchaselists
      .reverse()
      .slice(
        viewLists * (currentPage - 1),
        viewLists * (currentPage - 1) + viewLists
      );
    lastPage = Math.ceil(user.purchaselists.length / viewLists);
  } else {
    passedPurchaseLists = req.session.purchaseLists;
  }
  req.session.purchaseLists = [];
  const isData =
    passedPurchaseLists !== undefined && passedPurchaseLists.length !== 0;
  return res.render("orders_kr", {
    passedPurchaseLists,
    hideInfo,
    isData,
    lastPage,
    currentPage,
  });
};
export const ordersJp = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  let lastPage = 1;
  if (currentPage < 1) {
    return res.redirect(`/store${routes.orders_jp}`);
  }
  let passedPurchaseLists;
  // 유저에 저장된 구매 목록을 불러와서 리버스해서 위의 변수에 넣는다.
  if (req.user) {
    const viewLists = 2;
    const user = await User.findById(req.user._id).populate("purchaselists");
    passedPurchaseLists = user.purchaselists
      .reverse()
      .slice(
        viewLists * (currentPage - 1),
        viewLists * (currentPage - 1) + viewLists
      );
    lastPage = Math.ceil(user.purchaselists.length / viewLists);
  } else {
    passedPurchaseLists = req.session.purchaseLists;
  }
  req.session.purchaseLists = [];
  const isData =
    passedPurchaseLists !== undefined && passedPurchaseLists.length !== 0;
  return res.render("orders_jp", {
    passedPurchaseLists,
    hideInfo,
    isData,
    lastPage,
    currentPage,
  });
};

export const ordersCheck = (req, res) => res.render("orders_check");
export const ordersCheckKr = (req, res) => res.render("orders_check_kr");
export const ordersCheckJp = (req, res) => res.render("orders_check_jp");

export const postOrdersCheck = async (req, res) => {
  const { orderInfo, email } = req.body;
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
  try {
    const purchaseLists = await Purchaselist.find({
      purchaseInfo: orderInfo,
      ordererEmail: email,
    });
    req.session.purchaseLists = purchaseLists;
    res.redirect(`/store${routes.orders_kr}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_check_kr}`);
  }
};

export const postOrdersCheckJp = async (req, res) => {
  const { orderInfo, email } = req.body;
  try {
    const purchaseLists = await Purchaselist.find({
      purchaseInfo: orderInfo,
      ordererEmail: email,
    });
    req.session.purchaseLists = purchaseLists;
    res.redirect(`/store${routes.orders_jp}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_check_jp}`);
  }
};

export const refund = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  const { purchaseInfo, ordererEmail } = req.body;
  const item = await Purchaselist.findOne({ purchaseInfo, ordererEmail });
  try {
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
    const getCancelData = await axios({
      url: "https://api.iamport.kr/payments/cancel",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      data: {
        reason: "사용자 결제 취소",
        imp_uid: item.imp_uid,
      },
    });
    const { response } = getCancelData.data;
    const updateData = {
      shipStatus: "cancel",
      shipStatus_kr: "결제 취소",
      shipStatus_jp: "決済取消し",
    };
    await Purchaselist.findOneAndUpdate(
      { purchaseInfo, ordererEmail },
      updateData
    );
    res.redirect(`/store${routes.orders}?page=${currentPage}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders}?page=${currentPage}`);
  }
};

export const refundKr = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  const { purchaseInfo, ordererEmail } = req.body;
  const item = await Purchaselist.findOne({ purchaseInfo, ordererEmail });
  try {
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
    const getCancelData = await axios({
      url: "https://api.iamport.kr/payments/cancel",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      data: {
        reason: "사용자 결제 취소",
        imp_uid: item.imp_uid,
      },
    });
    const { response } = getCancelData.data;
    const updateData = {
      shipStatus: "cancel",
      shipStatus_kr: "결제 취소",
      shipStatus_jp: "決済取消し",
    };
    await Purchaselist.findOneAndUpdate(
      { purchaseInfo, ordererEmail },
      updateData
    );
    res.redirect(`/store${routes.orders_kr}?page=${currentPage}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_kr}?page=${currentPage}`);
  }
};

export const refundJp = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  const { purchaseInfo, ordererEmail } = req.body;
  const item = await Purchaselist.findOne({ purchaseInfo, ordererEmail });
  try {
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
    const getCancelData = await axios({
      url: "https://api.iamport.kr/payments/cancel",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      data: {
        reason: "사용자 결제 취소",
        imp_uid: item.imp_uid,
      },
    });
    const { response } = getCancelData.data;
    const updateData = {
      shipStatus: "cancel",
      shipStatus_kr: "결제 취소",
      shipStatus_jp: "決済取消し",
    };
    await Purchaselist.findOneAndUpdate(
      { purchaseInfo, ordererEmail },
      updateData
    );
    res.redirect(`/store${routes.orders_jp}?page=${currentPage}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/store${routes.orders_jp}?page=${currentPage}`);
  }
};
