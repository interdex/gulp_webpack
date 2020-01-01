const { src, dest, watch, series, parallel } = require('gulp'),
        gulpif            = require('gulp-if'),
        del               = require('del'),
        sass              = require('gulp-sass'),
        rename            = require('gulp-rename'),
        notify            = require("gulp-notify"),
        webpack           = require('webpack-stream'),
        webpackConfig     = require('./webpack.config'),
        browserSync       = require('browser-sync'),
        sourcemaps        = require('gulp-sourcemaps'),
        plumber           = require('gulp-plumber'),
        postcss           = require('gulp-postcss'),
        short             = require('postcss-short'),
        assets            = require('postcss-assets'),
        cssnano           = require('cssnano'),
        autoprefixer      = require('autoprefixer'),
        postcssPresetEnv  = require('postcss-preset-env'),
        mqpacker          = require('css-mqpacker'),
        sortCSSmq         = require('sort-css-media-queries'),
        postcssStripUnits = require('postcss-strip-units'),
        cached            = require('gulp-cached'),
        dependents        = require('gulp-dependents');

const isDev  = process.env.NODE_ENV !== 'production';
const isProd = !isDev;

function styles() {
  return src('src/scss/**/*.scss')
    .pipe(cached('sass'))
    .pipe(dependents())
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass().on("error", notify.onError()))
    .pipe(postcss([postcssPresetEnv]))
    .pipe(postcss([short]))
    .pipe(postcss([assets({ loadPaths: ['dist/assets/fonts/**/*', 'dist/assets/img/'], relativeTo: 'dist/css/'})]).on("error", notify.onError()))
    .pipe(postcss([postcssStripUnits]))
    .pipe(gulpif(isProd, postcss([autoprefixer(['> 1%', 'last 2 versions', 'not IE 8'])])))
    .pipe(gulpif(isProd, postcss([mqpacker({ sort: sortCSSmq })])))
    .pipe(gulpif(isProd, postcss([cssnano()])))
    .pipe(rename('bundle.css'))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('src/index.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig).on("error", notify.onError()))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    // proxy: 'gulp',
    notify: false,
    open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  })
}

function clean(end) {
  del(['dist/*', '!dist/assets']);
  end();
}

function html() {
  return src('src/**/*.html')
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

function serve() {
  watch('./src/scss/**/*.scss', series(styles))
    .on('change', function (event) {
      console.log(`${event} changed`);
      if (event.type === 'deleted') {
        delete cache.caches['sass'][event.path];
      }
    });
  watch('./src/**/*.js', series(scripts));
  watch('./src/**/*.ts', series(scripts));
  watch('./src/**/*.html', series(html));
}

exports.clean = clean;
exports.serve = parallel(browser, serve)
exports.build = series(clean, parallel(html, styles, scripts))
exports.default = series(this.build, this.serve)