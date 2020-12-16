const {
    src,
    dest,
    watch,
    series
} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


//Sass task
function scssTask() {
    return src('src/scss/style.scss', {
            sourcemaps: true
        })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('src/css/', {
            sourcemaps: '.'
        }))
}
//JavaScript Task
function jsTask() {
    return src('src/js/*.js', {
            sourcemaps: true
        })
        .pipe(terser())
        .pipe(dest('dist', {
            sourcemaps: '.'
        }));
}
//Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'src/.',
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('src/*.html', browsersyncReload);
    watch(['src/scss/style.scss', 'src/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

//Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);