var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    minifyCSS = require('gulp-minify-css');

gulp.task('css-build', function() {
    gulp.src(['jspm_packages/npm/bootstrap-css-only@3.3.5/css/bootstrap.css',
                    'jspm_packages/npm/angular-loading-bar@0.8.0/src/loading-bar.css'])
        .pipe(concat('sysadmin.css'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('sysadmin/dist/styles'));
        
    return gulp.src(['jspm_packages/npm/bootstrap-css-only@3.3.5/css/bootstrap.css'])
        .pipe(concat('public.css'))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/dist/styles'));
});

gulp.task('fonts-build', function() {
    return gulp.src(['jspm_packages/npm/bootstrap-css-only@3.3.5/fonts/*'])
                .pipe(gulp.dest('public/dist/fonts'))
});

// gulp css-build