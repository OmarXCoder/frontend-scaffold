const fs = require("fs");
const glob = require("glob");
const pretty = require("pretty");
const extname = require("gulp-extname");
const flatten = require("gulp-flatten");
const appConfig = require("../config/app");
require("./handlebars-helpers");

const { people, posts, images, emails, tasks, products, projects } = require("../data/sample-data.js");

let data = {
    posts,
    images,
    people,
    emails,
    tasks,
    products,
    projects,
    ...appConfig,
};

let assemble = null;

function start() {
    assemble = require("assemble")();
    assemble.data(data);
    assemble.engine("*", require("engine-handlebars"));
    assemble.on("postRender", function (view) {
        console.log(" assembled >", view.relative);
    });
}

export function html(callback) {
    start();

    assemble.layouts(["src/_assets/hbs/layouts/*.hbs"]);

    assemble.partials(["src/_assets/hbs/partials/*.hbs"]);

    let src = ["src/_assets/hbs/views/**/*.hbs"];

    process.argv.forEach((arg) => {
        if (arg.indexOf("--hbs-file") == 0) {
            let file_name = arg.split("=")[1];
            src = [`src/_assets/hbs/views/${file_name}`];
        }
    });

    assemble
        .src(src, { layout: "default.hbs" })
        .pipe(assemble.renderFile())
        .pipe(extname())
        .pipe(flatten())
        .pipe(assemble.dest("src"));
    callback();
}

// html formatter
export function htmlFormatter(callback) {
    var dir = "src";
    if (dir === "") {
        console.log("The option --path is required");
        callback();
        return;
    }
    glob(
        process.cwd() + "/" + dir + "/**/*.html",
        // ignore assets folder
        { ignore: [process.cwd() + "/" + dir + "/assets/**"] },
        function (er, files) {
            files.forEach(function (path) {
                fs.readFile(path, { encoding: "UTF-8" }, function (err, data) {
                    if (err) {
                        throw err;
                    }
                    var formatted = pretty(data, {
                        ocd: true,
                        indent_size: 4,
                        indent_char: " ",
                        unformatted: ["code", "pre", "em", "strong"],
                    });
                    fs.writeFile(path, formatted, function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log(path + " formatted!");
                    });
                });
            });
        }
    );
    callback();
}
