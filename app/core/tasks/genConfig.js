var gulp   = require('gulp');
var rename = require('gulp-rename');
var paths  = require('../util/paths');

module.exports = function() {
  return gulp.src(paths.captureConfigFileNameDefault)
    .pipe(rename(paths.mugConfigFileName))
    .pipe(gulp.dest('/'));
};
