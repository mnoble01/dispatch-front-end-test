import gulp from 'gulp'
import path from 'path'
import babel from 'gulp-babel'
import transform from 'vinyl-transform'
import browserify from 'browserify'
import babelify from 'babelify'
import livereload from 'gulp-livereload'
import source from 'vinyl-source-stream'

const DIRS = {
  src: 'src',
  dest: 'dist'
}
const APP = path.join(DIRS.src, 'app.js')
const JS_GLOB = path.join(DIRS.src, '/**/*.js')
const HTML_GLOB = path.join(DIRS.src, '/**/*.html')

gulp.task('html', () => {
  gulp.src(HTML_GLOB)
    .pipe(gulp.dest(DIRS.dest))
})

gulp.task('js', () => {
  return browserify({debug: true}) // TODO only debug if !env.PROD
    .transform(babelify, {presets: ['es2015', 'react']})
    .require(APP, {entry: true})
    .bundle()
    .pipe(source(path.basename(APP)))
    .pipe(gulp.dest(DIRS.dest))
})

gulp.task('build', ['html', 'js'])

gulp.task('watch', ['build'], function () {
  livereload.listen()
  gulp.watch(JS_GLOB, ['build'])
})