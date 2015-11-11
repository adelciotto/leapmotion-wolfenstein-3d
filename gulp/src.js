/*
 * src.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

// TODO: uglify in prod mode
gulp.task('src', function() {
	return gulp.src(global.paths.scripts)
		.pipe(gulpif(!global.isDevEnv, uglify()))
		.pipe(gulp.dest(global.paths.dist + '/js'))
		.pipe(gulpif(global.isDevEnv, livereload()));
});
