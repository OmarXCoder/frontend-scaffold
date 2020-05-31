const gulp = require("gulp");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").get("bs-instance");

export function scripts() {
    gulp.src(["src/_assets/js/app/*.js"])
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(concat("app.js"))
        .pipe(gulp.dest("src/assets/js"))
        .pipe(browserSync.stream());

    return gulp
        .src(["src/_assets/js/pages/**/*.js"])
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(gulp.dest("src/assets/js/pages"))
        .pipe(browserSync.stream());
}
