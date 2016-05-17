var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
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
  gulp.watch('sass/**/*.scss',['styles'])
});
