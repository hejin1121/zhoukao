const gulp = require('gulp');
const sass = require('gulp-sass');
const minCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
//编译sass，压缩css
gulp.task('devScss', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});
//编译js,压缩js
gulp.task('devJs', () => {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'))
});
//起服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9090,
            livereload: true,
            open: true,

        }))
});
//监听scss js
gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('devScss'))
    gulp.watch('./src/scripts/**/*.js', gulp.series('devJs'))
});
//线上
gulp.task('default', gulp.series('devScss', 'devJs', 'server', 'watch'));