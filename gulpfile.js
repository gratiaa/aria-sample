/**
 * Created by Young Bae on 10/12/16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browsersync = require('browser-sync');

var dist = 'dist' + '/';

gulp.task('compile-sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(dist + 'css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js');
    gulp.watch('./src/sass/**/*.scss', ['compile-sass']);
    gulp.watch('./src/**.*.html');
});

gulp.task('server', ['watch'], function() {
    browsersync.init({
        server: {
            baseDir: './',
            directory: true
        },
        port: 8000,
        ui: {
            port: 8001,
            weinre: {
                port: 9090
            }
        },
        open: false
    });

    gulp.watch('src/html/**/*.html').on('change', browsersync.reload);
    gulp.watch(dist + '/**').on('change', browsersync.reload);
});