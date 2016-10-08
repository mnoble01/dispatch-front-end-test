import gulp from 'gulp'
import path from 'path'
import transform from 'vinyl-transform'
import browserify from 'browserify'
import babelify from 'babelify'
import livereload from 'gulp-livereload'
import source from 'vinyl-source-stream'
import express from 'express'
import browserSync from 'browser-sync'

const SERVER = {
  PORT: 3000,
  ROOT: __dirname + '/dist'
}
const DIRS = {
  SRC: 'src',
  DEST: 'dist'
}
const PATHS = {
  APP_ENTRY: path.join(DIRS.SRC, 'app.js'),
  JS: path.join(DIRS.SRC, '**/*.js'),
  HTML: path.join(DIRS.SRC, '**/*.html'),
  CSS: path.join(DIRS.SRC, '**/*.css'),
  IMAGES: [path.join(DIRS.SRC, 'favicon.ico')]
}

gulp.task('html', () => {
  return gulp.src(PATHS.HTML)
    .pipe(gulp.dest(DIRS.DEST))
})

gulp.task('css', () => {
  return gulp.src(PATHS.CSS)
    .pipe(gulp.dest(DIRS.DEST))
})

gulp.task('images', () => {
  return gulp.src(PATHS.IMAGES)
    .pipe(gulp.dest(DIRS.DEST))
})

gulp.task('js', () => {
  return browserify({debug: true}) // TODO only debug if !env.PROD
    .transform(babelify, {presets: ['es2015', 'react']})
    .require(PATHS.APP_ENTRY, {entry: true})
    .bundle()
    .pipe(source(path.basename(PATHS.APP_ENTRY)))
    .pipe(gulp.dest(DIRS.DEST))
})

gulp.task('build', ['html', 'js', 'css', 'images'])

gulp.task('server', ['build'], () => {
  let app = express()
  app.use('/', express.static(SERVER.ROOT))
  app.listen(SERVER.PORT, function() {
    console.info('Server listening on port 3000')
  })
})

gulp.task('watch', () => {
  browserSync({server: {
    baseDir: DIRS.DEST
  }})

  gulp.watch(PATHS.JS, ['js', browserSync.reload])
  gulp.watch(PATHS.HTML, ['html', browserSync.reload])
  gulp.watch(PATHS.CSS, ['css', browserSync.reload])
})


// gulp.task('watch', ['build'], () => {
//   livereload.listen()
//   gulp.watch(PATHS.JS, ['js'])
//   gulp.watch(PATHS.HTML, ['html'])
//   gulp.watch(PATHS.CSS, ['css'])
// })