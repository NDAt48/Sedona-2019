"use strict";

var gulp = require("gulp"),
    gp = require("gulp-load-plugins")(),
    browserSync = require('browser-sync').create();


// gulp.task("pug",function () {
//   return gulp.src("src/pug/pages/*.pug")
//     .pipe(gp.pug({
//         pretty: true
//     }))
//     .pipe(gulp.dest("build"));
//     .on("end", browserSync.reload);
// });    

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});


gulp.task("sass",function () {
  return gulp.src("src/static/sass/main.scss")
    .pipe(gp.sourcemaps.init())
    .pipe(gp.sass({}))
    .pipe(gp.autoprefixer({
            browsers: ['last 10 versions']
        }))
    .on("error", gp.notify.onError({
        message: "Error: <%= error.message %>",
        title: "sass"
      }))
    .pipe(gp.csso())
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest("build/static/css/"))
    .pipe(browserSync.reload({
      stream:true
    }));
});    

gulp.task("watch", function() {
  // gulp.watch("src/pug/**/*.pug", gulp.series("pug"));
  gulp.watch("src/static/sass/**/*.scss", gulp.series("sass"))
});

gulp.task("default", gulp.series(
  gulp.parallel("sass"),
  gulp.parallel("watch", "serve")
  ));
