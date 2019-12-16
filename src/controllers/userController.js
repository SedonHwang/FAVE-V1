import { throwFlashMsg } from "../lib";
import routes from "../routes";
import User from "../models/users";

//User Router Controller
export const userPage = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("profile");
  } else {
    res.render("profile", { errorMessage });
  }
};
export const userPageKr = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("profile_kr");
  } else {
    res.render("profile_kr", { errorMessage });
  }
};
export const userPageJp = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("profile_jp");
  } else {
    res.render("profile_jp", { errorMessage });
  }
};
export const changeProfile = async (req, res) => {
  let {
    body: {
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
  if (!name) {
    throwFlashMsg(req, res, "* is required.", `/user${routes.user_page}`);
  } else {
    try {
      await User.findByIdAndUpdate(req.user.id, {
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
      });
      res.redirect(routes.home);
    } catch {
      throwFlashMsg(req, res, "Something Wrong :(", `/user${routes.user_page}`);
    }
  }
};

export const changeProfileKr = async (req, res) => {
  let {
    body: {
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
  if (!name) {
    throwFlashMsg(
      req,
      res,
      "*은 필수입력값입니다.",
      `/user${routes.user_page_kr}`
    );
  } else {
    try {
      await User.findByIdAndUpdate(req.user.id, {
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
      });
      res.redirect(routes.homeKr);
    } catch {
      throwFlashMsg(
        req,
        res,
        "Something Wrong :(",
        `/user${routes.user_page_kr}`
      );
    }
  }
};

export const changeProfileJp = async (req, res) => {
  let {
    body: {
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
  if (!name) {
    throwFlashMsg(
      req,
      res,
      "*は 必須入力値です.",
      `/user${routes.user_page_jp}`
    );
  } else {
    try {
      await User.findByIdAndUpdate(req.user.id, {
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
      });
      res.redirect(routes.homeJp);
    } catch {
      throwFlashMsg(
        req,
        res,
        "Something Wrong :(",
        `/user${routes.user_page_jp}`
      );
    }
  }
};

export const changePassword = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("password");
  } else {
    res.render("password", { errorMessage });
  }
};
export const changePasswordKr = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("password_kr");
  } else {
    res.render("password_kr", { errorMessage });
  }
};
export const changePasswordJp = (req, res) => {
  let errorMessage = req.flash("errorMessage");
  if (errorMessage.length === 0) {
    res.render("password_jp");
  } else {
    res.render("password_jp", { errorMessage });
  }
};

export const postChangePassword = async (req, res) => {
  const {
    body: { password, password1, password2 }
  } = req;
  try {
    if (password1 !== password2) {
      res.status(400);
      throwFlashMsg(
        req,
        res,
        "The passwords are different.",
        `/user${routes.change_password}`
      );
      return;
    } else if (password1.length < 8) {
      res.status(400);
      throwFlashMsg(
        req,
        res,
        "You must enter at least 8 characters",
        `/user${routes.change_password}`
      );
      return;
    }
    await req.user.changePassword(password, password1);
    res.redirect(routes.home);
  } catch (error) {
    res.status(400);
    if (error.name === "IncorrectPasswordError") {
      throwFlashMsg(
        req,
        res,
        "Current password is invalid :(",
        `/user${routes.change_password}`
      );
      return;
    }
    throwFlashMsg(
      req,
      res,
      "Something Wrong :(",
      `/user${routes.change_password}`
    );
  }
};

export const postChangePasswordJp = async (req, res) => {
  const {
    body: { password, password1, password2 }
  } = req;
  try {
    if (password1 !== password2) {
      res.status(400);
      throwFlashMsg(
        req,
        res,
        "暗証番号が 違います.",
        `/user${routes.change_password_jp}`
      );
      return;
    } else if (password1.length < 8) {
      res.status(400);
      throwFlashMsg(
        req,
        res,
        "パスワードを 8文字 以上 入力してください.",
        `/user${routes.change_password_jp}`
      );
      return;
    }
    await req.user.changePassword(password, password1);
    res.redirect(routes.homeJp);
  } catch (error) {
    res.status(400);
    if (error.name === "IncorrectPasswordError") {
      throwFlashMsg(
        req,
        res,
        "現在 暗号が 間違っています :(",
        `/user${routes.change_password_jp}`
      );
      return;
    }
    throwFlashMsg(
      req,
      res,
      "Something Wrong :(",
      `/user${routes.change_password_jp}`
    );
  }
};

export const postChangePasswordKr = async (req, res) => {
  const {
    body: { password, password1, password2 }
  } = req;
  try {
    if (password1 !== password2) {
      res.status(400);
      throwFlashMsg(
        req,
        res,
        "비밀번호가 다릅니다",
        `/user${routes.change_password_kr}`
      );
      return;
    } else if (password1.length < 8) {
      res.status(400);
      throwFlashMsg(
        req,
        res,
        "새로운 비밀번호를 8자 이상 입력해주세요.",
        `/user${routes.change_password_kr}`
      );
      return;
    }
    await req.user.changePassword(password, password1);
    res.redirect(routes.homeKr);
  } catch (error) {
    res.status(400);
    if (error.name === "IncorrectPasswordError") {
      throwFlashMsg(
        req,
        res,
        "현재 비밀번호를 틀리셨습니다. :(",
        `/user${routes.change_password_kr}`
      );
      return;
    }
    throwFlashMsg(
      req,
      res,
      "Something Wrong :(",
      `/user${routes.change_password_kr}`
    );
  }
};
