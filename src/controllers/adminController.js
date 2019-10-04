import passport from "passport";
import routes from "../routes";

//Global Router Controller

export const adminLogin = (req, res) => res.render("admin_login");
export const postAdminLogin = passport.authenticate("local", {
  failureRedirect: routes.admin_login,
  successRedirect: "/admin/notice"
});
export const adminNotice = (req, res) => res.send("admin_notice");
export const adminGame = (req, res) => res.send("admin_game");
