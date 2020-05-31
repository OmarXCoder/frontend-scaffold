"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del']
});



module.exports = function(options) {
  // Used for SASS files that are in the (${layout}/scss) directory
  gulp.task('index:sass', function() {
    return gulp.src(options.assetsDir + "/index/index.scss")
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer({browsers: ['> 1%', 'last 3 versions', 'Firefox ESR']}))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.assetsDir + '/index/'))
      .pipe(browserSync.stream());
  });

  gulp.task('index:scripts', function() {
    return gulp.src(options.assetsDir + "/index/index.js")
      .pipe(browserSync.stream());
  });

  gulp.task('index:watch', ['index:sass', 'index:scripts'], function() {
    gulp.watch(options.assetsDir + '/index/*.scss', ['index:sass']);
    gulp.watch(options.assetsDir + '/index/*.js', ['index:scripts']);

    gulp.watch(options.srcDir + '/*.html').on('change', browserSync.reload);
  });

  gulp.task('index:serve', ['index:watch'], function() {
    browserSync({
      notify: false,
      port: 9090,
      server: {
        baseDir: [options.srcDir],
        routes: {'/bower_components': 'bower_components'}
      }
    });
  });
};