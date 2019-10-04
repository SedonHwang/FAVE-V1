//Global
const HOME = "/";
const HOME_KR = "/kr";
const HOME_JP = "/jp";
const SIGNUP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";
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

//User
const USER = "/user";
const USER_PAGE = "/me";
const CHANGE_PROFIT = "/changeProfit";
const CHANGE_PASSWORD = "/changePassword";

//Admin
const ADMIN = "/admin";
const ADMIN_LOGIN = "/login";
const ADMIN_NOTICE = "/notice";
const ADMIN_GAME = "/game";

const routes = {
  home: HOME,
  homeKr: HOME_KR,
  homeJp: HOME_JP,
  signup: SIGNUP,
  login: LOGIN,
  logout: LOGOUT,
  company: COMPANY,
  about: ABOUT,
  fitness: FITNESS,
  game: GAME,
  character: CHARACTER,
  connection: CONNECTION,
  notice: NOTICE,
  notice_home: NOTICE_HOME,
  notice_detail: NOTICE_DETAIL,
  user: USER,
  user_page: USER_PAGE,
  change_profit: CHANGE_PROFIT,
  change_password: CHANGE_PASSWORD,
  admin: ADMIN,
  admin_login: ADMIN_LOGIN,
  admin_notice: ADMIN_NOTICE,
  admin_game: ADMIN_GAME
};

export default routes;
