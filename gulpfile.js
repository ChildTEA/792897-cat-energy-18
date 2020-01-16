'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var del = require('del');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var browserSync = require('browser-sync').create();

gulp.task('html', function () {
  return gulp.src('source/*.html')
  .pipe(gulp.dest('build'));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('build/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
	return gulp.src('source/img/icon-*.svg')
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*{woff, woff2}',
    'sourse/img/**',
    'source/js/**'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('copyJS', function () {
  return gulp.src([
    'source/js/**'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});


gulp.task('server', function () {
  browserSync.init({
    server: 'build/'
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', browserSync.reload));
  gulp.watch('source/js/**/*.js', gulp.series('copyJS', browserSync.reload));
  gulp.watch('source/*.html', gulp.series('html'));
  gulp.watch('build/*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'images', 'webp', 'sprite', 'html'));
gulp.task('start', gulp.series('server'));
