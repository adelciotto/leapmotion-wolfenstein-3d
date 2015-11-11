/*
 * clean.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(done) {
    del(global.paths.dist).then(function() {
		done();
	});
});
