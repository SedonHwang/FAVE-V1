import passport from "passport";
import routes from "../routes";
import Notice from "../models/notices";

//Global Router Controller

export const adminLogin = (req, res) => res.render("admin_login");
export const postAdminLogin = passport.authenticate("local", {
  failureRedirect: routes.admin_login,
  successRedirect: "/admin/notice"
});

export const adminLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(`/admin${routes.admin_login}`);
};

export const adminNotice = async (req, res) => {
  try {
    const notices = await Notice.find({});
    res.render("admin_notice", { notices });
  } catch (e) {
    console.log(e);
    res.render("admin_notice", { notices: [] });
  }
};

export const uploadNotice = (req, res) => res.render("notice_upload");

export const adminGame = (req, res) => res.send("admin_game");
