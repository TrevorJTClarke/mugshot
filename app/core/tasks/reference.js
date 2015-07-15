var gulp = require('gulp');

//FIRST CLEAN REFERENCE DIR.  THEN TEST
gulp.task('reference', ['clean', 'bless'], function() {
  gulp.run('test');
});
