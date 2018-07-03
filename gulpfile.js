/**
 * Gulp nodemon + livereload
 * 监听 node restart 并刷新浏览器
 * 需要配合 Chrome 插件
 * https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
 * 2016-12-08 14:49
 */

const deepAssign = require('deep-assign')
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const livereload = require('gulp-livereload')
const notify = require('gulp-notify')

const WAITING_NODEMON_RESTART_DONE = 2000 // ms

const nodemonConfig = {
  // https://github.com/remy/nodemon#delaying-restarting
  delay: 500, // 等待 file change 的时间 ms
  ignore: ['node_modules'],
  // ext: 'hbs css js',
  script: 'index.js',
  env: {
    NODE_ENV: 'local'
  }
}

const handleRestart = () => {
  gulp.src('').pipe(notify('页面即将刷新，请稍后...'))

  setTimeout(() => {
    gulp
      .src(nodemonConfig.script)
      .pipe(livereload())
      .pipe(notify('页面已刷新 ^_^'))
  }, WAITING_NODEMON_RESTART_DONE)
}

// Equal `npm start`
gulp.task('start', () => {
  livereload.listen()

  nodemon(nodemonConfig)
    .on('restart', handleRestart)
})

// Equal `npm run start:dev`
gulp.task('start:dev', () => {
  livereload.listen()

  nodemon(deepAssign({}, nodemonConfig, { env: { NODE_DEV: 'local_dev' } }))
    .on('restart', handleRestart)
})
