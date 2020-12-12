const gulp = require('gulp');
const sass  = require('gulp-sass');
const browsersync = require('browser-sync').create();

//Compile scss into css
function style() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browsersync.stream());
}
exports.style = style;
