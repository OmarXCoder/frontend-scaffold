const gulp = require("gulp");
const browserSync = require("browser-sync").get("bs-instance");
const { styles } = require("./styles");
const { scripts } = require("./scripts");
const { html } = require("./html");

export function watch() {
    gulp.watch(
        ["shared/assets/scss/**/*.scss", "src/_assets/scss/**/*.scss"],
        { ignoreInitial: false },
        styles
    );

    gulp.watch(
        ["shared/assets/js/**/*.js", "src/_assets/js/**/*.js"],
        { ignoreInitial: false },
        scripts
    );

    gulp.watch(
        ["shared/assets/hbs/**/*.hbs", "src/_assets/hbs/**/*.hbs"],
        { ignoreInitial: false },
        html
    );

    gulp.watch("src/*.html").on("change", browserSync.reload);
}
