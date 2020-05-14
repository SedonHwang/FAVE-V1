import passport from "passport";
import routes from "../routes";
import Notice from "../models/notices";
import Purchaselist from "../models/purchaseLists";
import axios from "axios";

//Global Router Controller

export const adminLogin = (req, res) => res.render("admin_login");
export const postAdminLogin = passport.authenticate("local", {
  failureRedirect: routes.admin_login,
  successRedirect: "/admin/notice/1",
});

export const adminLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(`/admin${routes.admin_login}`);
};

export const adminNotice = async (req, res) => {
  const renderedNotice = 3;
  const {
    params: { page },
  } = req;
  try {
    const numberOfNotice = await Notice.countDocuments();
    const maxPage = Math.ceil(numberOfNotice / renderedNotice);
    const notices = await Notice.find({})
      .sort("-createdAt")
      .skip((page - 1) * renderedNotice)
      .limit(renderedNotice);
    res.render("admin_notice", {
      notices,
      maxPage,
      page,
      numberOfNotice,
      renderedNotice,
    });
  } catch (e) {
    console.log(e);
    res.render("admin_notice", {
      notices: [],
      maxPage: 1,
      page,
      numberOfNotice,
    });
  }
};

export const uploadNotice = (req, res) => res.render("notice_upload");

export const postUploadNotice = async (req, res) => {
  let path = "";
  const {
    body: {
      title_kr,
      title_en,
      title_jp,
      description_kr,
      description_en,
      description_jp,
    },
  } = req;
  if (req.file) {
    path = req.file.path;
  }
  try {
    const newNotice = await Notice.create({
      title_kr,
      title_en,
      title_jp,
      description_kr,
      description_en,
      description_jp,
      notice_img: path,
    });
    res.redirect("/admin/notice/1");
  } catch (e) {
    console.log(e);
    res.redirect(`/admin${routes.upload_notice}`);
  }
};

export const editNotice = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const notice = await Notice.findById(id);
    res.render("notice_edit", { notice });
  } catch (e) {
    console.log(e);
    res.redirect("/admin/notice/1");
  }
};

export const postEditNotice = async (req, res) => {
  const {
    params: { id },
    body: {
      title_kr,
      title_en,
      title_jp,
      description_kr,
      description_en,
      description_jp,
    },
  } = req;
  try {
    await Notice.findOneAndUpdate(
      { _id: id },
      {
        title_kr,
        title_en,
        title_jp,
        description_kr,
        description_en,
        description_jp,
      }
    );
    res.redirect("/admin/notice/1");
  } catch (e) {
    console.log(e);
    res.redirect(`/admin${routes.editNotice(id)}`);
  }
};

export const deleteNotice = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Notice.findOneAndDelete({ _id: id });
  } catch (e) {
    console.log(e);
  }
  res.redirect("/admin/notice/1");
};

export const adminGame = (req, res) => res.send("admin_game");

export const payments = async (req, res) => {
  const currentPage = parseInt(req.query.page || "1", 10);
  if (currentPage < 1) {
    return res.redirect(`/admin${routes.payments}`);
  }
  let isData;
  try {
    const lists = await Purchaselist.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((currentPage - 1) * 10);
    if (lists.length === 0) {
      isData = false;
    } else {
      isData = true;
    }
    const paymentCnt = await Purchaselist.countDocuments();
    const lastPage = Math.ceil(paymentCnt / 10);
    res.render("admin_payments", {
      passedPurchaseLists: lists,
      isData,
      lastPage,
      currentPage,
    });
  } catch (e) {
    console.log(e);
    res.redirect(`/admin${routes.payments}`);
  }
};

export const postPayments = async (req, res) => {
  const { purchaseInfo, ordererName, shipStatus } = req.body;
  const currentPage = parseInt(req.query.page || "1", 10);
  let update;
  if (shipStatus === "결제 완료") {
    update = {
      shipStatus: "Payment completed",
      shipStatus_kr: "결제 완료",
      shipStatus_jp: "決済済み",
    };
  } else if (shipStatus === "결제 취소") {
    update = {
      shipStatus: "cancel",
      shipStatus_kr: "결제 취소",
      shipStatus_jp: "決済取消し",
    };
  } else if (shipStatus === "배송준비 중") {
    update = {
      shipStatus: "preparing for delivery",
      shipStatus_kr: "배송준비 중",
      shipStatus_jp: "配送準備中",
    };
  } else if (shipStatus === "배송중") {
    update = {
      shipStatus: "shipping",
      shipStatus_kr: "배송중",
      shipStatus_jp: "配送中",
    };
  } else {
    update = {
      shipStatus: "Delivery completed",
      shipStatus_kr: "배송 완료",
      shipStatus_jp: "Shipment complete",
    };
  }
  try {
    if (shipStatus === "결제 취소") {
      const list = await Purchaselist.findOne({ purchaseInfo, ordererName });
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
          reason: "관리자 결제 취소",
          imp_uid: list.imp_uid,
        },
      });
      const { response } = getCancelData.data;
    }
    const list = await Purchaselist.findOneAndUpdate(
      { purchaseInfo, ordererName },
      update,
      {
        new: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
  res.redirect(`/admin${routes.payments}?page=${currentPage}`);
};
