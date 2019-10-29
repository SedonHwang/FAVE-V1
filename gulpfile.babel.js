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
    src: "src/public/img/**/*",
    dest: "build/public/img"
  },
  scss: {
    watch: "src/public/scss/**/*.scss",
    src: "src/public/scss/style.scss",
    dest: "build/public/css",
    devDest: "src/public/css"
  },
  js: {
    watch: "src/public/js/**/*.js",
    src: "src/public/js/main.js",
    dest: "build/public/js",
    devDest: "src/public/jsDev"
  },
  video: {
    src: "src/public/videos/**/*",
    dest: "build/public/videos"
  }
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gulpCopy(routes.pug.dest, { prefix: 1 }));

const vidoe = () =>
  gulp.src(routes.video.src).pipe(gulpCopy(routes.video.dest, { prefix: 3 }));

const clean = () =>
  del(["build/public/js", "src/public/jsDev", "src/public/css"]);

const devClean = () => del(["src/public/css", "src/public/jsDev"]);

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

const devStyles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(gulpAutop({ overrideBrowserslist: ["last 2 versions"] }))
    .pipe(gulp.dest(routes.scss.devDest));

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

const devJs = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
      })
    )
    .pipe(gulp.dest(routes.js.devDest));

const watch = () => {
  gulp.watch(routes.scss.watch, devStyles);
  gulp.watch(routes.js.watch, devJs);
};

const prepare = gulp.series([clean, img, vidoe]);

const devAssets = gulp.series([devStyles, devJs]);

const assets = gulp.series([pug, styles, js]);

export const dev = gulp.series([devClean, devAssets, watch]);
export const build = gulp.series([prepare, assets]);
