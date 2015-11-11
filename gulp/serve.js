/*
 * serve.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

gulp.task('serve', function() {
    if (global.isDevEnv) {
        livereload.listen();

        // watch over all resources and the main index.html
        gulp.watch(global.paths.index, ['copy:index']);
        gulp.watch(global.paths.resources, ['assets']);
        gulp.watch(global.paths.scripts, ['src']);
    }

    return connect.server({
        root: global.paths.dist,
        port: 8000
    });
});
