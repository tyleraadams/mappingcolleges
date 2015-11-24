var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  del = require('del'),
  jsonminify = require('gulp-jsonminify');

gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main_v2.css'))
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
  gulp.src(['src/scripts/jquery-2.1.4.js', 'src/scripts/jquery-jvectormap-2.0.4.js', 'src/scripts/jquery-jvectormap-us-merc.js', 'src/scripts/jquery.ba-throttle-debounce.js', 'src/scripts/index.js', 'src/scripts/css3-animate-it.js'])
  .pipe(concat('main_v2.js'))
  .pipe(gulp.dest('public/js/'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('public/js/'))
  .pipe(notify({ message: 'Scripts task complete' }))
});

gulp.task('minify', function () {
  return gulp.src(['public/data/community_college_data.json'])
      .pipe(jsonminify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('public/data/'));
});

gulp.task('lint', function() {
  return gulp.src('src/scripts/index.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.css', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
});


gulp.task('default', ['scripts', 'styles', 'clean']);

