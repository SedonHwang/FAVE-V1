import passport from "passport";
import nodemailer from "nodemailer";
import routes from "../routes";
import { throwSignupMsg } from "../lib";
import User from "../models/users";
import Notice from "../models/notices";

//Global Router Controller
export const home = (req, res) => {
  console.log(req.user);
  res.render("home");
};
export const homeKr = (req, res) => res.render("home_kr");
export const homeJp = (req, res) => res.render("home_jp");
export const company = (req, res) => res.render("company");
export const companyKr = (req, res) => res.render("company_kr");
export const companyJp = (req, res) => res.render("company_jp");
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
    throwSignupMsg(req, res, "*은 필수입력값입니다.", routes.signup);
  } else if (password.length < 8) {
    throwSignupMsg(
      req,
      res,
      "비밀번호를 8자 이상 입력해주세요.",
      routes.signup
    );
  } else if (password !== password2) {
    throwSignupMsg(req, res, "비밀번호가 다릅니다.", routes.signup);
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
        throwSignupMsg(req, res, "이미 존재하는 유저입니다.", routes.signup);
        return;
      }
      throwSignupMsg(req, res, "Something Wrong :(", routes.signup);
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
export const fitness = (req, res) => res.send("fitness");
export const game = (req, res) => res.send("game");
export const character = (req, res) => res.send("character");
export const connection = (req, res) => res.render("connection");

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
export const noticeDetail = (req, res) => res.send("notice detail");

export const contactUs = async (req, res) => {
  const {
    body: { username, email, description }
  } = req;
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "fave188170@gmail.com",
      pass: "188170faves"
    }
  });
  const mailOptions = {
    from: "fave188170@gmail.com",
    to: "ifave3@naver.com, ifave5@naver.com",
    subject: `${username}님이 글을 남겼습니다.`,
    text: `${description} ------ ${email}로 답변을 보내주세요.`
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
