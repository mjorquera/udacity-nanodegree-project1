var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');

var browserSync = require('browser-sync').create();
 browserSync.init({
     server: "./"
 });
 browserSync.stream();

gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer({
          			browsers: ['last 2 versions'],
          			cascade: false
          		}))
          .pipe(gulp.dest('./css'));
});

gulp.task('default', function(){
  gulp.watch('sass/**/*.scss',['styles']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('useref', function(){
  console.log("Hello");
  return gulp.src('./*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('./'))
});
