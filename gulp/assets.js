/*
* assets.js
* Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
*
* Distributed under terms of the MIT license.
*/

var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cached = require('gulp-cached');

/**
* Define a task to minimise all images used
* in the game.
*/
gulp.task('assets:imagemin', function() {
   return gulp.src('./res/art/**/*.png')
       .pipe(gulpif(!global.isDevEnv, cached('imagemin')))
       .pipe(gulp.dest(global.paths.dist + '/art'));
});

/**
* Define a task to copy all the resources into the dist folder
* to be hosted by the server. ''res/img' is excluded because all the
* images in that folder were optimised and already moved to the dist folder.
*/
gulp.task('assets:copy', function() {
   return gulp.src([global.paths.resources, '!./res/art'])
       .pipe(gulp.dest('./dist'));
});

gulp.task('assets', ['assets:imagemin', 'assets:copy']);
