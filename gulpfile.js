var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var commonjsify = require('commonjsify');

var paths = {
  client: './client/src/app.js',
  bundle: './client/dist'
};

gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    b.require(require.resolve('angular'), {entry: true, expose: 'angular'});
    b.transform(commonjsify({
      'angular': 'angular',
      //'angular-ui-router': 'angular.module(\'ui.router\')'
    }));
    return b.bundle();
  });

  return gulp.src(paths.client)
  .pipe(browserified)
  //.pipe(uglify())
  .pipe(gulp.dest(paths.bundle));
});

gulp.task('default', ['browserify']);
