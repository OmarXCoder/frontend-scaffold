const gulp = require("gulp");
const copy = require("gulp-copy");
const packages = require("../config/packages");

export function copyDependencies() {
    let src = [];

    for (let key in packages) {
        src.push(...packages[key]);
    }

    return gulp
        .src(src, { allowEmpty: true })
        .pipe(copy("src/assets/vendor", { prefix: 1 }));
}

exports.copy = gulp.series(copyDependencies);
