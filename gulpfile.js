var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var paths = {
  client: './client/app/app.js',
  bundle: './client/bundle.js'
};

gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(paths.client)
  .pipe(browserified)
  //.pipe(uglify())
  .pipe(gulp.dest(paths.bundle));
});
