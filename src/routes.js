//Global
const HOME = "/";
const HOME_KR = "/kr";
const HOME_JP = "/jp";
const SIGNUP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";
const COMPANY = "/company";
const COMPANY_KR = "/company/kr";
const COMPANY_JP = "/company/jp";
const CONTACT = "/contact";

//About
const ABOUT = "/about";
const FITNESS = "/fitness";
const GAME = "/game";
const GAME_KR = "/game/kr";
const GAME_JP = "/game/jp";
const CHARACTER = "/character";
const CHARACTER_KR = "/character/kr";
const CHARACTER_JP = "/character/jp";
const CONNECTION = "/connection";
const CONNECTION_KR = "/connection/kr";
const CONNECTION_JP = "/connection/jp";

//Notice
const NOTICE = "/notice";
const NOTICE_HOME = "/:page";
const NOTICE_HOME_KR = "/:page/kr";
const NOTICE_HOME_JP = "/:page/jp";
const NOTICE_DETAIL = "/:id";

//User
const USER = "/user";
const USER_PAGE = "/me";
const CHANGE_PROFIT = "/changeProfit";
const CHANGE_PASSWORD = "/changePassword";

//Admin
const ADMIN = "/admin";
const ADMIN_LOGIN = "/login";
const ADMIN_LOGOUT = "/logout";
const ADMIN_NOTICE = "/notice/:page";
const UPLOAD_NOTICE = "/upload/notice";
const DELETE_NOTICE = "/notice/:id/delete";
const EDIT_NOTICE = "/notice/:id/edit";
const ADMIN_GAME = "/game";

const routes = {
  home: HOME,
  homeKr: HOME_KR,
  homeJp: HOME_JP,
  signup: SIGNUP,
  login: LOGIN,
  logout: LOGOUT,
  company: COMPANY,
  companyKr: COMPANY_KR,
  companyJp: COMPANY_JP,
  contact: CONTACT,
  about: ABOUT,
  fitness: FITNESS,
  game: GAME,
  game_kr: GAME_KR,
  game_jp: GAME_JP,
  character: CHARACTER,
  character_kr: CHARACTER_KR,
  character_jp: CHARACTER_JP,
  connection: CONNECTION,
  connection_kr: CONNECTION_KR,
  connection_jp: CONNECTION_JP,
  notice: NOTICE,
  notice_home: NOTICE_HOME,
  notice_home_kr: NOTICE_HOME_KR,
  notice_home_jp: NOTICE_HOME_JP,
  notice_detail: NOTICE_DETAIL,
  user: USER,
  user_page: USER_PAGE,
  change_profit: CHANGE_PROFIT,
  change_password: CHANGE_PASSWORD,
  admin: ADMIN,
  admin_login: ADMIN_LOGIN,
  admin_logout: ADMIN_LOGOUT,
  admin_notice: ADMIN_NOTICE,
  upload_notice: UPLOAD_NOTICE,
  editNotice: id => {
    if (id) {
      return `/notice/${id}/edit`;
    } else {
      return EDIT_NOTICE;
    }
  },
  deleteNotice: id => {
    if (id) {
      return `/notice/${id}/delete`;
    } else {
      return DELETE_NOTICE;
    }
  },
  admin_game: ADMIN_GAME
};

export default routes;
