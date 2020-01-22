const { src, dest, watch, series, parallel } = require('gulp')
const include           = require('gulp-file-include')
const gulpif            = require('gulp-if')
const del               = require('del')
const sass              = require('gulp-sass')
const rename            = require('gulp-rename')
const notify            = require("gulp-notify")
const webpack           = require('webpack-stream')
const webpackConfig     = require('./webpack.config')
const browserSync       = require('browser-sync')
const sourcemaps        = require('gulp-sourcemaps')
const plumber           = require('gulp-plumber')
const postcss           = require('gulp-postcss')
const short             = require('postcss-short')
const assets            = require('postcss-assets')
const cssnano           = require('cssnano')
const autoprefixer      = require('autoprefixer')
const postcssPresetEnv  = require('postcss-preset-env')
const mqpacker          = require('css-mqpacker')
const sortCSSmq         = require('sort-css-media-queries')
const postcssStripUnits = require('postcss-strip-units')
const cached            = require('gulp-cached')
const dependents        = require('gulp-dependents')
const named             = require('vinyl-named')
const htmlbeautify      = require('gulp-html-beautify')
const removeEmptyLines  = require('gulp-remove-empty-lines')

const isDev  = process.env.NODE_ENV !== 'production'
const isProd = !isDev

function styles() {
  return src('src/scss/**/*.scss')
    .pipe(cached('sass'))
    .pipe(dependents())
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass().on("error", notify.onError()))
    .pipe(postcss([postcssPresetEnv]))
    .pipe(postcss([short]))
    .pipe(postcss([assets({ loadPaths: ['dist/assets/fonts/**/*', 'dist/assets/img/**/*'], relativeTo: 'dist/css/'})]).on("error", notify.onError()))
    .pipe(postcss([postcssStripUnits]))
    .pipe(gulpif(isProd, postcss([autoprefixer(['> 1%', 'last 2 versions', 'not IE 8'])])))
    .pipe(gulpif(isProd, postcss([mqpacker({ sort: sortCSSmq })])))
    .pipe(gulpif(isProd, postcss([cssnano()])))
    .pipe(rename('bundle.css'))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(['src/entryes/**.js', 'src/entryes/**.ts'])
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(webpackConfig).on("error", notify.onError()))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
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
  del(['dist/*', '!dist/assets'])
  end()
}

function html() {
  return src('src/**.html')
    .pipe(include())
    .pipe(gulpif(isProd, htmlbeautify({
      "indent_size": 2,
      "eol": "\n",
      "end_with_newline": false
    })))
    .pipe(gulpif(isProd, removeEmptyLines()))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream())
}

function serve() {
  watch('./src/scss/**/*.scss', series(styles))
    .on('change', function (event) {
      // eslint-disable-next-line no-console
      console.log(`${event} changed`)
      if (event.type === 'deleted') {
        delete cache.caches['sass'][event.path]
      }
    })
  watch('./src/**/*.js', series(scripts))
  watch('./src/**/*.ts', series(scripts))
  watch('./src/**/*.html', series(html))
}

exports.clean = clean
exports.serve = parallel(browser, serve)
exports.build = series(clean, parallel(html, styles, scripts))
exports.default = series(this.build, this.serve)
