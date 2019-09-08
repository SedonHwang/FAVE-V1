import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Admin from "./models/admins";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.find({ where: { email } });
        if (admin) {
          const result = admin.password === password;
          if (result) {
            done(null, admin);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } else {
          done(null, false, { message: "가입되지 않은 회원입니다." });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Admin.find({ where: { id } })
    .then(admin => done(null, admin))
    .catch(err => done(err));
});
