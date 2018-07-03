/**
 * on 2017-02-21 14:48
 */

import path from 'path'
import SpritesmithPlugin from 'webpack-spritesmith'

export default ({ c: component, v: version, r: needRetina } = {}) => {
  if (!component) {
    throw new Error('{c} must be specified.')
  }

  if (!version) {
    throw new Error('{v} must be specified.')
  }

  const spritesmithOpts = {
    src: {
      // 存放需要合成雪碧图的零碎图片文件
      cwd: `./components/${component}/${version}/sprite/`,
      // 选择哪些类型的文件合成雪碧图
      glob: '*.*'
    },
    target: {
      // 生成的雪碧图地址
      image: `./components/${component}/${version}/img/sprite.png`,
      // 生成用来引用的 scss 文件
      css: `./components/${component}/${version}/scss/_sprite.scss`
    },
    apiOptions: {
      // css 文件引用的相对地址
      cssImageRef: `../img/sprite.png`
    },
    spritesmithOptions: {
      // 生成从上排到下，一列的雪碧图用来处理一些需要 repeat 的情况
      algorithm: 'top-down',
      // 图片间距 2px
      padding: 2
    }
  }

  if (needRetina) {
    spritesmithOpts.retina = '@2x'
  }

  const plugins = [new SpritesmithPlugin(spritesmithOpts)]

  return {
    devtool: 'eval',
    context: __dirname,
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './_tmp/'),
      pathinfo: false, // remove comments
      publicPath: '',
      filename: `index.js`
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          exclude: /node_modules/,
          use: 'file-loader'
        }
      ]
    },
    plugins
  }
}
