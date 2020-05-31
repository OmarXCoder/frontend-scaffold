const gulp = require("gulp");
const del = require("del");

export function cleanHtml(callback) {
    del.sync("src/*.html");
    callback();
}

export function cleanCss(callback) {
    del.sync("src/assets/css");
    callback();
}

export function cleanJs(callback) {
    del.sync("src/assets/js");
    callback();
}

export function cleanVendor(callback) {
    del.sync("src/assets/vendor");
    callback();
}

export function cleanBuild(callback) {
    del.sync("build");
    callback();
}

exports.cleanSrc = gulp.parallel(cleanCss, cleanJs, cleanHtml, cleanVendor);
exports.clean = gulp.parallel(
    cleanCss,
    cleanJs,
    cleanHtml,
    cleanVendor,
    cleanBuild
);
