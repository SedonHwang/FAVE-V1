import routes from "../routes";
import { throwSignupMsg } from "../lib";
import User from "../models/users";

//Global Router Controller
export const home = (req, res) => res.render("home");
export const homeKr = (req, res) => res.render("home_kr");
export const homeJp = (req, res) => res.render("home_jp");
export const company = (req, res) => res.send("company");
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
export const postSignup = async (req, res) => {
  const {
    body: {
      email,
      password1,
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
  console.log(
    email,
    password1,
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
  );
  if (!email || !password1 || !password2 || !name) {
    throwSignupMsg(req, res, "*은 필수입력값입니다.", routes.signup);
  } else if (password1.length < 8) {
    throwSignupMsg(
      req,
      res,
      "비밀번호를 8자 이상 입력해주세요.",
      routes.signup
    );
  } else if (password1 !== password2) {
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
      await User.register(user, password1);
    } catch (error) {
      if (error.name === "UserExistsError") {
        throwSignupMsg(req, res, "이미 존재하는 유저입니다.", routes.signup);
        return;
      }
      throwSignupMsg(req, res, "Something Wrong :(", routes.signup);
    }
  }
  //필수입력칸을 입력해주세요
  //이메일이 존재하는지 확인

  // if (password1 !== password2) {
  //   res.render("signup");
  // } else {
  //   try {
  //     const user = await User({
  //       name,
  //       email,
  //       birthDate,
  //       sex,
  //       country,
  //       address1,
  //       address2,
  //       postalCode,
  //       height,
  //       weight,
  //       job
  //     });
  //     await User.register(user, password1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   res.redirect("/");
  // }
};
export const login = (req, res) => res.send("login");
export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

//About Router Controller
export const fitness = (req, res) => res.send("fitness");
export const game = (req, res) => res.send("game");
export const character = (req, res) => res.send("character");
export const connection = (req, res) => res.send("connection");

//Notice Router Controller
export const noticeHome = (req, res) => res.send("notice home");
export const noticeDetail = (req, res) => res.send("notice detail");
