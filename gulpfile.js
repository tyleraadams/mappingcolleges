var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  del = require('del');

gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

gulp.task('scripts', function() {
  gulp.src(['src/scripts/jquery-2.1.4.js', 'src/scripts/jquery-jvectormap-2.0.4.js', 'src/scripts/jquery-jvectormap-us-merc.js', 'src/scripts/index.js'])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/js/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('public/js/'))

});

gulp.task('lint', function() {
  return gulp.src('src/scripts/index.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['lint', 'scripts', 'styles', 'clean']);

