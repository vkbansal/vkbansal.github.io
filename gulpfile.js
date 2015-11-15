"use strict";

let gulp = require("gulp"),
    path = require("path"),
    config = require("./scripts/config"),
    stylus = require("gulp-stylus"),
    minifyCss = require("gulp-minify-css"),
    posts = require("./scripts/posts"),
    pages = require("./scripts/pages");

gulp.task("default", function() {

});

gulp.task("css", function() {
    return gulp.src("./src/_styl/main.styl")
        .pipe(stylus())
        .pipe(minifyCss())
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("posts", function() {
    let read_path = path.resolve(config.location.source, config.location.posts) + "/**/*.md",
        write_path = config.location.destination;

    return gulp.src(read_path)
        .pipe(posts(config))
        .pipe(gulp.dest(write_path));
});

gulp.task("pages", function() {
    return gulp.src(`${config.location.source}/**/*.html`)
        .pipe(pages(config))
        .pipe(gulp.dest(config.location.destination));
});
