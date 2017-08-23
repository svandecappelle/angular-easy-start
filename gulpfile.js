const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const zip = require('gulp-zip');
const del = require('del');
const sequence = require('run-sequence');
var publicDistFolder = 'public',
  jsPath = `${publicDistFolder}/js`,
  jsDist = `${publicDistFolder}/js/dist`,
  cssPath = `${publicDistFolder}/styles`,
  cssDist = `${publicDistFolder}/styles/dist`,
  libPath = `${publicDistFolder}/lib`,
  nodeModulesPath = 'node_modules';

gulp.task('sass', function () {
  gulp.src(cssPath + '/*.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(csso())
    .pipe(gulp.dest(cssDist))
})

gulp.task('clean', function () {
  return del(libPath + '/**/*', { force: true })
})

gulp.task('copy:libs', function (done) {
  sequence('clean', 'copy:vendor', 'copy:rxjs', 'copy:angular', done)
})

gulp.task('copy:vendor', function () {
  return gulp.src([
    nodeModulesPath + '/core-js/client/**/*',
    nodeModulesPath + '/zone.js/dist/zone.js',
    nodeModulesPath + '/hammerjs/hammer.min.js',
    nodeModulesPath + '/systemjs/dist/system-polyfills.js',
    nodeModulesPath + '/systemjs/dist/system.src.js'
  ])
    .pipe(gulp.dest(libPath))
})

gulp.task('copy:rxjs', function () {
  return gulp.src([
    nodeModulesPath + '/rxjs/**/*'
  ])
    .pipe(gulp.dest(libPath + '/rxjs'))
})

gulp.task('copy:angular', function () {
  return gulp.src([nodeModulesPath + '/@angular/**/*']).pipe(gulp.dest(libPath + '/@angular'))
})

gulp.task('compressScripts', function () {
  gulp.src([
    jsPath + '/**/*.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist))
})

gulp.task('angular:scss', function () {
  gulp.src('client/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(csso())
    .pipe(gulp.dest('./client'))
})

gulp.copy = function(src , dest){
    return ;
};

gulp.task('build:client', function () {
  gulp.src('public/**/*')
  .pipe(gulp.dest('build/public/'));
})

gulp.task('build:server', function () {
  gulp.src('server/**/*')
    .pipe(gulp.dest('build/server/'));
})

gulp.task('dist', function () {
  gulp.src('build/**/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('dist'));
})

// Watchers
gulp.task('watch', function () {
  gulp.watch(cssPath + '/*.scss', ['sass'])
  gulp.watch([
    jsPath + '/**/*.js', ['compressScripts']
  ])
})

gulp.task('watch:scss', function () {
  gulp.watch(['client/**/*.scss', 'public/**/*.scss'], ['angular:scss', 'sass'])
})

// Main tasks
gulp.task('default', ['sass', 'angular:scss', 'compressScripts', 'watch'])

gulp.task('build', ['build:client', 'build:server'])
gulp.task('package', function (done) {
  sequence('copy:libs', 'sass', 'angular:scss', 'compressScripts' , 'build', 'dist', done);
});
