/*
 * jshint.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');

gulp.task('jshint', function() {
    return gulp.src(global.paths.scripts)
        // only lint what has changed. gulp-cached will keep an in-memory cache
        // of files and their contents. If a file has already passed through on
        // the last run it will not be passed downstream.
        .pipe(cached('jshint'), { optimizeMemory: true })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
