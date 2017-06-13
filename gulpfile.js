'use strict';

const paths = require('./config/paths');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('webserver', function () {
    return gulp.src('./dist')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true
        }))
});

gulp.task('build:js-min', function () {
    return browserify({ entries: paths.scripts.entry,  debug: true })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(paths.scripts.output));
});

gulp.task('build:js', function () {
    return browserify({ entries: paths.scripts.entry,  debug: true })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.scripts.output));
});

gulp.task('build:css-min', function () {
    return gulp.src(paths.styles.entry)
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(paths.styles.output));
});

gulp.task('build:css', function () {
    return gulp.src(paths.styles.entry)
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sass()).on('error', sass.logError)
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.styles.output));
});

gulp.task('watch', [ 'build:js-min', 'build:js', 'build:css-min', 'build:css' ], function () {
    gulp.watch(paths.scripts.watch, ['build:js', 'build:js-min']);
    gulp.watch(paths.styles.watch, ['build:css', 'build:css-min']);
});

gulp.task('default', [ 'webserver', 'watch']);
