//Global
const HOME = "/";
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
