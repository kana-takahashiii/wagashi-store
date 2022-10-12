const gulp    = require('gulp');
const notify  = require("gulp-notify");
const plumber = require("gulp-plumber");
// const sass    = require('gulp-sass');
const pug     = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify  = require('gulp-uglify');
const browserSync = require('browser-sync');
const packageImporter = require('node-sass-package-importer');


//setting : paths
const paths = {
    'root'    : './dist/',
    'pug'     : './src/pug/**/*.pug',
    'html'    : './dist/',
    'cssSrc'  : './src/scss/**/*.scss',
    'cssDist'   : './dist/css/',
    'jsSrc' : './src/js/**/*.js',
    'jsDist': './dist/js/'
}

//gulpコマンドの省略
const { watch, series, task, src, dest, parallel } = require('gulp');

//Sass
task('sass', function () {
  return (
    src(paths.cssSrc)
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(sass({
        outputStyle: 'compressed',// Minifyするなら'compressed'
        importer: packageImporter({
          extensions: ['.scss', '.css']
        })
      }))
      .pipe(autoprefixer({
        cascade: false,
        grid: true
        }))
      .pipe(dest(paths.cssDist))
  );
});

//Pug
task('pug', function () {
  return (
    src([paths.pug, '!./src/pug/**/_*.pug'])
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
      .pipe(pug({
        pretty: true,
        // basedir: "./src/pug"
        basedir: ["./src/pug", "./src/pug/**/*.pug"]
      }))
      .pipe(dest(paths.html))
  );
});

//JS Compress
task('js', function () {
  return (
    src(paths.jsSrc)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(dest(paths.jsDist))
  );
});

// browser-sync
task('browser-sync', () => {
  return browserSync.init({
      server: {
          baseDir: paths.root
      },
      port: 8080,
      reloadOnRestart: true
  });
});

// browser-sync reload
task('reload', (done) => {
  browserSync.reload();
  done();
});

//watch
task('watch', (done) => {
  watch([paths.cssSrc], series('sass', 'reload'));
  watch([paths.jsSrc], series('js', 'reload'));
  watch([paths.pug], series('pug', 'reload'));
  done();
});
task('default', parallel('watch','sass','js','pug' ,'browser-sync'));