//Global
const HOME = "/";
const HOME_KR = "/kr";
const HOME_JP = "/jp";
const SIGNUP = "/signup";
const SIGNUP_KR = "/signup/kr";
const SIGNUP_JP = "/signup/jp";
const LOGIN = "/login";
const LOGIN_KR = "/login/kr";
const LOGIN_JP = "/login/jp";
const LOGOUT = "/logout";
const LOGOUT_KR = "/logout/kr";
const LOGOUT_JP = "/logout/jp";
const COMPANY = "/company";
const COMPANY_KR = "/company/kr";
const COMPANY_JP = "/company/jp";
const CONTACT = "/contact";
const CONTACT_KR = "/contact/kr";
const CONTACT_JP = "/contact/jp";
const PRIVACY = "/privacy";
const PRIVACY_KR = "/privacy/kr";
const PRIVACY_JP = "/privacy/jp";
const TERMOFUSE = "/term-of-use";
const TERMOFUSE_KR = "/term-of-use/kr";
const TERMOFUSE_JP = "/term-of-use/jp";
const FORGOTPASSWORD = "/password";
const FORGOTPASSWORD_KR = "/password/kr";
const FORGOTPASSWORD_JP = "/password/jp";

//About
const ABOUT = "/about";
const FITNESS = "/fitness";
const FITNESS_KR = "/fitness/kr";
const FITNESS_JP = "/fitness/jp";
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
const NOTICE_DETAIL = "/detail/:id";
const NOTICE_DETAIL_KR = "/detail/:id/kr";
const NOTICE_DETAIL_JP = "/detail/:id/jp";

//User
const USER = "/user";
const USER_PAGE = "/me";
const USER_PAGE_KR = "/me/kr";
const USER_PAGE_JP = "/me/jp";
const CHANGE_PASSWORD = "/password";
const CHANGE_PASSWORD_KR = "/password/kr";
const CHANGE_PASSWORD_JP = "/password/jp";

//Admin
const ADMIN = "/admin";
const ADMIN_LOGIN = "/login";
const ADMIN_LOGOUT = "/logout";
const ADMIN_NOTICE = "/notice/:page";
const UPLOAD_NOTICE = "/upload/notice";
const DELETE_NOTICE = "/notice/:id/delete";
const EDIT_NOTICE = "/notice/:id/edit";
const ADMIN_GAME = "/game";
const PAYMENTS = "/payments";
const ADMIN_REVIEW = "/adminreview";
const REVIEW_UPDATE = "/adminreview/update";
const REVIEW_DELETE = "/adminreview/delete";

//Store
const STORE = "/store";
const STORE_KR = "/store/kr";
const STORE_JP = "/store/jp";
const FAVE350 = "/fave350";
const FAVE350_KR = "/fave350/kr";
const FAVE350_JP = "/fave350/jp";
const FAVE450 = "/fave450";
const FAVE450_KR = "/fave450/kr";
const FAVE450_JP = "/fave450/jp";
const PAYMENT = "/payment";
const PAYMENT_KR = "/payment/kr";
const PAYMENT_JP = "/payment/jp";
const PAYMENT_INFO = "/payment/info";
const PAYMENT_COMPLETE = "/payment/complete";
const PAYMENT_COMPLETE_MOBILE = "/payment/complete/mobile";
const PAYMENT_COMPLETE_PAYPAL = "/payment/complete/paypal";
const PAYMENT_COMPLETE_PAYPAL_JP = "/payment/complete/paypal/jp";
const ORDERS = "/orders";
const ORDERS_KR = "/orders/kr";
const ORDERS_JP = "/orders/jp";
const ORDERS_CHECK = "/orders/check";
const ORDERS_CHECK_KR = "/orders/check/kr";
const ORDERS_CHECK_JP = "/orders/check/jp";
const REFUND = "/refund";
const REFUND_KR = "/refund/kr";
const REFUND_JP = "/refund/jp";
const REVIEW = "/review";

const routes = {
  home: HOME,
  homeKr: HOME_KR,
  homeJp: HOME_JP,
  signup: SIGNUP,
  signup_kr: SIGNUP_KR,
  signup_jp: SIGNUP_JP,
  login: LOGIN,
  login_kr: LOGIN_KR,
  login_jp: LOGIN_JP,
  logout: LOGOUT,
  logout_kr: LOGOUT_KR,
  logout_jp: LOGOUT_JP,
  company: COMPANY,
  companyKr: COMPANY_KR,
  companyJp: COMPANY_JP,
  contact: CONTACT,
  contactKr: CONTACT_KR,
  contactJp: CONTACT_JP,
  about: ABOUT,
  fitness: FITNESS,
  fitness_kr: FITNESS_KR,
  fitness_jp: FITNESS_JP,
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
  notice_detail_kr: NOTICE_DETAIL_KR,
  notice_detail_jp: NOTICE_DETAIL_JP,
  user: USER,
  user_page: USER_PAGE,
  user_page_kr: USER_PAGE_KR,
  user_page_jp: USER_PAGE_JP,
  change_password: CHANGE_PASSWORD,
  change_password_kr: CHANGE_PASSWORD_KR,
  change_password_jp: CHANGE_PASSWORD_JP,
  admin: ADMIN,
  admin_login: ADMIN_LOGIN,
  admin_logout: ADMIN_LOGOUT,
  admin_notice: ADMIN_NOTICE,
  upload_notice: UPLOAD_NOTICE,
  editNotice: (id) => {
    if (id) {
      return `/notice/${id}/edit`;
    } else {
      return EDIT_NOTICE;
    }
  },
  deleteNotice: (id) => {
    if (id) {
      return `/notice/${id}/delete`;
    } else {
      return DELETE_NOTICE;
    }
  },
  admin_game: ADMIN_GAME,
  payments: PAYMENTS,
  privacy: PRIVACY,
  privacy_kr: PRIVACY_KR,
  privacy_jp: PRIVACY_JP,
  termOfUse: TERMOFUSE,
  termOfUse_kr: TERMOFUSE_KR,
  termOfUse_jp: TERMOFUSE_JP,
  forgotPassword: FORGOTPASSWORD,
  forgotPassword_kr: FORGOTPASSWORD_KR,
  forgotPassword_jp: FORGOTPASSWORD_JP,
  store: STORE,
  store_kr: STORE_KR,
  store_jp: STORE_JP,
  fave350: FAVE350,
  fave350_kr: FAVE350_KR,
  fave350_jp: FAVE350_JP,
  fave450: FAVE450,
  fave450_kr: FAVE450_KR,
  fave450_jp: FAVE450_JP,
  payment: PAYMENT,
  payment_kr: PAYMENT_KR,
  payment_jp: PAYMENT_JP,
  payment_complete: PAYMENT_COMPLETE,
  payment_complete_mobile: PAYMENT_COMPLETE_MOBILE,
  payment_complete_paypal: PAYMENT_COMPLETE_PAYPAL,
  payment_complete_paypal_jp: PAYMENT_COMPLETE_PAYPAL_JP,
  payment_info: PAYMENT_INFO,
  orders: ORDERS,
  orders_kr: ORDERS_KR,
  orders_jp: ORDERS_JP,
  orders_check: ORDERS_CHECK,
  orders_check_kr: ORDERS_CHECK_KR,
  orders_check_jp: ORDERS_CHECK_JP,
  refund: REFUND,
  refund_kr: REFUND_KR,
  refund_jp: REFUND_JP,
  review: REVIEW,
  admin_review: ADMIN_REVIEW,
  review_update: REVIEW_UPDATE,
  review_delete: REVIEW_DELETE,
};

export default routes;
