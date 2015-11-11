/*
 * copy.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var vendorFiles = [
    './node_modules/jquery/dist/jquery.' + (global.isDevEnv ? '' : 'min.') + 'js',
    './node_modules/leapjs/leap-0.6.4.' + (global.isDevEnv ? '' : 'min.') + 'js'
];

gulp.task('copy:index', function() {
    gulp.src([global.paths.index, global.paths.favicon, global.paths.stylesheet])
        .pipe(gulp.dest(global.paths.dist))
        .pipe(gulpif(global.isDevEnv, livereload()));
});

gulp.task('copy:vendor', function() {
    gulp.src(vendorFiles)
        .pipe(rename(function(path) {
            path.basename = path.basename.replace('.min', '');
        }))
        .pipe(gulp.dest(global.paths.dist + '/js'));
});

gulp.task('copy', ['copy:index', 'copy:vendor']);
