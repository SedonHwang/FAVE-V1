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
      `/user${routes.user_page_ko}`
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
        `/user${routes.user_page_ko}`
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

export const changePassword = (req, res) => res.send("change User Password");
