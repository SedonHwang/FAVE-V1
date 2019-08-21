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

//Admin

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
  notice_detail: NOTICE_DETAIL
};

export default routes;
