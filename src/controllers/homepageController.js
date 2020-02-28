import passport from "passport";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import routes from "../routes";
import { throwFlashMsg, makePassword } from "../lib";
import User from "../models/users";
import Notice from "../models/notices";

dotenv.config();

const GOOGLE_MAP = process.env.GOOGLE_MAP;

//Global Router Controller
export const home = (req, res) => res.render("home");
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
};

export const getSignupKr = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("signup_kr");
  } else {
    res.render("signup_kr", { errorMessage });
  }
};

export const getSignupJp = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("signup_jp");
  } else {
    res.render("signup_jp", { errorMessage });
  }
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
    throwFlashMsg(req, res, "* is required.", routes.signup);
  } else if (password.length < 8) {
    throwFlashMsg(
      req,
      res,
      "Password must be at least 8 characters.",
      routes.signup
    );
  } else if (password !== password2) {
    throwFlashMsg(req, res, "Password is different.", routes.signup);
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
        throwFlashMsg(req, res, "User already exists.", routes.signup);
        return;
      }
      throwFlashMsg(req, res, "Something Wrong :(", routes.signup);
    }
  }
};

export const postSignupKr = async (req, res, next) => {
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
    throwFlashMsg(req, res, "*은 필수입력값입니다.", routes.signup_kr);
  } else if (password.length < 8) {
    throwFlashMsg(
      req,
      res,
      "비밀번호를 8자 이상 입력해주세요.",
      routes.signup_kr
    );
  } else if (password !== password2) {
    throwFlashMsg(req, res, "비밀번호가 다릅니다.", routes.signup_kr);
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
        throwFlashMsg(req, res, "이미 존재하는 유저입니다.", routes.signup_kr);
        return;
      }
      throwFlashMsg(req, res, "Something Wrong :(", routes.signup_kr);
    }
  }
};

export const postSignupJp = async (req, res, next) => {
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
    throwFlashMsg(req, res, "*は 必須入力値です.", routes.signup_jp);
  } else if (password.length < 8) {
    throwFlashMsg(
      req,
      res,
      "パスワードを 8文字 以上 入力してください.",
      routes.signup_jp
    );
  } else if (password !== password2) {
    throwFlashMsg(req, res, "暗証番号が 違います.", routes.signup_jp);
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
        throwFlashMsg(
          req,
          res,
          "すでに 存在する ユーザーです.",
          routes.signup_jp
        );
        return;
      }
      throwFlashMsg(req, res, "Something Wrong :(", routes.signup_jp);
    }
  }
};

export const getLogin = (req, res) => res.render("login");

export const getLoginKr = (req, res) => res.render("login_kr");

export const getLoginJp = (req, res) => res.render("login_jp");

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const postLoginKr = passport.authenticate("local", {
  failureRedirect: routes.login_kr,
  successRedirect: routes.homeKr
});

export const postLoginJp = passport.authenticate("local", {
  failureRedirect: routes.login_jp,
  successRedirect: routes.homeJp
});

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(routes.home);
};

export const logoutKr = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(routes.homeKr);
};

export const logoutJp = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(routes.homeJp);
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
  let errorMessage = req.flash("errorMessage");
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
    if (errorMessage.length === 0) {
      res.render("notice_home", {
        notices,
        maxPage,
        page,
        numberOfNotice,
        renderedNotice
      });
    } else {
      res.render("notice_home", {
        notices,
        maxPage,
        page,
        numberOfNotice,
        renderedNotice,
        errorMessage
      });
    }
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const noticeHomeKr = async (req, res) => {
  let errorMessage = req.flash("errorMessage");
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
    if (errorMessage.length === 0) {
      res.render("notice_home_kr", {
        notices,
        maxPage,
        page,
        numberOfNotice,
        renderedNotice
      });
    } else {
      res.render("notice_home_kr", {
        notices,
        maxPage,
        page,
        numberOfNotice,
        renderedNotice,
        errorMessage
      });
    }
  } catch (e) {
    console.log(e);
    res.redirect(routes.homeKr);
  }
};

export const noticeHomeJp = async (req, res) => {
  let errorMessage = req.flash("errorMessage");
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
    if (errorMessage.length === 0) {
      res.render("notice_home_jp", {
        notices,
        maxPage,
        page,
        numberOfNotice,
        renderedNotice
      });
    } else {
      res.render("notice_home_jp", {
        notices,
        maxPage,
        page,
        numberOfNotice,
        renderedNotice,
        errorMessage
      });
    }
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
  if (!username || !email || !description) {
    return throwFlashMsg(req, res, "Plz fill in the blanks :(", "/notice/1");
  }
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "fave188170@gmail.com",
      pass: process.env.GOOGLE_PW
    }
  });
  const mailOptions = {
    from: "fave188170@gmail.com",
    to:
      "ceo@faves.co.kr, minhan.park@faves.co.kr, ahyeon.lee@faves.co.kr, jeongyeon.lee@faves.co.kr, sumin.woo@faves.co.kr, kwanglae.jo@faves.co.kr",
    subject: `${username}님이 글을 남겼습니다.`,
    text: `"${description}" 라는 글이 홈페이지에 등록되었습니다. "${email}"로 답변을 보내주세요.`
  };
  await smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      throwFlashMsg(req, res, "Something Wrong :(", "/notice/1");
    } else {
      res.redirect(routes.home);
    }
    smtpTransport.close();
  });
};

export const contactUsKr = async (req, res) => {
  const {
    body: { username, email, description }
  } = req;
  if (!username || !email || !description) {
    return throwFlashMsg(
      req,
      res,
      "필수입력 값이 비었습니다 :(",
      "/notice/1/kr"
    );
  }
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "fave188170@gmail.com",
      pass: process.env.GOOGLE_PW
    }
  });
  const mailOptions = {
    from: "fave188170@gmail.com",
    to:
      "ceo@faves.co.kr, minhan.park@faves.co.kr, ahyeon.lee@faves.co.kr, jeongyeon.lee@faves.co.kr, sumin.woo@faves.co.kr, kwanglae.jo@faves.co.kr",
    subject: `${username}님이 글을 남겼습니다.`,
    text: `"${description}" 라는 글이 홈페이지에 등록되었습니다. "${email}"로 답변을 보내주세요.`
  };
  await smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      throwFlashMsg(req, res, "잠시후에 다시 시도해 주세요 :(", "/notice/1/kr");
    } else {
      res.redirect(routes.homeKr);
    }
    smtpTransport.close();
  });
};

export const contactUsJp = async (req, res) => {
  const {
    body: { username, email, description }
  } = req;
  if (!username || !email || !description) {
    return throwFlashMsg(
      req,
      res,
      "空欄を 満たしてください :(",
      "/notice/1/jp"
    );
  }
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "fave188170@gmail.com",
      pass: process.env.GOOGLE_PW
    }
  });
  const mailOptions = {
    from: "fave188170@gmail.com",
    to:
      "ceo@faves.co.kr, minhan.park@faves.co.kr, ahyeon.lee@faves.co.kr, jeongyeon.lee@faves.co.kr, sumin.woo@faves.co.kr, kwanglae.jo@faves.co.kr",
    subject: `${username}님이 글을 남겼습니다.`,
    text: `"${description}" 라는 글이 홈페이지에 등록되었습니다. "${email}"로 답변을 보내주세요.`
  };
  await smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.redirect("/notice/1/jp");
      throwFlashMsg(
        req,
        res,
        "しばらくして また試して ください :(",
        "/notice/1/jp"
      );
    } else {
      res.redirect(routes.homeJp);
    }
    smtpTransport.close();
  });
};

export const privacy = (req, res) => res.render("privacy");
export const privacyKr = (req, res) => res.render("privacy_kr");
export const privacyJp = (req, res) => res.render("privacy_jp");
export const termOfUse = (req, res) => res.render("termsOfUse");
export const termOfUseKr = (req, res) => res.render("termsOfUse_kr");
export const termOfUseJp = (req, res) => res.render("termsOfUse_jp");
export const forgotPassword = (req, res) => res.render("forgot_password");
export const forgotPasswordKr = (req, res) => res.render("forgot_password_kr");
export const forgotPasswordJp = (req, res) => res.render("forgot_password_jp");

export const postForgotPassword = async (req, res) => {
  const {
    body: { email }
  } = req;
  if (!email) {
    return throwFlashMsg(
      req,
      res,
      "Plz fill in the blanks :(",
      routes.forgotPassword
    );
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      const password = makePassword();
      await user.setPassword(password);
      await user.save();
      const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "fave188170@gmail.com",
          pass: process.env.GOOGLE_PW
        }
      });
      const mailOptions = {
        from: "fave188170@gmail.com",
        to: email,
        subject: "[FAVE] Issuing a temporary password",
        html: `
        <div class="mailwrapper" style="max-width:400px;width:100%;margin:0 auto;padding-top:30px;">
        <div class="title" style="width:100%;padding-bottom:3px;">
                 <img src="http://fave188170.cafe24.com//dataV1/img/ci_black.png" style="width:120px;height:auto;display:inline-block;">
                 <h3 style="padding-left:10px;display:inline-block;margin:0;">Issuing a temporary password</h3>
             </div>
             <div class="line" style="width:100%;height:5px;background:#FF6905;"></div>
             <div class="mailcontents" style="padding-top:15px;">
                 <h3>Issuing a temporary password</h3>
                 <p>A temporary password has been issued at your request.<br><br>
                 Please make sure to change your password after logging in with a temporary password.<br><br>
                 Temporary password: ${password}</p>
             </div>
        </div>
        `
      };
      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
          throwFlashMsg(req, res, "Something Wrong :(", routes.forgotPassword);
        } else {
          res.redirect(routes.home);
        }
        smtpTransport.close();
      });
    } else {
      res.redirect(routes.home);
    }
  } catch (err) {
    res.status(400);
    console.log(err);
    throwFlashMsg(
      req,
      res,
      "Something Wrong :(",
      `/user${routes.forgotPassword}`
    );
  }
};

export const postForgotPasswordKr = async (req, res) => {
  const {
    body: { email }
  } = req;
  if (!email) {
    return throwFlashMsg(
      req,
      res,
      "*는 필수입력 항목입니다 :(",
      routes.forgotPassword_kr
    );
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      const password = makePassword();
      await user.setPassword(password);
      await user.save();
      const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "fave188170@gmail.com",
          pass: process.env.GOOGLE_PW
        }
      });
      const mailOptions = {
        from: "fave188170@gmail.com",
        to: email,
        subject: "[FAVE] 임시 비밀번호 발급",
        html: `
        <div class="mailwrapper" style="max-width:400px;width:100%;margin:0 auto;padding-top:30px;">
        <div class="title" style="width:100%;padding-bottom:3px;">
                 <img src="http://fave188170.cafe24.com//dataV1/img/ci_black.png" style="width:120px;height:auto;display:inline-block;">
                 <h3 style="padding-left:10px;display:inline-block;margin:0;">Issuing a temporary password</h3>
             </div>
             <div class="line" style="width:100%;height:5px;background:#FF6905;"></div>
             <div class="mailcontents" style="padding-top:15px;">
                 <h3>임시 비밀번호 발급</h3>
                 <p>귀하의 요청으로 임시 비밀번호가 발급 되었습니다.<br><br>
                 임시 비밀번호로 로그인 후 반드시 비밀번호를 변경 해주세요.<br><br>
                 임시 비밀번호: ${password} </p>
             </div>
        </div>
        `
      };
      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
          throwFlashMsg(
            req,
            res,
            "Something Wrong :(",
            routes.forgotPassword_kr
          );
        } else {
          res.redirect(routes.homeKr);
        }
        smtpTransport.close();
      });
    } else {
      res.redirect(routes.homeKr);
    }
  } catch (err) {
    res.status(400);
    console.log(err);
    throwFlashMsg(
      req,
      res,
      "Something Wrong :(",
      `/user${routes.forgotPassword_kr}`
    );
  }
};

export const postForgotPasswordJp = async (req, res) => {
  const {
    body: { email }
  } = req;
  if (!email) {
    return throwFlashMsg(
      req,
      res,
      "*は 必須入力値です. :(",
      routes.forgotPassword_jp
    );
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      const password = makePassword();
      await user.setPassword(password);
      await user.save();
      const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "fave188170@gmail.com",
          pass: process.env.GOOGLE_PW
        }
      });
      const mailOptions = {
        from: "fave188170@gmail.com",
        to: email,
        subject: "[FAVE] 臨時の 暗証番号発給",
        html: `
        <div class="mailwrapper" style="max-width:400px;width:100%;margin:0 auto;padding-top:30px;">
        <div class="title" style="width:100%;padding-bottom:3px;">
                 <img src="http://fave188170.cafe24.com//dataV1/img/ci_black.png" style="width:120px;height:auto;display:inline-block;">
                 <h3 style="padding-left:10px;display:inline-block;margin:0;">Issuing a temporary password</h3>
             </div>
             <div class="line" style="width:100%;height:5px;background:#FF6905;"></div>
             <div class="mailcontents" style="padding-top:15px;">
                 <h3>臨時の 暗証番号発給</h3>
                 <p>貴下の要請で臨時の暗証番号が発給されました。<br><br>
                 臨時パスワードでログインした後、必ずパスワードを変更してください。<br><br>
                 臨時の暗証番号: ${password} </p>
             </div>
        </div>
        `
      };
      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
          throwFlashMsg(
            req,
            res,
            "Something Wrong :(",
            routes.forgotPassword_jp
          );
        } else {
          res.redirect(routes.homeJp);
        }
        smtpTransport.close();
      });
    } else {
      res.redirect(routes.homeJp);
    }
  } catch (err) {
    res.status(400);
    console.log(err);
    throwFlashMsg(
      req,
      res,
      "Something Wrong :(",
      `/user${routes.forgotPassword_jp}`
    );
  }
};
