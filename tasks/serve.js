const browserSync = require("browser-sync").get("bs-instance");

export function serveSrc() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "src",
        },
    });
}

export function serve() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "build",
        },
    });
}
