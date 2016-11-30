'use strict';

var gulp         = require('gulp'),
    htmlmin      = require('gulp-html-minifier'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    cleanCSS     = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    imagemin     = require('gulp-imagemin'),
    browserSync  = require('browser-sync').create();

// optimize html
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());;
});

// optimize css
gulp.task('styles', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());;
});

 // optimize js
gulp.task('scripts', function() {
    return gulp.src(['lib/jquery.min.js','lib/*.js','js/*.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());;
});

// optimize images
gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());;
});


gulp.task('serve', ['html', 'styles', 'scripts'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('scss/**/*.scss', ['styles'], browserSync.reload); 
    gulp.watch('*.html', ['html'], browserSync.reload); 
    gulp.watch('js/**/*.js', ['scripts'], browserSync.reload); 
});

gulp.task('default', ['serve']);