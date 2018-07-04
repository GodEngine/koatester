/**
 * on 2017-02-27 16:02
 */

import path from 'path'

import vendor from './vendor'

export default ({
  isProd,
  project,
  vendorExtractTextPlugin,
  extractTextPlugin,
  needCSSModule,
  publicPath
} = {}) => {
  const imageWebpackLoaderRule = {
    loader: 'image-webpack-loader',
    options: {
      progressive: true,
      optipng: {
        optimizationLevel: 7
      },
      gifsicle: {
        interlaced: false
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      mozjpeg: {
        quality: 65
      },
      svgo: {
        plugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }]
      }
    }
  }

  const commonStyleRules = [
    'postcss-loader',
    {
      loader: `sass-loader?${isProd ? '' : 'sourceMap'}`,
      options: {
        includePaths: [
          path.resolve(
            __dirname,
            '../node_modules/bourbon/app/assets/stylesheets/'
          )
        ],
        data: '@import "bourbon";'
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        // 加载通用 scss
        resources: [
          path.resolve(__dirname, '../node_modules/bemify/sass/_bemify.scss'),
          path.resolve(__dirname, '../scss/**/*.scss')
        ]
      }
    }
  ]

  return {
    // 不需要经过 Webpack 处理的模块
    // https://webpack.js.org/configuration/module/#module-noparse
    noParse: vendor.map(v => new RegExp(`${v}$`)),
    rules: [
      // 编译 ES6
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // babel-loader 可以缓存处理过的模块，对于没有修改过的文件不会再重新编译，
            // cacheDirectory 有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
            cacheDirectory: true
            // 启用 Tree Shaking
            // webpack@2 开始引入 tree-shaking 技术，通过静态分析 ES6 语法，
            // 可以删除没有被使用的模块。它只对 ES6 的模块有效，
            // 所以一旦 Babel 将 ES6 的模块转换成 commonjs,
            // webpack 将无法使用这项优化。所以要使用这项技术，要使用 webpack 的模块处理，
            // 加上 Babel 的 ES6 转换能力（需要关闭 ES6 的模块转换）。
            // .babelrc > presets: ['env', [{ modules: false }]]
          }
        }
      },
      // 编译 公共组件 s?css
      {
        test: /\.s?css/,
        include: path.resolve(__dirname, '../components/'),
        use: needCSSModule
          ? [
            'style-loader',
            `css-loader?${isProd
              ? 'minimize'
              : 'sourceMap'}&modules&localIdentName=[name]__[local]--[hash:base64:5]`
          ].concat(commonStyleRules)
          : vendorExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  minimize: isProd,
                  sourceMap: !isProd
                }
              }
            ].concat(
              commonStyleRules
            ),
            // 替换 css 中的资源引用路径指向 /public/
            publicPath: isProd ? publicPath : '../../'
          })
      },
      // 编译 s?css
      {
        test: /\.s?css$/,
        include: path.resolve(__dirname, '../src/'),
        use: needCSSModule
          ? [
            'style-loader',
            `css-loader?${isProd
              ? 'minimize'
              : 'sourceMap'}&modules&localIdentName=[name]__[local]--[hash:base64:5]`
          ].concat(commonStyleRules)
          : extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [`css-loader?${isProd ? 'minimize' : 'sourceMap'}`].concat(
              commonStyleRules
            ),
            // 替换 css 中的资源引用路径指向 /public/
            publicPath: isProd ? publicPath : '../../'
          })
      },
      // 抽取 Antd Mobile 中的 CSS
      {
        test: /\.css$/,
        include: /node_modules/,
        use: vendorExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: `css-loader?${isProd ? 'minimize' : 'sourceMap'}`
        })
      },
      // 处理 Antd Mobile SVG Icon
      {
        test: /\.(svg)$/,
        include: require.resolve('antd-mobile').replace(/warn\.js$/, ''), // Antd Mobile 内置 svg 文件
        use: 'svg-sprite-loader'
      },
      // 抽取通用组件中的图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: path.resolve(__dirname, '../components/'),
        use: (() => {
          const loaders = [
            {
              loader: 'file-loader',
              options: {
                regExp: /components\/(.*)\//,
                name: `[1]/[name]-[hash:8].[ext]`
              }
            }
          ]

          if (isProd) {
            loaders.push(imageWebpackLoaderRule)
          }

          return loaders
        })()
      },
      // 抽取运营活动项目中的图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: path.resolve(__dirname, '../src/'),
        use: (() => {
          const loaders = [
            {
              loader: 'file-loader',
              options: {
                name: `${project}/img/[name]-[hash:8].[ext]`
              }
            }
          ]

          if (isProd) {
            loaders.push(imageWebpackLoaderRule)
          }

          return loaders
        })()
      },
      // 抽取字体
      // 假设公共组件暂时不需要指定字体，以后需要时再补 conf
      {
        test: /\.(ttf|eot|otf|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${project}/font/[name]-[hash:8].[ext]`
            }
          }
        ]
      },
      // 支持读取 json 文件
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['json-loader']
      }
    ]
  }
}
