import passport from "passport";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import routes from "../routes";
import { throwFlashMsg } from "../lib";
import User from "../models/users";
import Notice from "../models/notices";

dotenv.config();

const GOOGLE_MAP = process.env.GOOGLE_MAP;

//Global Router Controller
export const home = (req, res) => {
  res.render("home");
};
export const homeKr = (req, res) => res.render("home_kr");
export const homeJp = (req, res) => res.render("home_jp");
export const company = (req, res) => res.render("company", { GOOGLE_MAP });
export const companyKr = (req, res) => res.render("company_kr", { GOOGLE_MAP });
export const companyJp = (req, res) => res.render("company_jp", { GOOGLE_MAP });
export const getSignup = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("signup");
  } else {
    res.render("signup", { errorMessage });
  }
  //console.log(req.flash("errorMessage"));
  //res.render("signup", { errorMessage: req.flash("errorMessage") });
};
export const postSignup = async (req, res, next) => {
  let {
    body: {
      email,
      password,
      password2,
      name,
      birthDate,
      sex,
      country,
      address1,
      address2,
      postalCode,
      height,
      weight,
      job
    }
  } = req;
  if (sex === undefined) {
    sex = "N";
  }
  if (!email || !password || !password2 || !name) {
    throwFlashMsg(req, res, "*은 필수입력값입니다.", routes.signup);
  } else if (password.length < 8) {
    throwFlashMsg(req, res, "비밀번호를 8자 이상 입력해주세요.", routes.signup);
  } else if (password !== password2) {
    throwFlashMsg(req, res, "비밀번호가 다릅니다.", routes.signup);
  } else {
    try {
      const user = await User({
        name,
        email,
        birthDate,
        sex,
        country,
        address1,
        address2,
        postalCode,
        height,
        weight,
        job
      });
      await User.register(user, password);
      next();
    } catch (error) {
      if (error.name === "UserExistsError") {
        throwFlashMsg(req, res, "이미 존재하는 유저입니다.", routes.signup);
        return;
      }
      throwFlashMsg(req, res, "Something Wrong :(", routes.signup);
    }
  }
};
export const getLogin = (req, res) => res.render("login");

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

//About Router Controller
export const fitness = (req, res) => res.render("fitness");
export const fitnessKr = (req, res) => res.render("fitness_kr");
export const fitnessJp = (req, res) => res.render("fitness_jp");

export const game = (req, res) => res.render("game");
export const gameKr = (req, res) => res.render("game_kr");
export const gameJp = (req, res) => res.render("game_jp");

export const character = (req, res) => res.render("character");
export const characterKr = (req, res) => res.render("character_kr");
export const characterJp = (req, res) => res.render("character_jp");

export const connection = (req, res) => res.render("connection");
export const connectionKr = (req, res) => res.render("connection_kr");
export const connectionJp = (req, res) => res.render("connection_jp");

//Notice Router Controller
export const noticeHome = async (req, res) => {
  const renderedNotice = 4;
  const {
    params: { page }
  } = req;
  try {
    const numberOfNotice = await Notice.countDocuments();
    const maxPage = Math.ceil(numberOfNotice / renderedNotice);
    const notices = await Notice.find({})
      .sort("-createdAt")
      .skip((page - 1) * renderedNotice)
      .limit(renderedNotice);
    res.render("notice_home", {
      notices,
      maxPage,
      page,
      numberOfNotice,
      renderedNotice
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const noticeHomeKr = async (req, res) => {
  const renderedNotice = 4;
  const {
    params: { page }
  } = req;
  try {
    const numberOfNotice = await Notice.countDocuments();
    const maxPage = Math.ceil(numberOfNotice / renderedNotice);
    const notices = await Notice.find({})
      .sort("-createdAt")
      .skip((page - 1) * renderedNotice)
      .limit(renderedNotice);
    res.render("notice_home_kr", {
      notices,
      maxPage,
      page,
      numberOfNotice,
      renderedNotice
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.homeKr);
  }
};

export const noticeHomeJp = async (req, res) => {
  const renderedNotice = 4;
  const {
    params: { page }
  } = req;
  try {
    const numberOfNotice = await Notice.countDocuments();
    const maxPage = Math.ceil(numberOfNotice / renderedNotice);
    const notices = await Notice.find({})
      .sort("-createdAt")
      .skip((page - 1) * renderedNotice)
      .limit(renderedNotice);
    res.render("notice_home_jp", {
      notices,
      maxPage,
      page,
      numberOfNotice,
      renderedNotice
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.homeJp);
  }
};

export const noticeDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const notice = await Notice.findById(id);
    const prevNotice = await Notice.findOne({ _id: { $lt: id } }).sort({
      _id: -1
    });
    const nextNotice = await Notice.findOne({ _id: { $gt: id } }).sort({
      _id: 1
    });
    res.render("notice_detail", { notice, prevNotice, nextNotice });
  } catch (e) {
    console.log(e);
    res.redirect(routes.notice_home);
  }
};

export const noticeDetailKr = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const notice = await Notice.findById(id);
    const prevNotice = await Notice.findOne({ _id: { $lt: id } }).sort({
      _id: -1
    });
    const nextNotice = await Notice.findOne({ _id: { $gt: id } }).sort({
      _id: 1
    });
    res.render("notice_detail_kr", { notice, prevNotice, nextNotice });
  } catch (e) {
    console.log(e);
    res.redirect(routes.notice_home_kr);
  }
};

export const noticeDetailJp = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const notice = await Notice.findById(id);
    const prevNotice = await Notice.findOne({ _id: { $lt: id } }).sort({
      _id: -1
    });
    const nextNotice = await Notice.findOne({ _id: { $gt: id } }).sort({
      _id: 1
    });
    res.render("notice_detail_jp", { notice, prevNotice, nextNotice });
  } catch (e) {
    console.log(e);
    res.redirect(routes.notice_home_jp);
  }
};

export const contactUs = async (req, res) => {
  const {
    body: { username, email, description }
  } = req;
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "fave188170@gmail.com",
      pass: process.env.GOOGLE_PW
    }
  });
  const mailOptions = {
    from: "fave188170@gmail.com",
    to: "ifave5@naver.com",
    //to: "ifave@naver.com, ifave2@naver.com, ifave3@naver.com, ifave5@naver.com, ifave6@naver.com, ifave7@naver.com, ifave8@naver.com,",
    subject: `${username}님이 글을 남겼습니다.`,
    text: `"${description}" 라는 글이 홈페이지에 등록되었습니다. "${email}"로 답변을 보내주세요.`
  };
  await smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.redirect("/notice/1");
    } else {
      res.redirect(routes.home);
    }
    smtpTransport.close();
  });
};
