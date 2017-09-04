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
  return gulp.src(cssPath + '/*.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(csso())
    .pipe(gulp.dest(cssDist))
})

gulp.task('clean', function () {
  return del(libPath + '/**/*', { force: true })
})

gulp.task('copy:libs', function (done) {
  return sequence('clean', 'copy:vendor', 'copy:rxjs', 'copy:angular', done)
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
  return gulp.src([
    jsPath + '/**/*.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist))
})

gulp.task('angular:scss', function () {
  return gulp.src('client/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(csso())
    .pipe(gulp.dest('./client'))
})

gulp.copy = function(src , dest){
    return ;
};

gulp.task('clean:dist', function () {
  return del(['dist', 'build'], { force: true })
})

gulp.task('build:client', function () {
  gulp.src([
    'public/{styles, images}/**/*'
    ])
  .pipe(gulp.dest('build/public/'));
  gulp.src([
    'public/assets/{,jquery}/dist/**/*',
    'public/assets/{,material-design-lite}/*.min.js*',
    'public/assets/{,material-design-lite}/*.min.css*',
    'public/assets/{,material-design-icons}/iconfont/**/*',
    'public/dialog.polyfill.min.js'
    ])
  .pipe(gulp.dest('build/public/assets'));
})

gulp.task('build:server', function () {
  gulp.src('config/**/*')
    .pipe(gulp.dest('build/config/'));
  gulp.src('*.json')
    .pipe(gulp.dest('build/'));
  gulp.src('node_modules/@angular/material/prebuilt-themes/indigo-pink.css')
    .pipe(gulp.dest('build/public/styles/'));
  gulp.src('node_modules/hammerjs/*.min.js')
    .pipe(gulp.dest('build/public/'));
  gulp.src('server/**/*')
    .pipe(gulp.dest('build/server/'));
})

gulp.task('dist', function () {
  // delete angular generated file
  // del('build/client/*.html');
  gulp.src('build/client/*.js*')
    .pipe(gulp.dest('build/public/'));
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
  return gulp.watch(['client/**/*.scss', 'public/**/*.scss'], ['angular:scss', 'sass'])
})

// Main tasks
gulp.task('default', ['sass', 'angular:scss', 'compressScripts', 'watch'])

gulp.task('build', function(done){
  return sequence('build:client', 'build:server', done);
})
gulp.task('build:package', function (done) {
  return sequence('clean:dist', 'copy:libs', 'sass', 'angular:scss', 'compressScripts' , 'build', done);
});
gulp.task('build:dist', function (done) {
  return sequence('dist', done);
});
