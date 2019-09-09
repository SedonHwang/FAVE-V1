//Global Router Controller
export const login = (req, res) => res.render("admin_login");
export const postLogin = (req, res) => {
  res.send("admin_home");
};
export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/admin/login");
};
export const adminNotice = (req, res) => {
  console.log(req.user);
  res.render("admin_notice", { user: req.user });
};
export const adminGame = (req, res) =>
  res.render("admin_game", { user: req.user });
