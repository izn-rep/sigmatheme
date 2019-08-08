var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost/Sigma'
    });
    gulp.watch(['assets/less/*.less', 'assets/less/**/*.less'], ['less']);
    gulp.watch(['assets/jade/*.jade', 'assets/jade/**/*.jade'], ['jade']);
    gulp.watch(['assets/js/*.js', 'assets/js/**/*.js'], ['js']);
});

gulp.task('jade', function() {
    gulp.src(['assets/jade/first-layout/dashboard/index.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});

gulp.task('less', function() {
    gulp.src(['assets/less/first-layout/first-layout.less'])
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(['assets/js/page-content/dashboard/index.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/js/page-content/dashboard'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync'], function() {
    console.log('***** Sigma - Responsive web app kit *****');
});