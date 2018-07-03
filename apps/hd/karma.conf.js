/**
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-03 14:36
 */

const path = require('path')
const argv = require('yargs').argv

module.exports = config => {
  let {folder, file} = argv
  // folder 表示具体的文件夹
  // file 表示具体的文件
  // let filesVal = './test/unit/**/*.spec.js' // 不添加任何参数 默认对所有的文件进行测试
  // if (folder) {
  //   // 添加需要测试的某一个文件夹
  //   filesVal = `./test/unit/${folder}/**/*.spec.js`
  // }
  // if (file) {
  //   // 添加需要测试的某一个具体的文件
  //   filesVal = `./test/unit/${file}`
  // }
  let filesVal = `./test/unit/${file || (folder ? `${folder}/**/*.spec.js` : '**/*.spec.js')}`
  let preprocessors = {}
  preprocessors[filesVal] = ['webpack']
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'es6-shim'],
    files: [filesVal],
    preprocessors,
    // preprocessors: {
    //   './test/unit/**/*.spec.js': ['webpack']
    // },
    webpack: {
      devtool: 'eval',
      module: {
        rules: [
          // 编译 ES6
          {
            test: /\.jsx?$/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: ['env', 'react', 'stage-0']
              }
            }
          },
          {
            enforce: 'pre', // equal webpack@1.x preLoaders
            test: /\.jsx?/,
            include: path.resolve(__dirname, './components'),
            use: {
              loader: 'isparta-loader'
            }
          },
          // 编译 scss
          {
            test: /\.s?css$/,
            exclude: /node_modules/,
            loader: `css-loader?sourceMap!sass-loader?sourceMap!sass-resources-loader?resources=${path.resolve(__dirname, './node_modules/bemify/sass/_bemify.scss')}`
          },
          // 抽取图片
          {
            test: /\.(gif|png|jpe?g|svg)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'file-loader'
              }
            ]
          }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      // Don't spam the console when running in karma
      noInfo: true
    },
    plugins: [
      'karma-es6-shim',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'html' }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 200 // 监听频率 ms
  })
}
