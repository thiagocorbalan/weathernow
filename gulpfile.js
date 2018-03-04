'use strict';

const gulp          = require('gulp');
const ts            = require("gulp-typescript");
//const tsProject     = ts.createProject("tsconfig.json");
const sass          = require('gulp-sass');
const imagemin      = require('gulp-imagemin');
const rimraf        = require('rimraf');
const useref        = require('gulp-useref');
const concat        = require('gulp-concat');
const tsify 		= require('tsify');
const browserify 	= require('browserify');
const browserSync   = require('browser-sync').create();
const source 		= require('vinyl-source-stream');
const buffer 		= require('vinyl-buffer');
const uglify        = require('gulp-uglify');

const path = {    
    DIST_INDEX: './dist',
    DIST_CSS:   './dist/assets/css',
    DIST_IMG:   './dist/assets/images',
    DIST_JS:    './dist/js',
    SRC_INDEX:  './src',
    SRC_SASS:   './src/assets/sass/**/*.scss',
    SRC_TS:     './src/ts/**/*.ts',
    SRC_IMG:    './src/assets/images',
    ENTRY_SASS: './src/assets/sass/weather.scss',
    ENTRY_TS: './src/ts/App.ts'
}

// BrowserSync
gulp.task('browserSync', function() {
    browserSync.init({
      server: { baseDir: 'dist'},
    })
});

// Clear
gulp.task('clear:dist', function (b) {
   rimraf(path.DIST_INDEX+'/*',b);
});

// SASS
gulp.task('sass', function () {
    return gulp.src(path.ENTRY_SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.DIST_CSS))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Wacth
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch(path.SRC_SASS, ['sass']);
    gulp.watch(path.SRC_TS, ['ts']);
    gulp.watch(`${path.SRC_INDEX}/index.html`,['html']);
});

// Imagemin
gulp.task('images', function(){
    return gulp.src( `${path.SRC_IMG}/**/*.+(png|jpg|gif|svg)`)
    .pipe(imagemin({
        interlaced: true
    }))
    .pipe(gulp.dest(path.DIST_IMG))
});

// Useref
gulp.task('useref', function(){
    return gulp.src(`${path.SRC_INDEX}/index.html`)
      .pipe(useref())
      .pipe(gulp.dest(path.DIST_INDEX))
});

// Typscript
gulp.task('ts', function()
{
	browserify(path.ENTRY_TS)
		.plugin(tsify)
		.bundle()
		.pipe(source('App.js'))
        .pipe(buffer())
        // .pipe(uglify({
        //     toplevel: false,
        //     ie8: true
        // }))
        .pipe(gulp.dest(path.DIST_JS))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// HTML
gulp.task("html", function(){
    return gulp.src(`${path.SRC_INDEX}/index.html`)
    .pipe(gulp.dest(path.DIST_INDEX))
    .pipe(browserSync.reload({
        stream: true
    }));;

});


gulp.task('start',['html','images','sass','ts','watch']);
gulp.task('start:dev',['start','watch']);