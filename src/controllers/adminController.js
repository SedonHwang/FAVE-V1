import passport from "passport";
import routes from "../routes";
import Notice from "../models/notices";

//Global Router Controller

export const adminLogin = (req, res) => res.render("admin_login");
export const postAdminLogin = passport.authenticate("local", {
  failureRedirect: routes.admin_login,
  successRedirect: "/admin/notice/1"
});

export const adminLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(`/admin${routes.admin_login}`);
};

export const adminNotice = async (req, res) => {
  const renderedNotice = 3;
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
    res.render("admin_notice", {
      notices,
      maxPage,
      page,
      numberOfNotice,
      renderedNotice
    });
  } catch (e) {
    console.log(e);
    res.render("admin_notice", {
      notices: [],
      maxPage: 1,
      page,
      numberOfNotice
    });
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
    res.redirect("/admin/notice/1");
  } catch (e) {
    console.log(e);
    res.redirect(`/admin${routes.upload_notice}`);
  }
};

export const editNotice = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const notice = await Notice.findById(id);
    res.render("notice_edit", { notice });
  } catch (e) {
    console.log(e);
    res.redirect("/admin/notice/1");
  }
};

export const postEditNotice = async (req, res) => {
  const {
    params: { id },
    body: {
      title_kr,
      title_en,
      title_jp,
      description_kr,
      description_en,
      description_jp
    }
  } = req;
  try {
    await Notice.findOneAndUpdate(
      { _id: id },
      {
        title_kr,
        title_en,
        title_jp,
        description_kr,
        description_en,
        description_jp
      }
    );
    res.redirect("/admin/notice/1");
  } catch (e) {
    console.log(e);
    res.redirect(`/admin${routes.editNotice(id)}`);
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
  res.redirect("/admin/notice/1");
};

export const adminGame = (req, res) => res.send("admin_game");
