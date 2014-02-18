var gulp = require('gulp'),
  watch = require('gulp-watch'),
  less = require('gulp-less'),
  path = require('path');

gulp.task('default', function() {
  gulp.src('./less/**/*.less')
    .pipe(watch(function(files) {
      return files.pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
      }))
        .pipe(gulp.dest('./app/css'));
    }));
});