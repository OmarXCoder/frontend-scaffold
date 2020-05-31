const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const packageImporter = require("node-sass-package-importer");
const browserSync = require("browser-sync").get("bs-instance");

export function styles() {
    const sassOptions = {
        importer: packageImporter(),
    };

    gulp.src(["src/_assets/scss/pages/*.scss"], { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(sass.sync(sassOptions).on("error", sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/assets/css/pages"), { sourcemaps: "." })
        .pipe(browserSync.stream());

    return gulp
        .src(["src/_assets/scss/**/*.scss", "!**/pages/*.scss"], { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(sass.sync(sassOptions).on("error", sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/assets/css"), { sourcemaps: "." })
        .pipe(browserSync.stream());
}
