/**
 * on 2017-02-27 16:16
 */

import path from 'path'
import vendor from './webpack/vendor'
import {
  getVendorExtractTextPlugin,
  getExtractTextPlugin
} from './webpack/getExtractTextPlugin'
import getModule from './webpack/getModule'
import getPlugins from './webpack/getPlugins'
import getResolve from './webpack/getResolve'
import qn from '../../libs/qn.js'

const shell = require('shelljs')
const gaze = require('gaze')

export default (
  {
    R: needReact = false, // 是否使用react
    p: project,
    s: needSprite = false, // 是否需要生成雪碧图
    r: needRetina = false, // 是否支持 Retina 雪碧图
    m: needCSSModule = false, // 是否支持 CSS Module
    A: createApi = false // 是否生成API
  } = {}
) => {
  if (!project) {
    // 参数校验 --env.p
    throw new Error('--env.p(project) must be spcified.')
  }

  // 是否创建API文档
  if (createApi) {
    shell.exec(`
       apidoc -f ${project}.js -i routes/ -o apidoc/
    `)
    // 自动更新apidoc
    gaze(`./routes/${project}.js`, function (error, watcher) {
      this.on('all', function (event, filepath) {
        console.log(filepath + ' was ' + event)
        shell.exec(`
           apidoc -f ${project}.js -i routes/ -o apidoc/
        `)
      })
    })
  }

  const nodeEnv = process.env.NODE_ENV || 'development'
  const isDev = nodeEnv === 'development'
  const isProd = nodeEnv === 'production'
  const QNCDN = qn.cdnBase
  const sourcePath = path.join(__dirname, `./src/${project}`)
  const distPath = path.join(__dirname, `./public`) // 打包到 ./public/ 下
  const publicPath = isProd ? `${QNCDN}/webapp/hd/` : ''
  const vendorExtractTextPlugin = getVendorExtractTextPlugin({ project })
  const extractTextPlugin = getExtractTextPlugin({ project })

  // Remove the console warning of `DeprecationWarning`
  // https://github.com/vuejs/vue-loader/issues/666
  process.noDeprecation = true

  return {
    devtool: isDev
      ? 'inline-source-map' // 为了准确显示错误位置
      : false,
    context: __dirname,
    watch: !isProd,
    entry: {
      vendor,
      index: `./src/${project}/index.js`
    },
    output: {
      path: distPath,
      pathinfo: false, // remove comments
      publicPath,
      filename: `${project}/js/[name]-[chunkhash:8].js`,
      chunkFilename: `${project}/js/[name]-[chunkhash:8].js`
    },
    module: getModule({
      isProd,
      project,
      vendorExtractTextPlugin,
      extractTextPlugin,
      needCSSModule,
      publicPath
    }),
    resolve: getResolve({ isProd, needReact }),
    plugins: getPlugins({
      needSprite,
      needRetina,
      project,
      nodeEnv,
      isProd,
      publicPath,
      sourcePath,
      distPath,
      vendorExtractTextPlugin,
      extractTextPlugin
    })
  }
}
