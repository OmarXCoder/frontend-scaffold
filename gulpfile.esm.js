require("browser-sync").create("bs-instance");
const gulp = require("gulp");
export const { styles } = require("./tasks/styles");
export const { scripts } = require("./tasks/scripts");
export const { html, htmlFormatter } = require("./tasks/html");
export const { copyDependencies, copy } = require("./tasks/copy");
export const { watch } = require("./tasks/watch");
export const { serve, serveSrc } = require("./tasks/serve");
export const { build, buildFresh } = require("./tasks/build");

export const { cleanCss, cleanJs, cleanHtml, cleanVendor, cleanSrc, cleanBuild, clean } = require("./tasks/clean");

exports.compile = gulp.parallel(styles, scripts, html);
exports.default = gulp.parallel(serveSrc, watch);
