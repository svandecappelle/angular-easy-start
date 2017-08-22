var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    sequence = require('run-sequence'),
    jsPath = 'public/js',
    jsDist = 'public/js/dist',
    cssPath = 'public/styles',
    cssDist = 'public/styles/dist',
    libPath = 'public/lib',
    nodeModulesPath = 'node_modules';

gulp.task('sass', function() {
    gulp.src(cssPath + '/*.scss')
        .pipe(plumber())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(csso())
        .pipe(gulp.dest(cssDist));
});

gulp.task('clean', function () {
  return del(libPath + '/**/*', { force: true });
});

gulp.task('copy:libs', function (done) {
    sequence('clean', 'copy:vendor', 'copy:rxjs', 'copy:angular', done);
});

gulp.task('copy:vendor', function() {
  return gulp.src([
      nodeModulesPath + '/core-js/client/**/*',
      nodeModulesPath + '/zone.js/dist/zone.js',
      nodeModulesPath + '/hammerjs/hammer.min.js',
      nodeModulesPath + '/systemjs/dist/system-polyfills.js',
      nodeModulesPath + '/systemjs/dist/system.src.js'
    ])
    .pipe(gulp.dest(libPath));
});

gulp.task('copy:rxjs', function() {
  return gulp.src([
      nodeModulesPath + '/rxjs/**/*'
    ])
    .pipe(gulp.dest(libPath + '/rxjs'));
});

gulp.task('copy:angular', function() {
    return gulp.src([nodeModulesPath + '/@angular/**/*']).pipe(gulp.dest(libPath + '/@angular'));
});

gulp.task('compressScripts', function() {
    gulp.src([
        jsPath + '/**/*.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist));
});

gulp.task('watch', function() {

    gulp.watch(cssPath + '/*.scss', ['sass']);

    gulp.watch([
        jsPath + '/**/*.js', ['compressScripts']
    ]);

});

gulp.task('watch:scss', function() {
    gulp.watch(['client/**/*.scss', 'public/**/*.scss'], ['angular:scss', 'sass']);
});

gulp.task('angular:scss', function() {
    gulp.src('client/**/*.scss')
      .pipe(plumber())
      .pipe(sass({ errLogToConsole: true }))
      .pipe(csso())
      .pipe(gulp.dest('./client'));
});

gulp.task('default', ['sass', 'angular:scss', 'compressScripts', 'watch']);
