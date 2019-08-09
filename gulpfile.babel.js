import gulp from "gulp";
import gulpCopy from "gulp-copy";
import del from "del";
import gulpImg from "gulp-image";
import gulpSass from "gulp-sass";
import gulpAutop from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

const routes = {
  pug: {
    src: "src/views/**/*.pug",
    dest: "build"
  },
  img: {
    src: "src/public/img/*",
    dest: "build/public/img"
  },
  scss: {
    src: "src/public/scss/style.scss",
    dest: "build/public/css"
  },
  js: {
    src: "src/public/js/main.js",
    dest: "build/public/js"
  }
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gulpCopy(routes.pug.dest, { prefix: 1 }));

const clean = () => del(["build/public/js"]);

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(gulpImg())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(gulpAutop({ overrideBrowserslist: ["last 2 versions"] }))
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }]
        ]
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

// dev 필요 : dev 파일에서 sass나 js를 변환해서 확인할 수 있어야 편함. build만 있으면 dev 상태에서는 어떻게 scss와 js가 적용된 모습을 볼 것인가?
export const build = gulp.series([prepare, assets]);
