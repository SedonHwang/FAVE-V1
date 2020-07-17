import routes from "./routes";
import multer from "multer";

const multerImg = multer({ dest: "uploads/images/" });
// 리뷰 이미지가 저장될 서버내 주소. s3로 옮기는게 좋음
const reviewImg = multer({ dest: "uploads/reviews/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const redirectWWW = (req, res, next) => {
  const host = req.get("host");
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  if (host === "faves.co.kr" || protocol !== "https") {
    res.redirect(301, `https://www.faves.co.kr${req.url}`);
  } else {
    next();
  }
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

export const onlyPublicKr = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.homeKr);
  } else {
    next();
  }
};

export const onlyPublicJp = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.homeJp);
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

export const onlyPrivateKr = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.homeKr);
  }
};

export const onlyPrivateJp = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.homeJp);
  }
};

export const uploadImg = multerImg.single("imgFile");
// 해당 부분이 미들웨어로 들어가고 input의 name이 reviewImg 되어야함
export const uploadReviewImg = reviewImg.single("reviewImg");
