const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const copy = require("gulp-copy");
const { cleanBuild, cleanSrc } = require("./clean");
const { styles } = require("./styles");
const { scripts } = require("./scripts");
const { html } = require("./html");
const { copyDependencies } = require("./copy");

function processBuild() {
    gulp.src("src/*.html").pipe(gulp.dest("build"));

    gulp.src("src/assets/css/**/*.css")
        .pipe(cleanCss())
        .pipe(gulp.dest("build/assets/css"));

    gulp.src("src/assets/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/assets/js"));

    return gulp
        .src(["src/assets/vendor/**/*", "src/assets/images/**/*"])
        .pipe(copy("build", { prefix: 1 }));
}

exports.build = gulp.series(cleanBuild, processBuild);
exports.buildFresh = gulp.series(
    cleanBuild,
    cleanSrc,
    styles,
    scripts,
    html,
    copyDependencies,
    processBuild
);
