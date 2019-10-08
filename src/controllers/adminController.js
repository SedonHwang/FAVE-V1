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
    res.render("admin_notice", { notices: notices.reverse() });
  } catch (e) {
    console.log(e);
    res.render("admin_notice", { notices: [] });
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
      description_jp
    }
  } = req;
  if (req.file) {
    console.log(req.file);
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
      notice_img: path
    });
    console.log(newNotice);
    res.redirect(`/admin${routes.admin_notice}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/admin${routes.upload_notice}`);
  }
};

export const deleteNotice = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Notice.findOneAndDelete({ _id: id });
  } catch (e) {
    console.log(e);
  }
  res.redirect(`/admin${routes.admin_notice}`);
};

export const adminGame = (req, res) => res.send("admin_game");
