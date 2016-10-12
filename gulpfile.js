/**
 * Created by Young Bae on 10/12/16.
 */

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var dist = 'dist' + '/';

gulp.task('webserver', function() {
   gulp.src('./')
       .pipe(webserver({
           livereload: true,
           directoryListing: true,
           open: true,
           fallback: 'index.html'
       }));
});

gulp.task('compile-sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(dist + 'css'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/js/**/*.js');
    gulp.watch('./src/sass/**/*.scss', ['compile-sass']);
    gulp.watch('./src/**.*.html');
    gulp.watch(dist + '/**').on('change', livereload.changed);
});

gulp.task('default', ['webserver', 'compile-sass', 'watch']);