var gulp = require('gulp');
var sass = require('gulp-sass');
//var rimraf = require('rimraf');

var path = {    
    DIST_INDEX: 'dist/',
    SRC_INDEX:  'src/',
    DIST_CSS:   './dist/css',
    DIST_JS:    'dist/js',
    SRC_SASS:   './src/assets/sass/**/*.scss',
    ENTRY_POIN: 'src/assets/ts/**/*.ts',
    ENTRY_SASS: './src/assets/sass/weather.scss'
}



// gulp.task('rimraf', function (cb) {
//    rimraf(path.DIST_INDEX, cb);
// });

gulp.task('sass', function () {
    return gulp.src(path.ENTRY_SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.DIST_CSS));
});

gulp.task('sass:watch', function () {
    gulp.watch(path.SRC_SASS, ['sass']);
});