import routes from "./routes";
import multer from "multer";

const multerImg = multer({ dest: "uploads/images/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const onlyAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      next();
    } else {
      res.redirect(routes.home);
    }
  } else {
    res.redirect(routes.home);
  }
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadImg = multerImg.single("imgFile");
