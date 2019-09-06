//Global
const HOME = "/";
const HOME_KR = "/kr";
const HOME_JP = "/jp";
const SIGNUP = "/signup";
const COMPANY = "/company";

//About
const ABOUT = "/about";
const FITNESS = "/fitness";
const GAME = "/game";
const CHARACTER = "/character";
const CONNECTION = "/connection";

//Notice
const NOTICE = "/notice";
const NOTICE_HOME = "/";
const NOTICE_DETAIL = "/:id";

//Admin
const ADMIN = "/admin";
const ADMIN_LOGIN = "/login";
const ADMIN_LOGOUT = "/logout";
const ADMIN_NOTICE = "/notice";
const ADMIN_GAME = "/game";

const routes = {
  home: HOME,
  homeKr: HOME_KR,
  homeJp: HOME_JP,
  signup: SIGNUP,
  company: COMPANY,
  about: ABOUT,
  fitness: FITNESS,
  game: GAME,
  character: CHARACTER,
  connection: CONNECTION,
  notice: NOTICE,
  notice_home: NOTICE_HOME,
  notice_detail: NOTICE_DETAIL,
  admin: ADMIN,
  admin_notice: ADMIN_NOTICE,
  admin_game: ADMIN_GAME,
  admin_login: ADMIN_LOGIN,
  admin_logout: ADMIN_LOGOUT
};

export default routes;
