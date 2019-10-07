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
export const adminGame = (req, res) => res.send("admin_game");

// 1. notice 모델을 불러온다.
// 2. 모델을 모두 찾는다. await Notice.find({});
// 3. 찾은 노티스를 넘겨준다.
// 4. 테이블 형식으로 꾸며서 보여준다. title, description, 날짜를 보여주면 될듯
