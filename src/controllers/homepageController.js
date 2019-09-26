import routes from "../routes";
import User from "../models/users";

//Global Router Controller
export const home = (req, res) => res.render("home");
export const homeKr = (req, res) => res.render("home_kr");
export const homeJp = (req, res) => res.render("home_jp");
export const company = (req, res) => res.send("company");
export const getSignup = (req, res) => res.render("signup");
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
  if (password1 !== password2) {
    res.render("signup");
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
      console.log(error);
    }
    res.redirect("/");
  }
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
